import { UserDto } from 'src/auth/dto/user/user.dto';

export class UserRepository implements UserRepository {
  async findByPhoneNumber(phoneNumber: string) {
    return null;
  }
  async save(user: UserDto) {}
  async recoverPassword(phoneNumber: string) {
    return '';
  }
}
