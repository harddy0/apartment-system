export class CreateUserDto {
  email: string | undefined;
  firstName: string | undefined;
  lastName?: string;
  userRoleId: number | undefined;
}
