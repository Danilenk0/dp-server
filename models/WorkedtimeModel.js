import mongoose from "mongoose";

const workedtimeSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

// Создаем модель
const WorkedtimeModel = mongoose.model("Workedtime", workedtimeSchema);

// Создаем уникальный индекс на комбинацию employee_id и date
WorkedtimeModel.createIndexes({ employee_id: 1, date: 1 }, { unique: true });

export default WorkedtimeModel;
