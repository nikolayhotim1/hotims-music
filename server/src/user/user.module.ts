import { Token, TokenSchema } from './../token/token.schema';
import { TokenService } from './../token/token.service';
import { MailService } from './../mail/mail.service';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }])
    ],
    controllers: [UserController],
    providers: [UserService, MailService, TokenService]
})
export class UserModule { };