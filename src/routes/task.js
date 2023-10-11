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

router.get("/", tokenAuth, getTasks);
router.get("/:id", tokenAuth, getTask);
router.post("/", tokenAuth, createTask);
router.patch("/:id", tokenAuth, editTask);
router.delete("/:id", tokenAuth, deleteTask);

export default router;
