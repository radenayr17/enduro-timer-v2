import { IsOptional, IsString, IsUUID } from "class-validator";

class IDDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsUUID()
  @IsOptional()
  subId?: string;

  constructor(data: IDDto) {
    this.id = data.id;
    this.subId = data.subId;
  }
}

export default IDDto;
