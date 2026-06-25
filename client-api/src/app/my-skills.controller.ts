import express from 'express';
import Joi from 'joi';

import checkJoi from '../middlewares/check-joi.ts';
import mySkillsService from './my-skills.service.ts';

const router = express.Router();

router.get('/my-skills', async (req, res) => {
  const data = await mySkillsService.mySkills_GET({ userId: req.user.id });
  res.data(data);
});

router.put(
  '/my-skills',
  checkJoi(
    Joi.object({
      know: Joi.array().items(Joi.string()).required(),
      wantToLearn: Joi.array().items(Joi.string()).required(),
    }),
  ),
  async (req, res) => {
    const { know, wantToLearn } = req.body;

    res.data(
      await mySkillsService.mySkills_PUT({
        know,
        userId: req.user.id,
        wantToLearn,
      }),
    );
  },
);

export default router;
