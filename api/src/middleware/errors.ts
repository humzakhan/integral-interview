import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ errors: [{ message: "Something went wrong" }] });
};