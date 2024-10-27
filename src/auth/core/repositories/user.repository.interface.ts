export abstract class IUserRepository<T> {
  abstract create(user: T): Promise<T>;
  abstract findById(id: string): Promise<T>;
  abstract findByPhoneNumber(phoneNumber: string): Promise<T>;
  abstract update(user: T): Promise<T>;
  abstract delete(id: string): Promise<T>;
}
