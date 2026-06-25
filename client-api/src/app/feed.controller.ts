import express from 'express';
import feedService from './feed.service.ts';

const router = express.Router();

router.get('/feed', async (req, res) => {
  res.data(await feedService.feed_GET({ userId: req.user.id }));
});

router.post('/feed-reset', async (req, res) => {
  res.data(await feedService.feedReset_POST({ userId: req.user.id }), 201);
});

export default router;
