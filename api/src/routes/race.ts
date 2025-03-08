import { Router } from "express";

import { IDDto } from "@/dtos/common";
import { CreateRaceDto, CreateRaceStageDto, GetRacerByCategoryDto } from "@/dtos/races";
import { asyncHandlerWrapper, bodyDtoValidator, parameterDtoValidator } from "@/middlewares";
import {
  createRace,
  createRaceCategory,
  createRaceStage,
  deleteRace,
  getRace,
  getRacers,
  getRacersByCategory,
  getRaces,
} from "@/services/races";

const router = Router();

router.get("/", getRaces);
router.get("/:id", parameterDtoValidator(IDDto), asyncHandlerWrapper(getRace));
router.get("/:id/racers", parameterDtoValidator(IDDto), asyncHandlerWrapper(getRacers));
router.get(
  "/:id/categories/:categoryId/racers",
  parameterDtoValidator(GetRacerByCategoryDto),
  asyncHandlerWrapper(getRacersByCategory)
);
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

router.delete("/:id", parameterDtoValidator(IDDto), asyncHandlerWrapper(deleteRace));

export default router;
