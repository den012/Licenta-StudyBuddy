import { describe, expect, it } from 'vitest';
import request from 'supertest';

import prisma from '../../src/prisma/prisma.ts';
import { app } from '../../src/server.ts';
import { signTestJwt } from '../helpers/sign-test-jwt.ts';

describe('PUT /my-skills', () => {
  it('returns 422 when know or wantToLearn is missing', async () => {
    const res = await request(app)
      .put('/my-skills')
      .set('Authorization', `Bearer ${signTestJwt(1)}`)
      .send({ know: [] });

    expect(res.status).toBe(422);
    expect(prisma.skill.findMany).not.toHaveBeenCalled();
  });
});
