import {HttpException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserFollowerEntity } from '../entities/user-follower.entity';
import {UserEntity} from "../entities/user.entity";

@Injectable()
export class UserFollowersService {
    constructor(
        @InjectRepository(UserFollowerEntity)
        private readonly userFollowersRepo: Repository<UserFollowerEntity>,
    ) {}

    async create(followingId: number, followerId: number): Promise<UserFollowerEntity> {
        if (followingId === followerId) {
            throw new HttpException('You can\'t follow yourself!', 400);
        }

        const count = await this.userFollowersRepo.count({ followingId, followerId });

        if (count > 0) {
            throw new HttpException('This user is already followed by you!', 400);
        }

        const entity = this.userFollowersRepo.create({ followingId, followerId });

        await this.userFollowersRepo.insert(entity);

        return entity;
    }

    getAllByFollower(followerId: number): Promise<UserEntity[]> {
        return this.userFollowersRepo.createQueryBuilder('f')
            .where('f.followerId = :followerId', { followerId })
            .innerJoinAndSelect('f.following', 'u')
            .getMany()
            .then((data) => data.map((item) => item.following));
    }
}
