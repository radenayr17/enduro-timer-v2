import { Request, Response } from "express";

import { SUCCESS_TXT } from "@/constants";
import { ErrorMessage, RaceErrorMessage } from "@/constants/error";
import { IDDto } from "@/dtos/common";
import PrismaClient from "@/prisma/client";

const deleteCategory = async (req: Request<IDDto>, res: Response) => {
  const { subId: id } = req.params;

  const category = await PrismaClient.raceCategory.findUnique({
    where: { id },
    select: { id: true, racer: { select: { id: true } } },
  });

  if (!category) {
    return res.status(404).json({ message: ErrorMessage.INVALID_REQUEST });
  }

  const racer = category.racer ?? [];

  if (racer.length) {
    return res.status(400).json({ message: RaceErrorMessage.CATEGORY_CANNOT_BE_DELETED });
  }

  const response = await PrismaClient.raceCategory.delete({ where: { id: category.id } });

  console.log(response);

  res.status(200).json({ message: SUCCESS_TXT });
};

export default deleteCategory;
