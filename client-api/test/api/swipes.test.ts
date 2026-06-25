import { describe, expect, it } from 'vitest';
import request from 'supertest';

import prisma from '../../src/prisma/prisma.ts';
import { app } from '../../src/server.ts';
import { signTestJwt } from '../helpers/sign-test-jwt.ts';

describe('POST /swipes', () => {
  it('returns 422 when body is invalid', async () => {
    const res = await request(app)
      .post('/swipes')
      .set('Authorization', `Bearer ${signTestJwt(1)}`)
      .send({});

    expect(res.status).toBe(422);
    expect(res.body.errors).toBeDefined();
    expect(prisma.userSwipe.create).not.toHaveBeenCalled();
  });
});
