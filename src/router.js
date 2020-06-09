import { Router } from 'express';
import * as Projects from './controllers/project_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to 2 Many Tabz api!' });
});

router.route('/signin')
  .post(requireSignin, UserController.signin)
  .get(requireAuth, UserController.check);
router.post('/signup', UserController.signup);

// requireAuth,
router.route('/projects')
  .post(requireAuth, Projects.createProject)
  .put(requireAuth, Projects.mergeProjects)
  .get(requireAuth, Projects.getProjects);

router.route('/project/:projectName')
  .get(requireAuth, Projects.getProject)
  .delete(requireAuth, Projects.deleteProject)
  .put(requireAuth, Projects.updateProject);

router.route('/resources/:projectName')
  .post(requireAuth, Projects.newResources)
  .delete(requireAuth, Projects.deleteResources)
  .put(requireAuth, Projects.updateResource);

export default router;
