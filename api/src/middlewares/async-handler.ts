import { Request, Response, NextFunction, Handler } from "express";

type AsyncHandler<T = void> = (req: Request, res: Response, next: NextFunction) => Promise<T>;

export function asyncHandlerWrapper<T>(asyncHandler: AsyncHandler<T>): Handler {
  return (req, res, next) => {
    asyncHandler(req, res, next).catch(next);
  };
}
