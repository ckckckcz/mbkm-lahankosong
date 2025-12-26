import { Router } from 'express';
import { OperationsController } from '../controllers/operationsController';

const router = Router();

router.get('/', OperationsController.getOperations);
router.post('/', OperationsController.createOperation);
router.put('/:id', OperationsController.updateOperation);
router.delete('/:id', OperationsController.deleteOperation);

export default router;
