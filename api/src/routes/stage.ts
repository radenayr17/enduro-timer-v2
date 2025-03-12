import { Router } from "express";

import { IDDto } from "@/dtos/common";
import { CreateStageRecordDto } from "@/dtos/stages";
import { getStages, getStage, getStageRecords, createStageRecord, deleteStageRecord } from "@/services/stages";
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

router.delete("/:id/records/:subId", parameterDtoValidator(IDDto), asyncHandlerWrapper(deleteStageRecord));

export default router;
