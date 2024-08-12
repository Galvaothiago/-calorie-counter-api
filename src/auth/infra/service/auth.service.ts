import { Inject, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repository/user.repository';
import { UnauthorizedError } from '../exceptions/unauthorized.exception';
import { UserDto } from 'src/auth/dto/user/user.dto';
import { SignDto } from 'src/auth/core/domain/entities/sign.dto';

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
    @Inject('UserRepositoryProvider')
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validatePhoneNumberAndPassword(phoneNumber: string, password: string) {
    const user = await this.userRepository.findByPhoneNumber(phoneNumber);

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        return {
          ...user,
          password: undefined,
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
