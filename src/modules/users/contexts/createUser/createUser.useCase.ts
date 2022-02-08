import {
  ConflictException,
  UnprocessableEntityException,
  NotFoundException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { addSeconds, getUnixTime } from 'date-fns';

import {
  alreadyExists,
  dependencyIsMissing,
  notFound,
} from '@config/constants/errors';
import { ENCRYPT_PROVIDER, MAILER_PROVIDER } from '@config/constants/providers';
import {
  EMAIL_REPOSITORY,
  TERMS_REPOSITORY,
  USER_REPOSITORY,
} from '@config/constants/repositories';

import { CreateUserRequestBodyDTO } from '@shared/dtos/user/createUserRequestBody.dto';
import { User } from '@shared/entities/user/user.entity';
import { UserRepository } from '@modules/user/repositority/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository,
  ) {}

  async execute(
    language: string,
    { firstName, lastName, email, password, termIds }: CreateUserRequestBodyDTO,
  ): Promise<User> {
    const savedUser = await this.userRepository.findByEmail(email);

    if (savedUser) {
      throw new ConflictException(alreadyExists('email'));
    }

    const hashedPassword = this.encryption.createHash(password);

    const payload = {
      email: email,
      iat: getUnixTime(new Date()),
      exp: getUnixTime(
        addSeconds(new Date(), this.configService.get<number>('expiresIn')),
      ),
    };

    const jwtToken = this.jwtService.sign(payload);

    const uniqueTermIds = [...new Set(termIds)];

    const searchTerms = await this.termsRepository.findByIds(uniqueTermIds);

    if (searchTerms.length !== uniqueTermIds.length) {
      throw new NotFoundException(notFound('term'));
    }

    const contentMail = await this.emailRepository.FindEmailByLanguage({
      language,
      category: EmailCategory.SUBSCRIBE,
    });

    if (!contentMail) {
      throw new UnprocessableEntityException(dependencyIsMissing);
    }

    const user = await this.userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      twoFactorAuthToken: jwtToken,
      terms: searchTerms,
    });

    return user;
  }
}
