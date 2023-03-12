import { UnitController } from 'controllers/unit.controller';
import { Router } from 'express';

const router = new Router();

router.get('/', UnitController.findAll);
router.get('/:id', UnitController.findOne);
router.post('/', UnitController.create);
router.put('/:id', UnitController.update);

export const UnitRoutes = router;
