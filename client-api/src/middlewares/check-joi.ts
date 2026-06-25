import type { RequestHandler } from 'express';
import type { Schema } from 'joi';

import httpStatus from 'http-status';
import HttpException from '../utils/http-exception.ts';

const checkJoi =
  (schema: Schema): RequestHandler =>
  (req, _res, next) => {
    const { error } = schema.validate(
      { ...req?.body, ...req?.params, ...req?.query },
      { abortEarly: false },
    );

    if (!error) return next();

    const errors: { [key: string]: string } = {};

    for (const { message, path, type } of error.details) {
      errors[path.join('.') || 'ROOT'] = message; /* type */
    }

    throw new HttpException({
      errors,
      status: httpStatus.UNPROCESSABLE_ENTITY,
    });
  };

export default checkJoi;
