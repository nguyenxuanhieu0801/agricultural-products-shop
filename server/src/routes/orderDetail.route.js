import { OrderController } from 'controllers/order.controller';
import { Router } from 'express';
import { auth } from 'middlewares/auth.middleware';

const router = Router();

router.get('/', auth, OrderController.findAll);
router.get('/:orderId', auth, OrderController.findOne);
router.post('/', auth, OrderController.create);

export const OrderDetailRoutes = router;
