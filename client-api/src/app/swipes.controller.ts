import express from 'express';
import Joi from 'joi';

import checkJoi from '../middlewares/check-joi.ts';
import swipesService from './swipes.service.ts';

const router = express.Router();

router.post(
  '/swipes',
  checkJoi(
    Joi.object({
      swipedUserId: Joi.number().required(),
      type: Joi.string().valid('LIKE', 'SKIP').required(),
    }),
  ),
  async (req, res) => {
    const { swipedUserId, type } = req.body;

    const data = await swipesService.swipes_POST({
      swipedUserId,
      type,
      userId: req.user.id,
    });

    res.data(data, 201);
  },
);

router.get('/swipes-matches', async (req, res) => {
  const data = await swipesService.swipesMatches_GET({ userId: req.user.id });
  res.data(data);
});

router.get('/swipes-matches-unread', async (req, res) => {
  const data = await swipesService.swipesMatchesUnread_GET({
    userId: req.user.id,
  });
  res.data(data);
});

router.post('/swipes-matches-unread', async (req, res) => {
  const data = await swipesService.swipesMatchesUnread_POST({
    userId: req.user.id,
  });
  res.data(data, 201);
});

export default router;
