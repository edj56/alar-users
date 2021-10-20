import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';
import { LoginDto, LoginResponseDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() payload: RegisterDto): Promise<boolean> {
        await this.authService.register(payload);

        return true;
    }

    @Post('login')
    login(@Body() payload: LoginDto): Promise<LoginResponseDto> {
        return this.authService.login(payload);
    }
}
