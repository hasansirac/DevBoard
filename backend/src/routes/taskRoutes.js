const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const taskController = require("../controllers/taskController");

router.post("/", authMiddleware, taskController.createTask);

router.get("/board/:boardId", authMiddleware, taskController.getTasksByBoardId);

router.put("/:id", authMiddleware, taskController.updateTask);

router.delete("/:id", authMiddleware, taskController.deleteTask);

module.exports = router;