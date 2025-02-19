import { Request, Response } from "express";

import { CreateRaceDto } from "@/dtos/races";
import PrismaClient from "@/prisma/client";

const createRace = async (req: Request<unknown, unknown, CreateRaceDto>, res: Response) => {
  const { name, description, from, to } = req.body;
  const userId = req.headers.userId as string;

  const race = await PrismaClient.race.create({
    data: {
      name,
      description,
      from,
      to,
      userId,
    },
  });

  res.status(200).json({ ...race });
};

export default createRace;
