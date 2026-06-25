import express from 'express';
import Joi from 'joi';
import checkJoi from '../middlewares/check-joi.ts';
import authService from './auth.service.ts';

const router = express.Router();

router.post(
  '/auth',
  checkJoi(
    Joi.object({
      accessToken: Joi.string().required(),
    }),
  ),
  async (req, res) => {
    const data = await authService.auth(req.body);
    res.data(data, 201);
  },
);

export default router;
