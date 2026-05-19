/**
 * @swagger
 * tags:
 *   name: Boards
 *   description: Board management endpoints
 */
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const boardController = require("../controllers/boardController");

/**
 * @swagger
 * /api/boards:
 *   post:
 *     summary: Create a new board
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Board created successfully
 */
router.post("/", authMiddleware, boardController.createBoard);

/**
 * @swagger
 * /api/boards:
 *   get:
 *     summary: Get all boards of logged in user
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Boards retrieved successfully
 */
router.get("/", authMiddleware, boardController.getBoards);

/**
 * @swagger
 * /api/boards/{id}:
 *   get:
 *     summary: Get board by ID
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Board retrieved successfully
 */
router.get("/:id", authMiddleware, boardController.getBoardById);

/**
 * @swagger
 * /api/boards/{id}:
 *   put:
 *     summary: Update board
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Board updated successfully
 */
router.put("/:id", authMiddleware, boardController.updateBoard);
/**
 * @swagger
 * /api/boards/{id}:
 *   delete:
 *     summary: Delete board
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Board deleted successfully
 */
router.delete("/:id", authMiddleware, boardController.deleteBoard);

module.exports = router;