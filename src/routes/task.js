"use strict";
import express from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getTask,
  getTasks,
} from "../controllers/task.js";
import { tokenAuth } from "../middleware/tokenAuth.js";
import {
  createTasksValidationRegister,
  getTaskValidationRegister,
  getTasksValidationRegister,
  validateTask,
} from "../middleware/taskValidator.js";

const router = express.Router();

router.get("/", tokenAuth, getTasksValidationRegister, validateTask, getTasks);
router.get("/:id", tokenAuth, getTaskValidationRegister, validateTask, getTask);
router.post(
  "/",
  tokenAuth,
  createTasksValidationRegister,
  validateTask,
  createTask
);
router.patch("/:id", tokenAuth, editTask);
router.delete("/:id", tokenAuth, deleteTask);

export default router;
