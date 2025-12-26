import { Router } from 'express';
import { GroupsController } from '../controllers/groupsController';

const router = Router();

router.get('/', GroupsController.getGroups);
router.post('/', GroupsController.createGroup);
router.put('/:id', GroupsController.updateGroup);
router.delete('/:id', GroupsController.deleteGroup);

export default router;
