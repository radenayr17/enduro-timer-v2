import { IsString, IsNotEmpty, IsAlphanumeric, IsAlpha } from "class-validator";

class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  password: string;

  constructor(data: LoginDto) {
    this.username = data.username;
    this.password = data.password;
  }
}

export default LoginDto;
