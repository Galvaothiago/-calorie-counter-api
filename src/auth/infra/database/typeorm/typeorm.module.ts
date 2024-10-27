import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormUserEntity } from './entities/typeorm-user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // ou outro tipo de banco de dados que você está usando
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'yourpassword',
      database: 'example',
      entities: [TypeormUserEntity], // Registre sua entidade aqui
      synchronize: true, // use com cautela em produção
    }),
    TypeOrmModule.forFeature([TypeormUserEntity]),
  ],
  exports: [TypeOrmModule],
})
export class TypeormModule {}
