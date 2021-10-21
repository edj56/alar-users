import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './services/users.service';
import { UserFollowersService } from './services/user-followers.service';
import { UsersController } from './controllers/users.controller';
import { UserEntity } from './entities/user.entity';
import { UserFollowerEntity } from './entities/user-follower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserFollowerEntity])],
  controllers: [UsersController],
  providers: [UsersService, UserFollowersService],
  exports: [UsersService, UserFollowersService],
})
export class UsersModule {}
