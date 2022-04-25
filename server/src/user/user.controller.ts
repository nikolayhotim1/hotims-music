import { UserService } from './user.service';
import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.schema';

@ApiTags('Users')
@Controller('/users')
export class UserController {
    constructor(private userService: UserService) { }

    @ApiOperation({ summary: 'Create new user' })
    @ApiResponse({ status: 200, type: User })
    @Post('/registration')
    async registration(req: any, res: any, next: any) {
        try {
            const { email, password } = req.body;
            const userData = await this.userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.qson(userData);
        } catch (e: any) {
            console.log(e);
        }
    }

    async login(req: any, res: any, next: any) {
        try {

        } catch (e: any) {

        }
    }

    async logout(req: any, res: any, next: any) {
        try {

        } catch (e: any) {

        }
    }

    async activate(req: any, res: any, next: any) {
        try {

        } catch (e: any) {

        }
    }

    async refresh(req: any, res: any, next: any) {
        try {

        } catch (e: any) {

        }
    }

    @Get()
    async getUsers(req: any, res: any, next: any) {
        try {
            res.json(['123', '456']);
        } catch (e: any) {

        }
    }
};