import { DeliveryController } from 'controllers/delivery.controller';
import { Router } from 'express';
import { auth, checkRole } from 'middlewares/auth.middleware';

const router = new Router();

router.get('/', DeliveryController.findAll);
router.get('/:id', DeliveryController.findOne);
router.post('/',auth, checkRole ,DeliveryController.create);
router.put('/:id', auth, checkRole, DeliveryController.update);

export const DeliveryRoutes = router;
