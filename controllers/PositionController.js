import PositionModel from "../models/PositionModel.js";

export default class PositionController {
  static async getAll(req, res) {
      try {
        const positions = await PositionModel.find();
        res.status(200).json(positions);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  static async create(req, res) {
    try {
      const position = new PositionModel(req.body);
      position.save();
      res.status(201).json({
        message: "Должность успешно добавлена успешно добавлен!",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
