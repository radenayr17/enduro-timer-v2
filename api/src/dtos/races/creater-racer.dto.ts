import { IsAlpha, IsArray, IsDateString, IsNotEmpty, IsNumber, IsUUID, ValidateNested } from "class-validator";

class RacerStageDto {
  @IsNotEmpty()
  stageId: string;

  @IsNotEmpty()
  @IsDateString()
  startTime: string;

  constructor(data: RacerStageDto) {
    this.stageId = data.stageId;
    this.startTime = data.startTime;
  }
}

class CreateRacerDto {
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  @IsAlpha()
  firstName: string;

  @IsNotEmpty()
  @IsAlpha()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsArray()
  @IsNotEmpty({ each: true })
  @ValidateNested({ each: true })
  stages: RacerStageDto[];

  constructor(data: CreateRacerDto) {
    this.categoryId = data.categoryId;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.number = data.number;
    this.stages = data.stages.map((stage) => new RacerStageDto(stage));
  }
}

export default CreateRacerDto;
