import { Router } from 'express';
import { getOperations, createOperation, updateOperation, deleteOperation } from '../controllers/operationsController';

const router = Router();

router.get('/', getOperations);
router.post('/', createOperation);
router.put('/:id', updateOperation);
router.delete('/:id', deleteOperation);

export default router;
