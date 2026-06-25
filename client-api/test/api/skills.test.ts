import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';

import type { SkillModel } from '../../src/prisma/generated/models/Skill.ts';
import prisma from '../../src/prisma/prisma.ts';
import { app } from '../../src/server.ts';
import { signTestJwt } from '../helpers/sign-test-jwt.ts';

const mockSkills = [
  { id: 1, title: 'Math' },
  { id: 2, title: 'Physics' },
] as unknown as SkillModel[];

describe('GET /skills', () => {
  beforeEach(() => {
    vi.mocked(prisma.skill.findMany).mockResolvedValue(mockSkills);
  });

  it('returns 401 without a token', async () => {
    const res = await request(app).get('/skills');
    expect(res.status).toBe(401);
  });

  it('returns 200 and skill list when authenticated', async () => {
    const res = await request(app)
      .get('/skills')
      .set('Authorization', `Bearer ${signTestJwt(1)}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([
      { id: 1, title: 'Math' },
      { id: 2, title: 'Physics' },
    ]);
  });
});

describe('POST /skills', () => {
  it('returns 422 when title is missing', async () => {
    const res = await request(app)
      .post('/skills')
      .set('Authorization', `Bearer ${signTestJwt(1)}`)
      .send({});

    expect(res.status).toBe(422);
    expect(prisma.skill.create).not.toHaveBeenCalled();
  });
});
