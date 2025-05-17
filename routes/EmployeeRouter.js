import {Router} from "express";
import EmployeeController from "../controllers/EmployeeController.js"; 
import { employeeValidator } from "../utils/Validators.js";

const router = Router();

router.get("/", (req, res) => EmployeeController.getAll(req, res));
router.get("/:id", (req, res) => EmployeeController.show(req, res));
router.post("/", employeeValidator, (req, res) => EmployeeController.create(req, res));
router.put("/:id", employeeValidator, (req, res) => EmployeeController.update(req, res));
router.delete("/:id", (req, res) => EmployeeController.delete(req, res));


export default router;
