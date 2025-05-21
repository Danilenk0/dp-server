import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  position_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Position",
  },
  department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
});

const EmployeeModel  =  mongoose.model('Employee', employeeSchema);
export default EmployeeModel;