import EmployeeModel from "../models/EmployeeModel.js";
import { validationResult } from "express-validator";

export default class EmployeeController {
  static async getAll(req, res) {
    try {
      const employees = await EmployeeModel.find().populate([
        "department_id",
        "position_id",
      ]);
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async show(req, res) {
    const id = req.params.id;
    try {
      const employee = await EmployeeModel.findById(id);
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async create(req, res) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return res.status(400).json({ errors: validationErrors.array() });
      }
      const employee = new EmployeeModel(req.body);
      await employee.save();

      res.status(200).json({
        message: "Сотрудник успешно добавлен!",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async update(req, res) {
    try {
      let id = req.params.id;
      const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );
      if (!updatedEmployee) {
        return res.status(404).json({
          message: "Не удалось найти сотрудника для редактирования!",
        });
      }
      res.status(200).json({
        message: "Сотрудник был успешно обновлен!",
        data: updatedEmployee,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async delete(req, res) {
    try {
      const id = req.params.id;

      const deletedEmployeer = await EmployeeModel.findByIdAndDelete(id); 
      if (!deletedEmployeer) {
        return res
          .status(404)
          .json({ message: "Не удалось найти сотрудника для удаления!" });
      }

      res.status(200).json({
        message: "Сотрудник успешно удален!",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
