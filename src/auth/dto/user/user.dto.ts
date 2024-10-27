import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { IsPasswordStrong } from 'src/auth/validators/password.validator';
export class UserDto {
  id?: string;
  @IsString()
  @IsPhoneNumber()
  phoneNumber: string;
  @IsOptional()
  @IsPasswordStrong({
    message:
      'Password must be at least 8 characters long, contain letters, numbers, and symbols.',
  })
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
