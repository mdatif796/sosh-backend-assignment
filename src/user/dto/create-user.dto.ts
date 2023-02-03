import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
