import WorkedtimeModel from "../models/WorkedtimeModel.js";
import { validationResult } from "express-validator";

export default class WorkedtimeController {
  static async getAll(req, res) {
    try {
        const workedtimes = await WorkedtimeModel.find().populate('employee_id');
      res.status(200).json(workedtimes);
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
      const workedtime = new WorkedtimeModel(req.body);
      workedtime.save();

      res.status(200).json({
        message: "Рабочее время успешно добавлено!",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async update(req, res) {
    try {
      let id = req.params.id;
      const updatedWorkedtime = await WorkedtimeModel.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updatedWorkedtime) {
        return res.status(404).json({
          message: "Не удалось найти рабочее время для редактирования для редактирования!",
        });
      }
        res.status(200).json({
          message: "Рабочее время успешно обновлено",
          data: updatedWorkedtime,
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async delete(req, res) {
    try {
      const id = req.params.id;

      const deletedWorkedtime = WorkedtimeModel.findByIdAndDelete(id);
      if (!deletedWorkedtime) {
        return res
          .status(404)
          .json({ message: "Не удалось найти рабочее время для удаления!" });
        }
        res.status(200).json({
            message:"Рабочее время успешно удалено"
        })
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}