import { IsNotEmpty, IsString } from "class-validator";

class CreateRaceStageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  key: string;

  constructor(data: CreateRaceStageDto) {
    this.name = data.name;
    this.key = data.key;
  }
}

export default CreateRaceStageDto;
