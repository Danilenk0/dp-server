import {Router} from "express";
import WorkedtimeController from "../controllers/WorkedtimeController.js"; 
import { workedtimeValidator } from "../utils/Validators.js";

const router = Router();

router.get("/", (req, res) => WorkedtimeController.getAll(req, res));
router.post("/", workedtimeValidator, (req, res) => WorkedtimeController.create(req, res));
router.put("/:id", workedtimeValidator, (req, res) => WorkedtimeController.update(req, res));
router.delete("/:id", (req, res) => WorkedtimeController.delete(req, res));


export default router;
