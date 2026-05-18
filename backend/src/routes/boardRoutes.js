const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

router.get(
  "/",
  authMiddleware,
  (req, res) => {
    res.json({
      message: "Boards route protected",
      user: req.user
    });
  }
);

module.exports = router;