import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our 2ManyTabz api!' });
});

export default router;
