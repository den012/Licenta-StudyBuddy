import express from 'express';
import Joi from 'joi';

import checkJoi from '../middlewares/check-joi.ts';
import skillsService from './skills.service.ts';

const router = express.Router();

router.get('/skills', async (_req, res) => {
  const data = await skillsService.skills_GET();
  res.data(data);
});

router.post(
  '/skills',
  checkJoi(
    Joi.object({
      title: Joi.string().required(),
    }),
  ),
  async (req, res) => {
    const data = await skillsService.skills_POST(req.body);
    res.data(data, 201);
  },
);

export default router;
