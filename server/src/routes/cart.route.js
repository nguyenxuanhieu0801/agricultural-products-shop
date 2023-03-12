import { CartController } from 'controllers/cart.controller';
import { Router } from 'express';
import { auth } from 'middlewares/auth.middleware';

const router = Router();

router.get('/', auth, CartController.getCart);
router.post('/', auth, CartController.addToCart);
// router.put('/update', CartController.updateCart);
router.delete('/:id', auth, CartController.removeItem);

export const CartRouter = router;
