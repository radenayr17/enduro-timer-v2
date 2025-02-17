import { IsString, IsNotEmpty, IsAlphanumeric, IsAlpha } from "class-validator";

class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  password: string;

  @IsString()
  @IsAlpha()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  lastName: string;

  constructor(data: CreateUserDto) {
    this.username = data.username;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
  }
}

export default CreateUserDto;
