import { Router } from 'express';
import * as UserController from './controllers/user_controller';
import { requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our 2ManyTabz api!' });
});

router.post('/signin', requireSignin, UserController.signin);

router.post('/signup', UserController.signup);

export default router;
