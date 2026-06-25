import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';

import type { UserModel } from '../../src/prisma/generated/models/User.ts';
import prisma from '../../src/prisma/prisma.ts';
import { app } from '../../src/server.ts';
import { signTestJwt } from '../helpers/sign-test-jwt.ts';

const meProfileRow = {
  id: 1,
  avatar: null,
  bio: 'Hello',
  name: 'Test User',
  yob: null,
} as unknown as UserModel;

describe('GET /me', () => {
  beforeEach(() => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(meProfileRow);
  });

  it('returns 401 without Authorization header', async () => {
    const res = await request(app).get('/me');

    expect(res.status).toBe(401);
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
  });

  it('returns 200 and profile when token is valid', async () => {
    const token = signTestJwt(1);
    const res = await request(app).get('/me').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({
      id: 1,
      name: 'Test User',
      bio: 'Hello',
    });
    expect(prisma.user.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 1 },
      }),
    );
  });

  it('returns 404 when user is not found', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
    const token = signTestJwt(999);
    const res = await request(app).get('/me').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(res.body.errors).toMatchObject({ user: 'NOT_FOUND' });
  });
});
