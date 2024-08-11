import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract findByPhoneNumber(phoneNumber: string): Promise<User>;
  abstract save(user: User): Promise<void>;
  abstract recoverPassword(phoneNumber: string): Promise<string>;
}
