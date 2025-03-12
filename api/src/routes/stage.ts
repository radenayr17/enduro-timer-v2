import { Router } from "express";

import { IDDto } from "@/dtos/common";
import { AssignStageRecordDto, CreateStageRecordDto } from "@/dtos/stages";
import {
  getStages,
  getStage,
  getStageRecords,
  createStageRecord,
  deleteStageRecord,
  assignStageRecord,
} from "@/services/stages";
import { asyncHandlerWrapper, bodyDtoValidator, parameterDtoValidator } from "@/middlewares";

const router = Router();

router.get("/", getStages);
router.get("/:id", parameterDtoValidator(IDDto), asyncHandlerWrapper(getStage));
router.get("/:id/records", parameterDtoValidator(IDDto), asyncHandlerWrapper(getStageRecords));

router.post(
  "/:id/records",
  parameterDtoValidator(IDDto),
  bodyDtoValidator(CreateStageRecordDto),
  asyncHandlerWrapper(createStageRecord)
);
router.post(
  "/:id/records/:subId/assign",
  parameterDtoValidator(IDDto),
  bodyDtoValidator(AssignStageRecordDto),
  asyncHandlerWrapper(assignStageRecord)
);

router.delete("/:id/records/:subId", parameterDtoValidator(IDDto), asyncHandlerWrapper(deleteStageRecord));

export default router;
