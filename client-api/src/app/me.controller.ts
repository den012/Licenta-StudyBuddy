import express from 'express';
import Joi from 'joi';

import checkJoi from '../middlewares/check-joi.ts';
import meService from './me.service.ts';

const router = express.Router();

router.get('/me', async (req, res) => {
  const data = await meService.me_GET({ userId: req.user.id });
  res.data(data);
});

router.patch(
  '/me',
  checkJoi(
    Joi.object({
      avatar: Joi.string().optional(),
      bio: Joi.string().optional(),
      name: Joi.string().optional(),
      yob: Joi.number().optional(),
    }),
  ),
  async (req, res) => {
    const data = await meService.me_PATCH({
      data: req.body,
      userId: req.user.id,
    });

    res.data(data);
  },
);

export default router;
