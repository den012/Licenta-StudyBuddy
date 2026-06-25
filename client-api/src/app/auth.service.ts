import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

import prisma from '../prisma/prisma.ts';
import HttpException from '../utils/http-exception.ts';

const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID ?? '?';
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN ?? '?';
const SECRET = process.env.SECRET ?? '?';

const jwks = jwksClient({
  jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  cache: true,
  rateLimit: true,
});

const auth = async ({ accessToken }: { accessToken: string }) => {
  const { name, picture, sub } = await verifyAccessToken(accessToken);

  let user = await prisma.user.findUnique({
    select: {
      id: true,
    },
    where: { authId: sub },
  });

  if (!user) {
    const { id } = await prisma.user.create({
      data: {
        authId: sub,
        avatar: picture ?? null,
        name: name ?? null,
      },
      select: { id: true },
    });

    user = { id };
  }

  const token = jwt.sign({ id: user.id }, SECRET, { algorithm: 'HS256' });

  return { token };
};

const verifyAccessToken = async (accessToken: string) => {
  const decoded = jwt.decode(accessToken, { complete: true });

  if (!decoded || !decoded.header || !decoded.header.kid)
    throw new HttpException({ status: httpStatus.BAD_REQUEST });

  try {
    const signingKey: string = await new Promise((resolve, reject) => {
      jwks.getSigningKey(decoded.header.kid, (error, signingKey) => {
        if (error || !signingKey)
          return reject(error ?? new Error('"signingKey" not defined'));

        resolve(signingKey.getPublicKey());
      });
    });

    const payload:
      | string
      | (jwt.JwtPayload & { name?: string; picture?: string }) = jwt.verify(
      accessToken,
      signingKey,
      {
        algorithms: ['RS256'],
        audience: AUTH0_CLIENT_ID,
        issuer: `https://${AUTH0_DOMAIN}/`,
      },
    );

    if (typeof payload === 'string' || !payload.sub)
      throw new HttpException({ status: httpStatus.BAD_REQUEST });

    return {
      name: payload.name,
      picture: payload.picture,
      sub: payload.sub,
    };
  } catch (error) {
    throw new HttpException({ status: httpStatus.BAD_REQUEST });
  }
};

export default { auth };
