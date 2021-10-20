import {HttpException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepo: Repository<UserEntity>,
    ) {}

    async create(payload: CreateUserDto): Promise<UserEntity> {
        const count = await this.usersRepo.count({
            where: [
                { email: payload.email },
                { username: payload.username },
            ],
        });

        if (count > 0) {
            throw new HttpException('This email or username is already taken!', 400);
        }

        const entity = this.usersRepo.create(payload);

        await this.usersRepo.insert(entity);

        return entity;
    }

    getWithPasswordByEmail(email: string): Promise<UserEntity> {
        return this.usersRepo.findOne({ email }, { select: ['id', 'email', 'password'] });
    }

    getAll(): Promise<UserEntity[]> {
        // TODO: add pagination and query
        return this.usersRepo.find();
    }
}
