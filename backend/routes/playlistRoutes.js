import express from 'express';
const router = express.Router();

router.get('/test', (req, res) => {
  res.send('Playlist route is working');
});

export default router;