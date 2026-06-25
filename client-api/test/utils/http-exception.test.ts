import { describe, expect, it } from 'vitest';

import HttpException from '../../src/utils/http-exception.ts';

describe('HttpException', () => {
  it('defaults status to 500 when omitted', () => {
    const err = new HttpException({});
    expect(err.status).toBe(500);
  });

  it('stores status and errors', () => {
    const errors = { field: 'invalid' };
    const err = new HttpException({ status: 422, errors });
    expect(err.status).toBe(422);
    expect(err.errors).toEqual(errors);
  });
});
