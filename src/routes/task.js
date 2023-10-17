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
import { sessionAuth } from "../middleware/sessionAuth.js";
import {
  createTasksValidationRegister,
  getTaskValidationRegister,
  getTasksValidationRegister,
  validateTask,
} from "../middleware/taskValidator.js";

const router = express.Router();

router.get("/", sessionAuth, getTasks);
router.get("/:id", sessionAuth, getTask);
router.post("/", sessionAuth, createTask);
router.patch("/:id", sessionAuth, editTask);
router.delete("/:id", sessionAuth, deleteTask);

export default router;
