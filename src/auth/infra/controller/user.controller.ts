import { Body, Controller, Post } from '@nestjs/common';
import { Sign } from 'crypto';
import { SignUseCase } from 'src/auth/core/application/use-cases/sign';
import { RecoverPasswordDto } from 'src/auth/core/domain/entities/recover-password';
import { SignUpDto } from 'src/auth/core/domain/entities/sign-up.dto';
import { SignDto } from 'src/auth/core/domain/entities/sign.dto';
import { UserDto } from 'src/auth/dto/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly signUseCase: SignUseCase) {}

  @Post('login')
  async login(@Body() dto: SignDto): Promise<UserDto> {
    return this.signUseCase.execute(dto.phoneNumber, dto.password);
  }

  @Post('signup')
  async signUp(@Body() dto: SignUpDto): Promise<UserDto> {
    // return this.signUpUseCase.execute(dto.phoneNumber, dto.password);
    return null;
  }

  @Post('recover-password')
  async recoverPassword(@Body() dto: RecoverPasswordDto): Promise<void> {
    // return this.recoverPasswordUseCase.execute(dto.phoneNumber);
    return null;
  }
}
