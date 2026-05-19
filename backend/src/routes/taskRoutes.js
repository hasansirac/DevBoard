/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const taskController = require("../controllers/taskController");

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
router.post("/", authMiddleware, taskController.createTask);

/**
 * @swagger
 * /api/tasks/board/{boardId}:
 *   get:
 *     summary: Get tasks by board ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
router.get("/board/:boardId", authMiddleware, taskController.getTasksByBoardId);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", authMiddleware, taskController.updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", authMiddleware, taskController.deleteTask);

module.exports = router;