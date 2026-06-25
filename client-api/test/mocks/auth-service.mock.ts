import { vi } from 'vitest';

vi.mock('../../src/app/auth.service.ts', () => ({
  default: {
    auth: vi.fn(),
  },
}));
