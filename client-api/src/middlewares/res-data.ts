import type { RequestHandler } from "express";
import httpStatus from "http-status";

const resData: RequestHandler = (_req, res, next) => {
  res.data = (data?: any, status: number = 200) => {
    const statusName = httpStatus[`${status}_NAME` as keyof typeof httpStatus];

    res.statusCode = status;
    res.json({ data, status, statusName });
  };

  next();
};

export default resData;
