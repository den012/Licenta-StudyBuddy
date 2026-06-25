import { vi } from 'vitest';

vi.mock('../../src/prisma/prisma.ts', () => {
  const mock = {
    user: {
      count: vi.fn(),
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    skill: {
      create: vi.fn(),
      findFirst: vi.fn(),
      findMany: vi.fn(),
    },
    userSwipe: {
      count: vi.fn(),
      create: vi.fn(),
      deleteMany: vi.fn(),
      findFirst: vi.fn(),
      findMany: vi.fn(),
      updateMany: vi.fn(),
    },
    userSkill: {
      createMany: vi.fn(),
      deleteMany: vi.fn(),
      findMany: vi.fn(),
    },
    dm: {
      create: vi.fn(),
      findMany: vi.fn(),
    },
    $transaction: vi.fn(),
  };

  mock.$transaction.mockImplementation(
    async (cb: (tx: typeof mock) => Promise<unknown>) => cb(mock),
  );

  return { default: mock };
});

vi.mock('../../src/server-ws.ts', () => ({
  default: {
    init: vi.fn(),
    notifyMatch: vi.fn(),
    notifyMessage: vi.fn(),
  },
}));
