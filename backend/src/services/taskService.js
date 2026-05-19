const taskRepository = require("../repositories/taskRepository");
const boardRepository = require("../repositories/boardRepository");

const validStatuses = ["todo", "in_progress", "done"];
const validPriorities = ["low", "medium", "high"];

const createTask = async (taskData, userId) => {
  const {
    boardId,
    title,
    description,
    status = "todo",
    priority = "medium",
    dueDate
  } = taskData;

  if (!boardId) {
    throw new Error("Board ID is required");
  }

  if (!title) {
    throw new Error("Task title is required");
  }

  if (!validStatuses.includes(status)) {
    throw new Error("Invalid task status");
  }

  if (!validPriorities.includes(priority)) {
    throw new Error("Invalid task priority");
  }

  const board = await boardRepository.getBoardById(boardId, userId);

  if (!board) {
    throw new Error("Board not found or access denied");
  }

  const task = await taskRepository.createTask({
    boardId,
    title,
    description,
    status,
    priority,
    dueDate
  });

  return {
    message: "Task created successfully",
    task
  };
};

const getTasksByBoardId = async (boardId, userId) => {
  const board = await boardRepository.getBoardById(boardId, userId);

  if (!board) {
    throw new Error("Board not found or access denied");
  }

  return await taskRepository.getTasksByBoardId(boardId);
};

const updateTask = async (taskId, taskData, userId) => {
  const {
    title,
    description,
    status,
    priority,
    dueDate
  } = taskData;

  if (!title) {
    throw new Error("Task title is required");
  }

  if (!validStatuses.includes(status)) {
    throw new Error("Invalid task status");
  }

  if (!validPriorities.includes(priority)) {
    throw new Error("Invalid task priority");
  }

  const existingTask = await taskRepository.getTaskById(taskId);

  if (!existingTask) {
    throw new Error("Task not found");
  }

  const board = await boardRepository.getBoardById(
    existingTask.boardId,
    userId
  );

  if (!board) {
    throw new Error("Access denied");
  }

  await taskRepository.updateTask({
    taskId,
    title,
    description,
    status,
    priority,
    dueDate
  });

  return {
    message: "Task updated successfully",
    task: {
      id: Number(taskId),
      boardId: existingTask.boardId,
      title,
      description,
      status,
      priority,
      dueDate
    }
  };
};

const deleteTask = async (taskId, userId) => {
  const existingTask = await taskRepository.getTaskById(taskId);

  if (!existingTask) {
    throw new Error("Task not found");
  }

  const board = await boardRepository.getBoardById(
    existingTask.boardId,
    userId
  );

  if (!board) {
    throw new Error("Access denied");
  }

  await taskRepository.deleteTask(taskId);

  return {
    message: "Task deleted successfully"
  };
};

module.exports = {
  createTask,
  getTasksByBoardId,
  updateTask,
  deleteTask
};