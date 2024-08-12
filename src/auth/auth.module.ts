import { Module } from '@nestjs/common';
import { AuthController } from './infra/controller/user.controller';
import { UserRepository } from './infra/repository/user.repository';
import { SignUseCase } from './core/application/use-cases/sign';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './infra/service/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'UserRepositoryProvider',
      useClass: UserRepository,
    },
    SignUseCase,
    AuthService,
  ],
})
export class AuthModule {}
