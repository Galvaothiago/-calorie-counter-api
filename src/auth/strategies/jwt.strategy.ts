import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface UserFromJwt {
  id: string;
  phoneNumber: string;
}

interface PayloadProp {
  sub: string;
  phoneNumber: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: PayloadProp): Promise<UserFromJwt> {
    return {
      id: payload.sub,
      phoneNumber: payload.phoneNumber,
    };
  }
}
