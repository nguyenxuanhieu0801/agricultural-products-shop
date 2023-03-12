import { CategoryController } from 'controllers/category.controller';
import { Router } from 'express';
import { auth, checkRole } from 'middlewares/auth.middleware';

const router = new Router();

router.get('/', CategoryController.findAll);
router.get('/:id', CategoryController.findOne);
router.post('/', auth, checkRole, CategoryController.create);
router.put('/:id', auth, checkRole, CategoryController.update);
router.delete('/:id', auth, checkRole, CategoryController.remove);

export const CategoryRouter = router;
