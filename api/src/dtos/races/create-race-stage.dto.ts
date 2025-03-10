import { IsNotEmpty, IsString } from "class-validator";

class CreateRaceStageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  constructor(data: CreateRaceStageDto) {
    this.name = data.name;
  }
}

export default CreateRaceStageDto;
