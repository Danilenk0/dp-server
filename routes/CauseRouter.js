import { Router } from 'express'
import CauseController from '../controllers/CauseController.js'

const router = Router();

router.post('/', (req, res) => CauseController.create(req, res));
router.get('/', (req, res) => CauseController.getAll(req, res))

export default router;