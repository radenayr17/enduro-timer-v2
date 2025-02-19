import { IsDateString, IsNotEmpty, IsString } from "class-validator";

class CreateRaceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  from: string;

  @IsNotEmpty()
  @IsDateString()
  to: string;

  constructor(data: CreateRaceDto) {
    this.name = data.name;
    this.description = data.description;
    this.from = data.from;
    this.to = data.to;
  }
}

export default CreateRaceDto;
