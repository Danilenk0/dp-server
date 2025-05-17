import mongoose from 'mongoose'

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    }
})

const DepartmentModel = mongoose.model("Department", departmentSchema);
export default DepartmentModel;