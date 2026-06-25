import type { Request, Response } from 'express';
import { UnauthorizedError } from 'express-jwt';
import httpStatus from 'http-status';
import HttpException from '../utils/http-exception.ts';

const errorHandler = (error: any, _req: Request, res: Response, _next: any) => {
  res.statusCode = 500;

  if (error instanceof HttpException) {
    if (error.status) res.statusCode = error.status;

    res.json({
      errors: error.errors,
      status: error.status,
      statusName: httpStatus[`${error.status}_NAME` as keyof typeof httpStatus],
    });
  } else if (error instanceof UnauthorizedError) {
    const error = new HttpException({ status: httpStatus.UNAUTHORIZED });
    errorHandler(error, _req, res, _next);
  } else {
    res.json({ status: 500, statusName: httpStatus['500_NAME'] });
    console.log('[ERROR]', error);
  }
};

export default errorHandler;
