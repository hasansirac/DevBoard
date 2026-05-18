require("./config/database");

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const boardRoutes = require("./routes/boardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "DevBoard API is running"
  });
});

module.exports = app;