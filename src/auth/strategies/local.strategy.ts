import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../infra/service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'phoneNumber' });
  }

  validate(phoneNumber: string, password: string) {
    return this.authService.validatePhoneNumberAndPassword(
      phoneNumber,
      password,
    );
  }
}
