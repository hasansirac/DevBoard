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

const getBoardById = async (req, res) => {
  try {
    const board = await boardService.getBoardById(
      req.params.id,
      req.user.id
    );

    res.status(200).json(board);
  } catch (error) {
    res.status(404).json({
      error: error.message
    });
  }
};

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
  deleteBoard
};