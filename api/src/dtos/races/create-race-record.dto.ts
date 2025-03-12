import { IsDateString, IsNotEmpty, IsUUID } from "class-validator";

class CreateRaceRecordDto {
  @IsUUID()
  @IsNotEmpty()
  stageId: string;

  @IsDateString()
  @IsNotEmpty()
  time: string;

  constructor(data: CreateRaceRecordDto) {
    this.time = data.time;
    this.stageId = data.stageId;
  }
}

export default CreateRaceRecordDto;
