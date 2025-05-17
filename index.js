import express from 'express'
import dotenv from 'dotenv';
import { mongoose } from 'mongoose'
import cors from "cors";
import EmployeeRouter from './routes/EmployeeRouter.js'
import CauseRouter from './routes/CauseRouter.js'
import DepartmentRouter from './routes/DepartmentRouter.js'
import PositionRouter from './routes/PositionRouter.js'
import WorkedtimeRouter from './routes/WorkedtimeRouter.js'
import NoshowRouter from './routes/NoshowRouter.js'


const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/employee", EmployeeRouter);
app.use("/cause", CauseRouter);
app.use("/department", DepartmentRouter);
app.use("/position", PositionRouter);
app.use("/workedtime", WorkedtimeRouter);
app.use("/noshow", NoshowRouter);


async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/employeestime");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
    connectDB();
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });