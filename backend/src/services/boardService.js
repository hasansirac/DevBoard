const boardRepository = require("../repositories/boardRepository");

const createBoard = async (boardData, userId) => {
  const { title, description } = boardData;

  if (!title) {
    throw new Error("Board title is required");
  }

  const board = await boardRepository.createBoard({
    userId,
    title,
    description
  });

  return {
    message: "Board created successfully",
    board
  };
};

const getBoards = async (userId) => {
  return await boardRepository.getBoardsByUserId(userId);
};

const getBoardById = async (boardId, userId) => {
  const board = await boardRepository.getBoardById(boardId, userId);

  if (!board) {
    throw new Error("Board not found");
  }

  return board;
};

const updateBoard = async (boardId, boardData, userId) => {
  const { title, description } = boardData;

  if (!title) {
    throw new Error("Board title is required");
  }

  const existingBoard = await boardRepository.getBoardById(boardId, userId);

  if (!existingBoard) {
    throw new Error("Board not found");
  }

  await boardRepository.updateBoard({
    boardId,
    userId,
    title,
    description
  });

  return {
    message: "Board updated successfully",
    board: {
      id: Number(boardId),
      userId,
      title,
      description
    }
  };
};

const deleteBoard = async (boardId, userId) => {
  const existingBoard = await boardRepository.getBoardById(boardId, userId);

  if (!existingBoard) {
    throw new Error("Board not found");
  }

  await boardRepository.deleteBoard(boardId, userId);

  return {
    message: "Board deleted successfully"
  };
};

module.exports = {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard
};