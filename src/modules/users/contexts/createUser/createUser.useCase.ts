import {
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';

import { alreadyExists } from '@shared/constants/errors';

import { CreateUserRequestBodyDTO } from '@shared/dtos/user/createUserRequestBody.dto';
import { User } from '@shared/entities/user/user.entity';
import { UserRepository } from '@modules/users/repository/user.repository';
import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @Inject('ENCRYPT_PROVIDER')
    private encryption: BcryptProvider,
  ) {}

  async execute(
    { firstName, lastName, email, password }: CreateUserRequestBodyDTO,
  ): Promise<User> {
    const savedUser = await this.userRepository.findByEmail(email);

    if (savedUser) {
      throw new ConflictException(alreadyExists('email'));
    }

    const hashedPassword = this.encryption.createHash(password);

    const user = await this.userRepository.createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
