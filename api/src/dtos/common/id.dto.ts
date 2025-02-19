import { IsOptional, IsString, IsUUID } from "class-validator";

class IDDto {
  @IsString()
  @IsUUID()
  id?: string;

  constructor(data: IDDto) {
    this.id = data.id;
  }
}

export default IDDto;
