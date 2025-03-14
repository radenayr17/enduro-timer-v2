import { Router } from "express";

import { IDDto } from "@/dtos/common";
import {
  CreateRaceDto,
  CreateRacerDto,
  CreateRaceRecordDto,
  CreateRaceStageDto,
  GetRacerByCategoryDto,
  GetRacersDto,
} from "@/dtos/races";
import { asyncHandlerWrapper, bodyDtoValidator, parameterDtoValidator, queryDtoValidator } from "@/middlewares";
import {
  createRace,
  createRaceCategory,
  createRacer,
  createRaceRecord,
  createRaceStage,
  deleteCategory,
  deleteRace,
  deleteRacer,
  deleteRaceRecord,
  deleteStage,
  getRace,
  getRacers,
  getRacersByCategory,
  getRaces,
  updateRace,
  getResults,
} from "@/services/races";

const router = Router();

router.get("/", getRaces);
router.get("/:id", parameterDtoValidator(IDDto), asyncHandlerWrapper(getRace));
router.get(
  "/:id/racers",
  parameterDtoValidator(IDDto),
  queryDtoValidator(GetRacersDto),
  asyncHandlerWrapper(getRacers)
);
router.get("/:id/categories/:subId/racers", parameterDtoValidator(IDDto), asyncHandlerWrapper(getRacersByCategory));
router.get("/:id/categories/:subId/results", parameterDtoValidator(IDDto), asyncHandlerWrapper(getResults));

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
router.post(
  "/:id/racers",
  bodyDtoValidator(CreateRacerDto),
  parameterDtoValidator(IDDto),
  asyncHandlerWrapper(createRacer)
);
router.post(
  "/:id/records",
  bodyDtoValidator(CreateRaceRecordDto),
  parameterDtoValidator(IDDto),
  asyncHandlerWrapper(createRaceRecord)
);

router.put("/:id", bodyDtoValidator(CreateRaceDto), parameterDtoValidator(IDDto), asyncHandlerWrapper(updateRace));

router.delete("/:id", parameterDtoValidator(IDDto), asyncHandlerWrapper(deleteRace));
router.delete("/:id/categories/:subId", parameterDtoValidator(IDDto), asyncHandlerWrapper(deleteCategory));
router.delete("/:id/stages/:subId", parameterDtoValidator(IDDto), asyncHandlerWrapper(deleteStage));
router.delete("/:id/racers/:subId", parameterDtoValidator(IDDto), asyncHandlerWrapper(deleteRacer));
router.delete("/:id/records/:subId", parameterDtoValidator(IDDto), asyncHandlerWrapper(deleteRaceRecord));

export default router;
