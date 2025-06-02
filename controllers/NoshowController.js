import NoshowModel from '../models/NoshowModal.js'
import { validationResult } from "express-validator";
import WorkedtimeModel from '../models/WorkedtimeModel.js'

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

      const {
        type,
        cause_id,
        selectedDay,
        selectedMonth,
        selectedYear,
        selectedEmployees,
      } = req.body;
      const { start, end } = selectedDay;

      const startDate = new Date(
        Date.UTC(selectedYear, selectedMonth - 1, start)
      );
      const endDate = end
        ? new Date(Date.UTC(selectedYear, selectedMonth - 1, end))
        : startDate;

      const dates = [];
      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setUTCDate(d.getUTCDate() + 1)
      ) {
        dates.push(d.toISOString().split("T")[0]);
      }

      const existingRecords = await WorkedtimeModel.find({
        employee_id: { $in: selectedEmployees },
        date: { $in: dates.map((date) => new Date(date)) },
      });

      const existingSet = new Set(
        existingRecords.map(
          (record) =>
            `${record.employee_id}_${record.date.toISOString().split("T")[0]}`
        )
      );

      const noshow = await NoshowModel.find({
        employee_id: { $in: selectedEmployees },
        date: { $in: dates.map((date) => new Date(date)) },
      });

      const noshowSet = new Set(
        noshow.map(
          (absence) =>
            `${absence.employee_id}_${absence.date.toISOString().split("T")[0]}`
        )
      );

      const newRecords = [];
      selectedEmployees.forEach((employeeId) => {
        dates.forEach((date) => {
          const key = `${employeeId}_${date}`;
          const currentDate = new Date(date);
          const dayOfWeek = currentDate.getUTCDay(); 

         
          if (
            !existingSet.has(key) &&
            !noshowSet.has(key) &&
            dayOfWeek !== 0 &&
            dayOfWeek !== 6
          ) {
            newRecords.push({
              employee_id: employeeId,
              date: currentDate,
              type,
              cause_id,
            });
          }
        });
      });

      if (newRecords.length > 0) {
        const noshows = await NoshowModel.insertMany(newRecords);
        res.status(200).json({
          message: `Неявка успешно добавлена.`,
          noshows,
        });
      } else {
        res.status(200).json({
          message: `Нет новых записей для добавления.`,
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async update(req, res) {
    try {
      let id = req.params.id;
      const updatedNoshow = await NoshowModel.findByIdAndUpdate(id, req.body);
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

      const deletedNoshow = await NoshowModel.findByIdAndDelete(id);
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
