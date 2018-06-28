export class CreateUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly hospital: string;
  readonly role: string;
}