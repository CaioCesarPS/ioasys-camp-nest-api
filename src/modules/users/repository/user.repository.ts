import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDTO } from '@shared/dtos/user/createUser.dto';
import { User } from '@shared/entities/user/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      email,
    });

    return user;
  }

  async create(
    createUserDTO: CreateUserDTO,
  ): Promise<User> {
    const user = this.repository.create(createUserDTO);

    await this.repository.save(user);

    return user;
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async findByToken(
    token: string,
    tokenType: TokenTypesEnum,
  ): Promise<User | undefined> {
    return this.repository.findOne({
      where: { [tokenType]: token },
    });
  }

  async findById(id: string): Promise<User | undefined> {
    return this.repository.findOne(id);
  }
}
