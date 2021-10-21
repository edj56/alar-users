import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from '../app.module';
import {SeedUsersCommand} from "./commands/users.command";

function bootstrap() {
    NestFactory.createApplicationContext(AppModule)
        .then((ctx) => {
            return Promise.all([
                new SeedUsersCommand(ctx).seed(),
            ]).then(() => ctx.close());
        })
        .catch(error => {
            throw error;
        });
}

bootstrap();
