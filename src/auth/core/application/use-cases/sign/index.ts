import { UserDto } from 'src/auth/dto/user/user.dto';
import { UserRepository } from 'src/auth/infra/repository/user.repository';

export class SignUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(phoneNumber: string, password: string): Promise<UserDto> {
    const user = await this.userRepository.findByPhoneNumber(phoneNumber);
    if (!user || !this.verifyPassword(password, user.passwordHash)) {
      throw new Error('Invalid credentials');
    }
    return {
      id: user.id,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private verifyPassword(password: string, hash: string): boolean {
    // Verifica o hash da senha (pode usar bcrypt)
    return true;
  }
}
