import { Request, Response } from "express";
import dayjs from "dayjs";

import PrismaClient from "@/prisma/client";

import { IDDto } from "@/dtos/common";
import { ErrorMessage } from "@/constants/error";
import { AssignStageRecordDto } from "@/dtos/stages";

const assignStageRecord = async (req: Request<IDDto, unknown, AssignStageRecordDto>, res: Response) => {
  const { subId: id } = req.params;
  const { racerId } = req.body;

  const record = await PrismaClient.raceRecord.findUnique({
    where: { id },
    select: { id: true, time: true, stageId: true },
  });

  if (!record) {
    return res.status(404).json({ message: ErrorMessage.INVALID_REQUEST });
  }

  const [response, raceTime] = await Promise.all([
    PrismaClient.raceRecord.update({
      where: { id },
      data: {
        racerId,
      },
    }),
    PrismaClient.racerTime.findFirst({
      where: { racerId, stageId: record.stageId },
      select: { id: true, startTime: true },
    }),
  ]);

  console.log("raceTime", raceTime);

  if (raceTime) {
    const finishTime = dayjs(record.time);
    const startTime = dayjs(raceTime.startTime);
    const diffTime = finishTime.diff(startTime, "millisecond");

    await PrismaClient.racerTime.update({
      where: { id: raceTime.id },
      data: {
        diffTime,
        finishTime: finishTime.toISOString(),
        recordId: record.id,
      },
    });
  }

  res.status(200).json(response);
};

export default assignStageRecord;
