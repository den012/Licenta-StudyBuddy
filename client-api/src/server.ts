import cors from 'cors';
import express from 'express';
import http from 'http';

import authController from './app/auth.controller.ts';
import dmController from './app/dm.controller.ts';
import feedController from './app/feed.controller.ts';
import meController from './app/me.controller.ts';
import mySkillsController from './app/my-skills.controller.ts';
import skillsController from './app/skills.controller.ts';
import swipesController from './app/swipes.controller.ts';

import checkAuth from './middlewares/check-auth.ts';
import errorHandler from './middlewares/error-handler.ts';
import resData from './middlewares/res-data.ts';
import ws from './server-ws.ts';

const app = express();
app.disable('x-powered-by');

app.use(cors({ origin: '*' }));
app.use('/public', express.static(`${process.cwd()}/public`));

app.use(express.json());
app.use(express.urlencoded());
app.use(resData);

app.use(authController);
app.use(checkAuth, dmController);
app.use(checkAuth, feedController);
app.use(checkAuth, meController);
app.use(checkAuth, mySkillsController);
app.use(checkAuth, skillsController);
app.use(checkAuth, swipesController);

app.use((_req, res) => res.data(undefined, 404));
app.use(errorHandler);

const listen = () => {
  const server = http.createServer(app);
  ws.init(server);

  server.listen(parseInt(process.env.PORT ?? '1234', 10), '0.0.0.0', () => {
    console.log(`Magic happens on port ${process.env.PORT}`);
  });
};

export { app };
export default { listen };
