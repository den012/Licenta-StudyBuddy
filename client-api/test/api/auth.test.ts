import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';

import '../mocks/auth-service.mock.ts';
import authService from '../../src/app/auth.service.ts';
import { app } from '../../src/server.ts';

describe('POST /auth', () => {
  beforeEach(() => {
    vi.mocked(authService.auth).mockResolvedValue({ token: 'signed-test-token' });
  });

  it('returns 422 when accessToken is missing', async () => {
    const res = await request(app).post('/auth').send({});

    expect(res.status).toBe(422);
    expect(res.body.status).toBe(422);
    expect(res.body.errors).toBeDefined();
    expect(authService.auth).not.toHaveBeenCalled();
  });

  it('returns 201 and token when auth succeeds', async () => {
    const res = await request(app)
      .post('/auth')
      .send({ accessToken: 'auth0-access-token' });

    expect(res.status).toBe(201);
    expect(res.body.data).toEqual({ token: 'signed-test-token' });
    expect(authService.auth).toHaveBeenCalledWith({
      accessToken: 'auth0-access-token',
    });
  });
});
