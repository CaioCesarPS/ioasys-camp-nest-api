import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateUserRequestBodyDTO } from '@shared/dtos/user/createUserRequestBody.dto';
import { User } from '@shared/entities/user/user.entity';
import { instanceToInstance } from 'class-transformer';

import { CreateUserUseCase } from './createUser.useCase';

@ApiTags('Users')
@Controller('users')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'This will be returned when has validation error',
  })
  public async create(
    @Body() createUserRequestBodyDTO: CreateUserRequestBodyDTO,
  ) {
    const user = await this.createUserUseCase.execute(createUserRequestBodyDTO);
    return instanceToInstance(user);
  }
}
