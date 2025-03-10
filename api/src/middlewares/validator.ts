import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";

const dtoValidator = async (dto: any, data: Record<string, any>, req: Request, res: Response, next: NextFunction) => {
  const dtoInstance = new dto(data);
  const errors = await validate(dtoInstance);

  if (errors.length > 0) {
    return res.status(400).json({ message: errors });
  }

  next();
};

export const bodyDtoValidator = (dto: any) => async (req: Request, res: Response, next: NextFunction) => {
  await dtoValidator(dto, req.body, req, res, next);
};

export const parameterDtoValidator = (dto: any) => async (req: Request, res: Response, next: NextFunction) => {
  await dtoValidator(dto, req.params, req, res, next);
};

export const queryDtoValidator = (dto: any) => async (req: Request, res: Response, next: NextFunction) => {
  await dtoValidator(dto, req.query, req, res, next);
};
