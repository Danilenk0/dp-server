import { Router } from 'express'
import PositionController from '../controllers/PositionController.js'

const router = Router();

router.post("/", (req, res) => PositionController.create(req, res));
router.get("/", (req, res) => PositionController.getAll(req, res));

export default router;