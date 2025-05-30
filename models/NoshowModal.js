import mongoose from 'mongoose'

const noshowSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  cause_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cause",
  },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Employee'
  }
});

const NoshowModel = mongoose.model("Noshow", noshowSchema);
export default NoshowModel;