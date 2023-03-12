import { UserController } from 'controllers/user.controller';
import { Router } from 'express';
import { auth, checkRole } from 'middlewares/auth.middleware';

const router = Router();

router.get('/', UserController.findAll);
router.get('/:userId', auth, UserController.findOne);
router.get('/:id/orders', auth, UserController.getListOrderOfUser);
router.post('/', auth, UserController.create);
router.put('/:userId', auth, UserController.update);
router.delete('/:userId', auth, UserController.remove);

export const UsersRoutes = router;
