import mongoose from "mongoose";

const workedtimeSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: Number,
        required:true
    }
});

const WorkedtimeModel = mongoose.model("Workedtime", workedtimeSchema);
export default WorkedtimeModel;
