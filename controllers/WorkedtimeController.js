import WorkedtimeModel from "../models/WorkedtimeModel.js";
import { validationResult } from "express-validator";

export default class WorkedtimeController {
  static async getAll(req, res) {
    try {
      const workedtimes = await WorkedtimeModel.find().populate({
        path: "employee_id",
        populate: [{ path: "position_id" }, { path: "department_id" }],
      });
      res.status(200).json(workedtimes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async show(req, res) {
    try {
      let id = req.params.id
      const workedtime = await WorkedtimeModel.findById(id).populate({
        path: "employee_id",
        populate: [{ path: "position_id" }, { path: "department_id" }],
      });
      return res.status(200).json(workedtime)
      
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
        time,
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
      )
      const newRecords = [];
      selectedEmployees.forEach((employeeId) => {
        dates.forEach((date) => {
          const key = `${employeeId}_${date}`;
          if (!existingSet.has(key)) {
            newRecords.push({
              employee_id: employeeId,
              date: new Date(date),
              time: Number(time),
            });
          }
        });
      });
      const workedtimes = await WorkedtimeModel.insertMany(newRecords);
      res
        .status(200)
        .json({ message: "Рабочее время успешно добавлено", workedtimes });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async update(req, res) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return res.status(400).json({ errors: validationErrors.array() });
      }
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
          message:
            "Не удалось найти рабочее время для редактирования для редактирования!",
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

      const deletedWorkedtime = await WorkedtimeModel.findByIdAndDelete(id);
      if (!deletedWorkedtime) {
        return res
          .status(404)
          .json({ message: "Не удалось найти рабочее время для удаления!" });
      }
      res.status(200).json({
        message: "Рабочее время успешно удалено",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}