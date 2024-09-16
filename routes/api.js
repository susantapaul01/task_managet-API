import express from 'express';
const router = express.Router();

import * as TaskController from "../app/controllers/TaskControllers.js";
import * as UserController from "../app/controllers/UsersControllers.js";
import authMiddleware from '../app/middlewares/authMiddleware.js';

// ==== User router
router.post('/registration', UserController.Registration);
router.post('/login', UserController.Login);
router.get('/profileDetail', authMiddleware, UserController.ProfileDetail);
router.post('/profileUpdate', authMiddleware, UserController.ProfileUpdate);
router.post('/emailVerify/:email', UserController.EmailVerify);
router.post('/codeVerify', UserController.CodeVerify);
router.post('/resetPassword', UserController.ResetPassword);


// === Task router
router.post('/createTask', authMiddleware, TaskController.CreateTask);
router.get('/taskList', authMiddleware, TaskController.TaskList);
router.post('/updateTaskStatus/:id/:status', authMiddleware, TaskController.UpdateTaskStatus);
router.post('/taskListByStatus/:status', authMiddleware, TaskController.TaskListByStatus);
router.post('/deleteTask/:id', authMiddleware, TaskController.DeleteTask);
router.get('/countTask', authMiddleware, TaskController.CountTask);


export default router;