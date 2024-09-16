import mongoose from "mongoose";
import UsersModel from "./UserModel.js";

const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        discription: { type: String, required: true },
        status: { type: String, required: true },
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: UsersModel }
    },
    {
        timestamps: true,
        versionKey: false
    }
)
const TasksModel = mongoose.model("tasks", taskSchema);
export default TasksModel;