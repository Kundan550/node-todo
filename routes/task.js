import express from 'express';
import cookieParser from 'cookie-parser';
import { deleteTask, getMyTask, newTask, updateTask } from '../contollers/task.js';
import { isAuthenticated } from '../middlewares/Auth.js';
const router = express.Router();
router.use(cookieParser());
router.post("/new",isAuthenticated,newTask);
router.get("/my",isAuthenticated,getMyTask);
router.route("/:id")
.put(isAuthenticated,updateTask)
.delete(isAuthenticated,deleteTask);
export default router;