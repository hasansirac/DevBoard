const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const boardController = require("../controllers/boardController");

router.post("/", authMiddleware, boardController.createBoard);

router.get("/", authMiddleware, boardController.getBoards);

router.get("/:id", authMiddleware, boardController.getBoardById);

router.put("/:id", authMiddleware, boardController.updateBoard);

router.delete("/:id", authMiddleware, boardController.deleteBoard);

module.exports = router;