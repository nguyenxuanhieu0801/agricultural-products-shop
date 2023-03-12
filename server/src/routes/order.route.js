import { OrderController } from 'controllers/order.controller';
import { Router } from 'express';
import { auth, checkRole } from 'middlewares/auth.middleware';

const router = Router();

router.get('/', auth, OrderController.findAll);
router.get('/today', OrderController.getAllOrdersToday);
router.get('/report/:startDate/:endDate', auth, checkRole, OrderController.report);
router.get('/listOrderDetail/:id', auth, OrderController.getListOrderDetail);
router.get('/:id', auth, OrderController.findOne);
router.post('/', auth, OrderController.create);
router.put('/:id', auth, OrderController.update);

export const OrderRoutes = router;
