import { Router } from 'express'
import DepartmentController from '../controllers/DepartmentController.js'

const router = Router();

router.post("/", (req, res) => DepartmentController.create(req, res));
router.get("/", (req, res) => DepartmentController.getAll(req, res));

export default router;