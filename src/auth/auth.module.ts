import { Module } from '@nestjs/common';
import { AuthController } from './infra/controller/user.controller';
import { UserRepository } from './infra/repository/user.repository';
import { SignUseCase } from './core/application/use-cases/sign';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    SignUseCase,
  ],
})
export class AuthModule {}
