import { Inject, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repository/user.repository';
import { UnauthorizedError } from '../exceptions/unauthorized.exception';
import { UserDto } from 'src/auth/dto/user/user.dto';
import { SignDto } from 'src/auth/core/domain/entities/sign.dto';
import { IUserRepository } from 'src/auth/core/repositories/user.repository.interface';
import { User } from 'src/auth/core/domain/entities/user.entity';

interface PayloadProp {
  sub: string;
  phoneNumber: string;
}

export interface LoginResponse {
  accessToken: string;
  phoneNumber: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validatePhoneNumberAndPassword(phoneNumber: string, password: string) {
    const user = await this.userRepository.findByPhoneNumber(phoneNumber);

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        return {
          ...user,
          passwordHash: undefined,
        };
      }
    }

    throw new UnauthorizedError('Invalid credentials');
  }

  login(user: SignDto): LoginResponse {
    const payload: PayloadProp = {
      sub: user.phoneNumber,
      phoneNumber: user.phoneNumber,
    };

    const jwt = this.jwtService.sign(payload);

    return {
      accessToken: jwt,
      phoneNumber: user.phoneNumber,
    };
  }
}
