import { INestApplicationContext } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import * as Faker from 'faker';

import { UserEntity } from '../../users/entities/user.entity';

export class SeedUsersCommand {
    private repository: Repository<UserEntity>;

    constructor(ctx: INestApplicationContext) {
        this.repository = ctx.get(getRepositoryToken(UserEntity));
    }

    async seed() {
        const total = 100000;
        const chunk = 500;

        for (let i = 0; i < total / chunk; i++) {
            const users: UserEntity[] = [];

            for (let j = 0; j < chunk; j++) {
                const user: Partial<UserEntity> = {
                    firstName: Faker.fake('{{name.firstName}}'),
                    lastName: Faker.fake('{{name.lastName}}'),
                    username: Faker.fake('{{internet.userName}}') + Faker.datatype.number({ min: 1, max: 1000 }),
                    email: Faker.fake('{{internet.email}}') + Faker.datatype.number({ min: 1, max: 1000 }),
                    password: '12345',
                    birthDate: Faker.date.past().toISOString().substring(0, 10),
                    country: Faker.fake('{{address.country}}'),
                    city: Faker.fake('{{address.city}}'),
                    phoneNumber: Faker.fake('{{phone.phoneNumber}}').substring(0, 16),
                    gender: Faker.datatype.boolean() ? 'm' : 'f'
                };

                users.push(this.repository.create(user));
            }

            const result = await this.repository.insert(users);
            console.log(i, result.raw.length);
        }
    }
}
