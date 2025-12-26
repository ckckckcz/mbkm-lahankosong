import { Router } from 'express';
import { ShiftsController } from '../controllers/shiftsController';

const router = Router();

router.get('/', ShiftsController.getShifts);
router.post('/', ShiftsController.createShift);
router.put('/:id', ShiftsController.updateShift);
router.delete('/:id', ShiftsController.deleteShift);

export default router;
