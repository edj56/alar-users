import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/services/users.service';
import { LoginDto, LoginResponseDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { UserJwtDto } from '../dto/user-jwt.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private usersService: UsersService,
    ) {}

    async login(payload: LoginDto): Promise<LoginResponseDto> {
        const user = await this.usersService.getWithPasswordByEmail(payload.email);

        if (!user) {
            throw new NotFoundException('You have provided wrong credentials!');
        }

        if (!user.comparePassword(payload.password)) {
            throw new NotFoundException('You have provided wrong credentials!');
        }

        return {
            token: await this.jwt.signAsync({
                id: user.id,
                email: user.email,
            } as UserJwtDto),
        };
    }

    async register(payload: RegisterDto) {
        const {
            username,
            email,
            password,
            firstName,
            lastName,
            gender,
            birthDate,
        } = payload;

        await this.usersService.create({
            username,
            email,
            password,
            firstName,
            lastName,
            gender,
            birthDate,
        });
    }
}
