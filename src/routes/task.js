'use strict';
import express from 'express';
import {
  createTask,
  deleteTask,
  editTask,
  getTask,
  getTasks,
} from '../controllers/task.js';
import { tokenAuth } from '../middleware/tokenAuth.js';
import { sessionAuth } from '../middleware/sessionAuth.js';
import {
  createTasksValidationRegister,
  getTaskValidationRegister,
  getTasksValidationRegister,
  validateTask,
} from '../middleware/taskValidator.js';
import { checkCache } from '../middleware/check-cache.js';
import { cache } from '../libs/cache.js';

const router = express.Router();

function check(req, res, next) {
  const cacheKey = `__kctm__${req.url}`;

  const data = cache.get('test');
  console.log(data);
}

router.get('/', sessionAuth, check, getTasks);
router.get('/:id', sessionAuth, getTask);
router.post('/', sessionAuth, createTask);
router.patch('/:id', sessionAuth, editTask);
router.delete('/:id', sessionAuth, deleteTask);

export default router;
