import {Router} from "express";
import NoshowController from "../controllers/NoshowController.js"; 
import { noshowValidator } from "../utils/Validators.js";

const router = Router();

router.get("/", (req, res) => NoshowController.getAll(req, res));
router.post("/", noshowValidator, (req, res) => NoshowController.create(req, res));
router.put("/:id", noshowValidator, (req, res) => NoshowController.update(req, res));
router.delete("/:id", (req, res) => NoshowController.delete(req, res));


export default router;
