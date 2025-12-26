import { Router } from 'express';
import { ProductionLinesController } from '../controllers/productionLinesController';

const router = Router();

router.get('/', ProductionLinesController.getProductionLines);
router.post('/', ProductionLinesController.createProductionLine);
router.put('/:id', ProductionLinesController.updateProductionLine);
router.delete('/:id', ProductionLinesController.deleteProductionLine);

export default router;
