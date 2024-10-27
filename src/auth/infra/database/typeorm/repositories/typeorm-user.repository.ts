import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/core/domain/entities/user.entity';
import { IUserRepository } from 'src/auth/core/repositories/user.repository.interface';
import { UserDto } from 'src/auth/dto/user/user.dto';
import { Repository } from 'typeorm';
import { TypeormUserEntity } from '../entities/typeorm-user.entity';

@Injectable()
export class TypeormUserRepository
  implements IUserRepository<TypeormUserEntity>
{
  constructor(
    @InjectRepository(TypeormUserEntity)
    private readonly repository: Repository<UserDto>,
  ) {}
  async create(user: any): Promise<any> {
    return this.repository.save(user);
  }

  async delete(id: string): Promise<any> {
    return this.repository.delete(id);
  }

  async findById(id: string): Promise<any> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async findByPhoneNumber(phoneNumber: string): Promise<any> {
    return this.repository.findOne({
      where: { phoneNumber },
    });
  }

  async update(user: any): Promise<any> {
    return null;
  }
}
