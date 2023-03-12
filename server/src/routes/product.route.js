import { ProductController } from 'controllers/product.controller';
import { Router } from 'express';
import { auth, checkRole } from 'middlewares/auth.middleware';

const router = new Router();

router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findOne);
router.post('/', auth, checkRole, ProductController.create);
router.put('/:id', auth, checkRole, ProductController.update);
router.delete('/:id', auth, checkRole, ProductController.remove);

export const ProductRouter = router;
