import DepartmentModel from "../models/DepartmentModel.js";

export default class DepartmentController {
  static async getAll(req, res) {
    try {
      const departments = await DepartmentModel.find();
      res.status(200).json(departments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async create(req, res) {
    try {
      const cause = new DepartmentModel(req.body);
      cause.save();
      res.status(201).json({
        message: "Отдел успешно добавлена успешно добавлен!",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
