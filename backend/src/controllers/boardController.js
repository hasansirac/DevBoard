const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const boardService = require("../services/boardService");

const createBoard = async (req, res) => {
  try {
    const result = await boardService.createBoard(req.body, req.user.id);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

const getBoards = async (req, res) => {
  try {
    const boards = await boardService.getBoards(req.user.id);
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const getBoardById = asyncHandler(async (req, res) => {
  const boardId = req.params.id;

  const board = await boardService.getBoardById(
    boardId,
    req.user.id
  );

  res.status(200).json(board);
});

const getBoardProgress = asyncHandler(async (req, res) => {
  const boardId = req.params.id;
  const userId = req.user.id;

  const progressData = await boardService.getBoardProgress(
    boardId,
    userId
  );

  res.status(200).json(progressData);
});

const updateBoard = async (req, res) => {
  try {
    const result = await boardService.updateBoard(
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

const deleteBoard = async (req, res) => {
  try {
    const result = await boardService.deleteBoard(
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
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
  getBoardProgress
};