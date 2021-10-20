import {Controller, Get, UseGuards} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../guards/jwt.guard';
import { CurrentUser } from '../../core/decorators/current-user.decorator';
import { UserJwtDto } from '../dto/user-jwt.dto';

@ApiTags('Profile')
@ApiBearerAuth()
@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
    @Get('/')
    getMe(@CurrentUser() user: UserJwtDto) {
        return user;
    }
}
