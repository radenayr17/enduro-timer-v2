import { Router } from "express";

import { IDDto } from "@/dtos/common";
import { CreateRaceDto, CreateRaceStageDto, GetRacerByCategoryDto } from "@/dtos/races";
import { asyncHandlerWrapper, bodyDtoValidator, parameterDtoValidator, queryDtoValidator } from "@/middlewares";
import {
  createRace,
  createRaceCategory,
  createRaceStage,
  deleteRace,
  getRace,
  getRacers,
  getRacersByCategory,
  getRaces,
  updateRace,
  deleteCategory,
  deleteStage,
} from "@/services/races";
import GetRacersDto from "@/dtos/races/get-racers.dto";

const router = Router();

router.get("/", getRaces);
router.get("/:id", parameterDtoValidator(IDDto), asyncHandlerWrapper(getRace));
router.get(
  "/:id/racers",
  parameterDtoValidator(IDDto),
  queryDtoValidator(GetRacersDto),
  asyncHandlerWrapper(getRacers)
);
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

router.put("/:id", bodyDtoValidator(CreateRaceDto), parameterDtoValidator(IDDto), asyncHandlerWrapper(updateRace));

router.delete("/:id", parameterDtoValidator(IDDto), asyncHandlerWrapper(deleteRace));
router.delete("/:id/categories/:subId", parameterDtoValidator(IDDto), asyncHandlerWrapper(deleteCategory));
router.delete("/:id/stages/:subId", parameterDtoValidator(IDDto), asyncHandlerWrapper(deleteStage));

export default router;
