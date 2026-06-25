import { describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '../../src/server.ts';
import { signTestJwt } from '../helpers/sign-test-jwt.ts';

describe('Unknown routes', () => {
  it('returns 404 when authenticated and path does not exist', async () => {
    const res = await request(app)
      .get('/this-route-does-not-exist')
      .set('Authorization', `Bearer ${signTestJwt(1)}`);

    expect(res.status).toBe(404);
    expect(res.body.data).toBeUndefined();
  });
});
