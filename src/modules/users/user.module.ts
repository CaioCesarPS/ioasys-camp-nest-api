import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BcryptProvider } from '@shared/providers/EncryptProvider/bcrypt.provider';

import { CreateUserController } from '@modules/users/contexts/createUser/createUser.controller';
import { CreateUserUseCase } from '@modules/users/contexts/createUser/createUser.useCase';
import { UserRepository } from '@modules/users/repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    BcryptProvider,
  ],
  providers: [
    { provide: 'ENCRYPT_PROVIDER', useClass: BcryptProvider },
    CreateUserUseCase,
  ],
  controllers: [CreateUserController],
})
export class UserModule {}
