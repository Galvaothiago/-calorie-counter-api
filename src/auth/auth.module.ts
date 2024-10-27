import { Module } from '@nestjs/common';
import { AuthController } from './infra/controller/user.controller';
import { UserRepository } from './infra/repository/user.repository';
import { SignUseCase } from './core/application/use-cases/sign';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './infra/service/auth.service';
import { TypeormUserRepository } from './infra/database/typeorm/repositories/typeorm-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormUserEntity } from './infra/database/typeorm/entities/typeorm-user.entity';
import { TypeormModule } from './infra/database/typeorm/typeorm.module';
import { LocalStrategy } from './strategies/local.strategy';
import { SignUpUseCase } from './core/application/use-cases/sign-up';

@Module({
  imports: [
    TypeormModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
      }),
    }),
  ],
  controllers: [AuthController],

  providers: [
    {
      provide: 'IUserRepository',
      useClass: TypeormUserRepository,
    },
    SignUseCase,
    SignUpUseCase,
    AuthService,
    LocalStrategy,
  ],
  exports: ['IUserRepository'],
})
export class AuthModule {}
