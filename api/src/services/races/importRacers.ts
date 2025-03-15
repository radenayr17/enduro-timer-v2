import { Request, Response } from "express";
import { parse } from "csv-parse/sync";

import { CreateRacerDto } from "@/dtos/races";
import PrismaClient from "@/prisma/client";
import { IDDto } from "@/dtos/common";
import { ErrorMessage } from "@/constants/error";
import dayjs from "dayjs";
import { start } from "repl";

const importRacer = async (req: Request<IDDto>, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: ErrorMessage.FILE_NOT_FOUND });
    }

    const { mimetype, buffer } = req.file;

    if (mimetype !== "text/csv") {
      return res.status(400).json({ message: ErrorMessage.INVALID_REQUEST });
    }

    const race = await PrismaClient.race.findUnique({
      where: { id },
      select: {
        id: true,
        from: true,
        RaceCategory: { select: { id: true, name: true, key: true } },
        RaceStage: { select: { id: true, name: true, key: true } },
      },
    });

    if (!race) {
      return res.status(404).json({ message: ErrorMessage.NOT_FOUND });
    }

    const categories = race.RaceCategory ?? [];
    const stages = race.RaceStage ?? [];

    const csv = buffer.toString("utf-8");
    const records: Record<string, string>[] = await parse(csv, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      relax_column_count: true,
    });

    const raceFrom = dayjs(race.from).format("YYYY-MM-DD");

    for (const record of records) {
      const category = categories.find((category) => category.key === record.CATEGORY);
      const number = parseInt(record.NUMBER);

      if (!category) {
        throw new Error(ErrorMessage.INVALID_REQUEST);
      }

      const racerTime = stages.map((stage) => {
        const stageTime = record[stage.key] ?? null;

        if (!stageTime) {
          throw new Error(ErrorMessage.INVALID_REQUEST);
        }

        const startTime = dayjs(`${raceFrom} ${stageTime}`, "YYYY-MM-DD hh:mm:ss A");

        console.log(startTime.toISOString());

        return {
          stageId: stage.id,
          startTime: startTime.toISOString(),
        };
      });

      if (racerTime.length !== stages.length) {
        throw new Error(ErrorMessage.INVALID_REQUEST);
      }

      const racer = await PrismaClient.racer.findFirst({
        where: { category: { raceId: race.id }, number },
      });

      if (racer) {
        await PrismaClient.racerTime.deleteMany({ where: { racerId: racer.id } });
        await PrismaClient.racer.update({
          where: { id: racer.id },
          data: {
            firstName: record.FIRST_NAME,
            lastName: record.LAST_NAME,
            categoryId: category.id,
            address: record.ADDRESS ?? "",
            teams: record.TEAMS ?? "",
            RacerTime: {
              create: racerTime,
            },
          },
        });
      } else {
        await PrismaClient.racer.create({
          data: {
            number,
            firstName: record.FIRST_NAME,
            lastName: record.LAST_NAME,
            categoryId: category.id,
            address: record.ADDRESS ?? "",
            teams: record.TEAMS ?? "",
            RacerTime: {
              create: racerTime,
            },
          },
        });
      }

      console.log("racer", racer);

      console.log("recordTime", racerTime);
    }

    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: ErrorMessage.INTERNAL_SERVER_ERROR });
  }
};

export default importRacer;
