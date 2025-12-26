import { Router } from 'express';
import { getProductionLines, createProductionLine, updateProductionLine, deleteProductionLine } from '../controllers/productionLinesController';

const router = Router();

router.get('/', getProductionLines);
router.post('/', createProductionLine);
router.put('/:id', updateProductionLine);
router.delete('/:id', deleteProductionLine);

export default router;
