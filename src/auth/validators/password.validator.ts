import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPasswordStrong', async: false })
export class IsPasswordStrongConstraint
  implements ValidatorConstraintInterface
{
  validate(password: string, args: ValidationArguments) {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Password must be at least 8 characters long and include letters, numbers, and symbols.';
  }
}

export function IsPasswordStrong(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPasswordStrongConstraint,
    });
  };
}
