import type { Request } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';
import { describe, expect, it, vi } from 'vitest';

import checkJoi from '../../src/middlewares/check-joi.ts';
import HttpException from '../../src/utils/http-exception.ts';

const minimalReq = (
  partial: Partial<Pick<Request, 'body' | 'params' | 'query'>>,
): Request =>
  ({
    body: partial.body ?? {},
    params: partial.params ?? {},
    query: partial.query ?? {},
  }) as Request;

describe('checkJoi', () => {
  it('calls next when body matches schema', () => {
    const schema = Joi.object({
      swipedUserId: Joi.number().required(),
      type: Joi.string().valid('LIKE', 'SKIP').required(),
    });
    const next = vi.fn();
    const handler = checkJoi(schema);

    handler(
      minimalReq({
        body: { swipedUserId: 1, type: 'LIKE' },
      }),
      {} as never,
      next,
    );

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  it('merges body, params, and query for validation', () => {
    const schema = Joi.object({
      receiverUserId: Joi.string().required(),
      message: Joi.string().required(),
    });
    const next = vi.fn();
    const handler = checkJoi(schema);

    handler(
      minimalReq({
        body: { message: 'hi' },
        params: { receiverUserId: '42' },
        query: {},
      }),
      {} as never,
      next,
    );

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('throws HttpException 422 with field errors when invalid', () => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    const next = vi.fn();
    const handler = checkJoi(schema);

    try {
      handler(minimalReq({ body: {} }), {} as never, next);
      expect.fail('expected HttpException');
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      const err = e as HttpException;
      expect(err.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
      expect(err.errors).toMatchObject({ name: expect.any(String) });
    }

    expect(next).not.toHaveBeenCalled();
  });
});
