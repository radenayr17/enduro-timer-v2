import { Router } from "express";

import { getRaces, createRace, createRaceStage, createRaceCategory } from "@/services/races";
import { CreateRaceDto, CreateRaceStageDto } from "@/dtos/races";
import { IDDto } from "@/dtos/common";
import { asyncHandlerWrapper, bodyDtoValidator, parameterDtoValidator } from "@/middlewares";

const router = Router();

router.get("/", getRaces);
router.post("/", bodyDtoValidator(CreateRaceDto), asyncHandlerWrapper(createRace));
router.post(
  "/:id/stages",
  bodyDtoValidator(CreateRaceStageDto),
  parameterDtoValidator(IDDto),
  asyncHandlerWrapper(createRaceStage)
);
router.post(
  "/:id/categories",
  bodyDtoValidator(CreateRaceStageDto),
  parameterDtoValidator(IDDto),
  asyncHandlerWrapper(createRaceCategory)
);

export default router;
