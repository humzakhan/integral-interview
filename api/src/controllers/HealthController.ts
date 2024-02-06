import { catchAsync } from '../utils';
import { Response, Request } from 'express';
import httpStatus from 'http-status';

export const healthCheck = catchAsync(async (req: Request, res: Response) => {
  res.status(httpStatus.OK).send({ message: "Healthy" });
});