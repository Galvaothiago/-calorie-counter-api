import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Sign } from 'crypto';
import { SignUseCase } from 'src/auth/core/application/use-cases/sign';
import { RecoverPasswordDto } from 'src/auth/core/domain/entities/recover-password';
import { SignUpDto } from 'src/auth/core/domain/entities/sign-up.dto';
import { SignDto } from 'src/auth/core/domain/entities/sign.dto';
import { IsPublic } from 'src/auth/decorators/endpoint-public.decorator';
import { UserDto } from 'src/auth/dto/user/user.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guards';
import { AuthService } from '../service/auth.service';
import { SignUpUseCase } from 'src/auth/core/application/use-cases/sign-up';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signupUseCase: SignUpUseCase,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: SignDto) {
    return this.authService.login(dto);
  }

  @Post('signup')
  async signUp(@Body() dto: UserDto): Promise<UserDto> {
    return this.signupUseCase.execute(dto.phoneNumber, dto.password);
  }

  @Post('recover-password')
  async recoverPassword(@Body() dto: RecoverPasswordDto): Promise<void> {
    return null;
  }
}
