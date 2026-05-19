const taskService = require("../services/taskService");

const createTask = async (req, res) => {
  try {
    const result = await taskService.createTask(req.body, req.user.id);

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

const getTasksByBoardId = async (req, res) => {
  try {
    const tasks = await taskService.getTasksByBoardId(
      req.params.boardId,
      req.user.id
    );

    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const result = await taskService.updateTask(
      req.params.id,
      req.body,
      req.user.id
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const result = await taskService.deleteTask(
      req.params.id,
      req.user.id
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      error: error.message
    });
  }
};

module.exports = {
  createTask,
  getTasksByBoardId,
  updateTask,
  deleteTask
};