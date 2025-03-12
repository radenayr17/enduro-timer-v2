import { IsDateString, IsNotEmpty } from "class-validator";

class CreateStageRecordDto {
  @IsDateString()
  @IsNotEmpty()
  time: string;

  constructor(data: CreateStageRecordDto) {
    this.time = data.time;
  }
}

export default CreateStageRecordDto;
