import { afterEach, beforeEach, vi } from 'vitest';

import './mocks/prisma-client.mock.ts';

import prisma from '../src/prisma/prisma.ts';

process.env.SECRET = 'test-secret';

beforeEach(() => {
  vi.mocked(prisma.$transaction).mockImplementation(
    async (cb: (tx: typeof prisma) => Promise<unknown>) => cb(prisma),
  );
});

afterEach(() => {
  vi.clearAllMocks();
  vi.mocked(prisma.$transaction).mockImplementation(
    async (cb: (tx: typeof prisma) => Promise<unknown>) => cb(prisma),
  );
});
