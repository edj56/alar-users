import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UsersModule } from '../users/users.module';
import { ProfileController } from './controllers/profile.controller';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: '3600s'}
            })
        }),
        forwardRef(() => UsersModule),
    ],
    controllers: [AuthController, ProfileController],
    providers: [AuthService, JwtStrategy, JwtAuthGuard]
})
export class AuthModule {}
