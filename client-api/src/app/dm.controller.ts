import express from 'express';
import Joi from 'joi';

import checkJoi from '../middlewares/check-joi.ts';
import dmService from './dm.service.ts';

const router = express.Router();

router.get(
  '/dm/:receiverUserId',
  checkJoi(
    Joi.object({
      receiverUserId: Joi.string().required(),
    }),
  ),
  async (req, res) => {
    const receiverUserId = parseInt(req.params.receiverUserId.toString(), 10);

    const data = await dmService.dm_GET({
      receiverUserId,
      userId: req.user.id,
    });

    res.data(data);
  },
);

router.post(
  '/dm/:receiverUserId',
  checkJoi(
    Joi.object({
      message: Joi.string().required(),
      receiverUserId: Joi.string().required(),
    }),
  ),
  async (req, res) => {
    const receiverUserId = parseInt(req.params.receiverUserId.toString(), 10);

    const data = await dmService.dm_POST({
      message: req.body.message,
      receiverUserId,
      userId: req.user.id,
    });

    res.data(data, 201);
  },
);

export default router;
