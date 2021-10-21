import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../guards/jwt.guard';
import { CurrentUser } from '../../core/decorators/current-user.decorator';
import { UserJwtDto } from '../dto/user-jwt.dto';
import { UserFollowersService } from '../../users/services/user-followers.service';
import { CreateFollowingDto } from '../dto/follower.dto';

@ApiTags('Profile')
@ApiBearerAuth()
@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
    constructor(private userFollowersService: UserFollowersService) {}

    @Get('/')
    getMe(@CurrentUser() user: UserJwtDto) {
        return user;
    }

    @Get('/followings')
    getFollowings(@CurrentUser() user: UserJwtDto) {
        return this.userFollowersService.getAllByFollower(user.id);
    }

    @Post('/followings')
    async addFollowing(@CurrentUser() user: UserJwtDto, @Body() { followingId }: CreateFollowingDto): Promise<boolean> {
        const followerId = user.id;

        await this.userFollowersService.create(followingId, followerId);

        return true;
    }
}
