import jwt from 'jsonwebtoken';

const secret = () => process.env.SECRET ?? 'test-secret';

export const signTestJwt = (userId: number): string =>
  jwt.sign({ id: userId }, secret(), { algorithm: 'HS256' });
