const { body } = require("express-validator");

const createTaskValidation = [
  body("boardId")
    .notEmpty()
    .withMessage("Board ID is required")
    .isInt()
    .withMessage("Board ID must be an integer"),

  body("title")
    .notEmpty()
    .withMessage("Task title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Task title must be between 3 and 100 characters"),

  body("status")
    .optional()
    .isIn(["todo", "in_progress", "done"])
    .withMessage("Invalid task status"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid task priority")
];

const updateTaskValidation = [
  body("title")
    .notEmpty()
    .withMessage("Task title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Task title must be between 3 and 100 characters"),

  body("status")
    .notEmpty()
    .withMessage("Task status is required")
    .isIn(["todo", "in_progress", "done"])
    .withMessage("Invalid task status"),

  body("priority")
    .notEmpty()
    .withMessage("Task priority is required")
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid task priority")
];

module.exports = {
  createTaskValidation,
  updateTaskValidation
};