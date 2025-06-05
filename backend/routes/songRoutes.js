import express from 'express';
const router = express.Router();

router.get('/test', (req, res) => {
  res.send('Song route is working');
});

router.get('/songs', (req, res) => {
  res.send('Get all songs');
});

router.get('/stream/:filename', (req, res) => {
  res.send(`Streaming ${req.params.filename}`);
});

export default router;