import type { Server as HttpServer } from 'http';
import type { Dm } from './prisma/generated/client.ts';
import jwt from 'jsonwebtoken';
import { Server as WsServer } from 'socket.io';

let io: WsServer;
const userSocket: { [key: number]: string } = {};

const init = (server: HttpServer) => {
  io = new WsServer(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    const token = socket.request.headers.authorization?.split(' ')[1];

    if (!token) return socket.disconnect(true);

    const SECRET = process.env.SECRET ?? '?';

    let payload: string | jwt.JwtPayload;

    try {
      payload = jwt.verify(token, SECRET, { algorithms: ['HS256'] });
    } catch (error) {
      return socket.disconnect(true);
    }

    if (typeof payload === 'string') return socket.disconnect(true);

    /**/

    const userId = payload.id;
    userSocket[userId] = socket.id;
    socket.data.userId = userId;

    const TOTAL = io.sockets.sockets.size;
    console.log(`ws -> connection (user ${userId}), total ${TOTAL}`);

    socket.on('disconnect', () => {
      delete userSocket[socket.data.userId];

      const TOTAL = io.sockets.sockets.size;
      console.log(`ws <- disconnect (#${socket.data.userId}), total ${TOTAL}`);
    });
  });
};

const notifyMatch = (swipedUserId: number, userId: number) => {
  const socket = io.sockets.sockets.get(userSocket[swipedUserId]);

  socket?.emit('match', { userId });
};

const notifyMessage = (dm: Dm, userId: number) => {
  const socket = io.sockets.sockets.get(userSocket[userId]);

  socket?.emit('message', dm);
};

export default { init, notifyMatch, notifyMessage };
