import mongoose from "mongoose";
import TasksModel from "../model/TaskModel.js";

export const CreateTask = async (req, res) => {
    try {
        let bodyData = req.body;
        let user_id = req.headers['user_id'];
        bodyData['user_id'] = user_id;
        await TasksModel.create(bodyData);
        res.json({ status: "success", messege: "Task Create successful"});
    }
    catch(e) {
        return res.json({ status: "fail", messege: e.toString() });
    }
}

export const TaskList = async (req, res) => {
    try {
        let user_id = req.headers['user_id'];
        let dataList = await TasksModel.find({ "user_id": user_id }, { "_id": 0 });
        return res.json({ status: "success", 'taskList': dataList});
    }
    catch(e) {
        return res.json({ status: "fail", messege: e.toString() });
    }
}

export const UpdateTaskStatus = async (req, res) => {
    try {
        let id = req.params['id'];
        let status = req.params['status'];
        let user_id = req.headers['user_id'];

        await TasksModel.updateOne({ "_id": id, "user_id": user_id}, { 'status': status });
        return res.json({ status: "success", messege: "TaskStatus Update successful"});
    }
    catch(e) {
        return res.json({ status: "fail", messege: e.toString() });
    }

}

export const TaskListByStatus = async (req, res) => {
    try {
        let user_id = req.headers['user_id'];
        let status = req.params['status'];
    
        let resultList = await TasksModel.find({ "user_id": user_id, "status": status }, { "_id": 0, "user_id": 0, "createdAt": 0, "updatedAt": 0 });
        if(!resultList) {
            return res.json({ status: "success", messege: "No Task List found" });
        }
        else {
            return res.json({ status: "success", messege: "TaskList By Status successful", "status List": resultList});
        }
    }
    catch(e) {
        return res.json({ status: "fail", messege: e.toString() });
    }
}

export const DeleteTask = async (req, res) => {
    try {
        let user_id = req.headers['user_id'];
        let task_id = req.params['id'];
        await TasksModel.deleteOne({ "_id": user_id, "_id": task_id });
        return res.json({ status: "success", messege: "Task Delete."});
    }
    catch(e) {
        return res.json({ status: "fail", messege: e.toString() });
    }

}

export const CountTask = async (req, res) => {
    try {
        // let ObjectId = mongoose.Types.ObjectId(req.headers['user_id']);
        let user_id = new mongoose.Types.ObjectId(req.headers['user_id']);
        // let user_id = req.headers['user_id'];
        let data = await TasksModel.aggregate([
            {
                $match: { "user_id": user_id }
            },
            {
                $group: { "_id": "$status", total: { $count: {}}}
            }
        ])
        return res.json({ status: "success", data: data });

    }
    catch(e) {
        return res.json({ status: "fail", messege: e.toString() });
    }

}