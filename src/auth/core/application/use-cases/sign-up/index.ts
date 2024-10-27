import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { User } from 'src/auth/core/domain/entities/user.entity';
import { IUserRepository } from 'src/auth/core/repositories/user.repository.interface';
import { UserDto } from 'src/auth/dto/user/user.dto';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { UnauthorizedError } from 'src/auth/infra/exceptions/unauthorized.exception';

export class SignUpUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository<User>,
  ) {}

  async execute(phoneNumber: string, password: string): Promise<UserDto> {
    if (!this.isValidPhoneNumber(phoneNumber)) {
      throw new UnauthorizedException('Invalid phone number');
    }

    const hasUser = await this.userRepository.findByPhoneNumber(phoneNumber);

    if (hasUser) {
      throw new UnauthorizedException('Invalid phone number');
    }

    const user = await this.userRepository.create({
      id: uuid(),
      phoneNumber,
      password: await this.generatePasswordHash(password),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    user.password = undefined;

    return user;
  }

  private async generatePasswordHash(password: string): Promise<string> {
    const saltRounds = 10; // O número de rounds de sal para aumentar a segurança
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }

  private isValidPhoneNumber(phoneNumber: string) {
    const regex = /^\+\d{10,}$/; // Deve começar com + e ter pelo menos 10 dígitos
    return regex.test(phoneNumber);
  }
}
