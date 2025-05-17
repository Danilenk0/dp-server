import NoshowModel from '../models/NoshowModal.js'
import { validationResult } from "express-validator";

export default class NoshowController {
  static async getAll(req, res) {
    try {
      const noshows = await NoshowModel.find().populate([
        "employee_id",
        "cause_id",
      ]);
      res.status(200).json(noshows);
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
      const noshow = new NoshowModel(req.body);
      noshow.save();

      res.status(200).json({
        message: "Неявка работника успешно добавлена!",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async update(req, res) {
    try {
      let id = req.params.id;
      const updatedNoshow = await NoshowModel.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updatedNoshow) {
        return res.status(404).json({
          message:
            "Не удалось найти неявку для редактирования для редактирования!",
        });
      }
      res.status(200).json({
        message: "Неявка успешно обновлено",
        data: updatedNoshow,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async delete(req, res) {
    try {
      const id = req.params.id;

      const deletedNoshow = NoshowModel.findByIdAndDelete(id);
      if (!deletedNoshow) {
        return res
          .status(404)
          .json({ message: "Не удалось найти неявку для удаления!" });
      }
      res.status(200).json({
        message: "Рабочее время успешно удалено",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
