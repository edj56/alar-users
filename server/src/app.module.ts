import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-snake-naming-strategy';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRoot({
          type: 'postgres',
          url: process.env.DATABASE_URL,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
          migrationsRun: true,
          migrations: [__dirname + '/migrations/*{.ts,.js}'],
          cli: {
              migrationsDir: 'src/migrations',
          },
          namingStrategy: new SnakeNamingStrategy(),
      }),
      UsersModule,
      AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
