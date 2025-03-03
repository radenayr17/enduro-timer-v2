import { IsString, IsUUID } from "class-validator";

import { IDDto } from "../common";

class GetRacerByCategoryDto extends IDDto {
  @IsString()
  @IsUUID()
  categoryId?: string;

  constructor(data: GetRacerByCategoryDto) {
    super(data);

    this.categoryId = data.categoryId;
  }
}

export default GetRacerByCategoryDto;
