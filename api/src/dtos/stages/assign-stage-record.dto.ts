import { IsNotEmpty, IsUUID } from "class-validator";

class AssignStageRecordDto {
  @IsUUID()
  @IsNotEmpty()
  racerId: string;

  constructor(data: AssignStageRecordDto) {
    this.racerId = data.racerId;
  }
}

export default AssignStageRecordDto;
