import { IsOptional, IsString, IsUUID } from "class-validator";

class GetRacersDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  constructor(data: GetRacersDto) {
    this.categoryId = data.categoryId;
  }
}

export default GetRacersDto;
