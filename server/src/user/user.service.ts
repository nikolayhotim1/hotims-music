import { UserDto } from './user.dto';
import { TokenService } from './../token/token.service';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import uuid from 'uuid';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private mailService: MailService,
        private tokenService: TokenService
    ) { }

    async registration(email: string, password: string) {
        const candidate = await this.userModel.findOne({ email });
        if (candidate) {
            throw new Error(`User with email address ${email} is already exist`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await this.userModel.create({ email, password: hashPassword, activationLink });
        await this.mailService.sendActivationMail(email, activationLink);
        const userDto = new UserDto(user);
        const tokens = this.tokenService.generateTokens({ ...userDto });
        await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }
};