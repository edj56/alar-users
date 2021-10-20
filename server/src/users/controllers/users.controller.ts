import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { ApiFilterQueries, FilterEntities } from '../../core/decorators/filter.decorator';
import { IFilterEntities, IFilterResult } from '../../core/interfaces/filter.interface';
import { UserEntity } from '../entities/user.entity';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @ApiFilterQueries()
  getAll(
      @FilterEntities() filter: IFilterEntities,
  ): Promise<IFilterResult<UserEntity>> {
    return this.usersService.getAll(filter);
  }
}
