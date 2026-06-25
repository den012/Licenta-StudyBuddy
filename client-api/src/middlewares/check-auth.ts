import type { RequestHandler } from 'express';
import { expressjwt } from 'express-jwt';

const checkAuth: RequestHandler = (req, res, next) =>
  expressjwt({
    algorithms: ['HS256'],
    requestProperty: 'user',
    secret: process.env.SECRET ?? '?',
  })(req, res, next);

export default checkAuth;
