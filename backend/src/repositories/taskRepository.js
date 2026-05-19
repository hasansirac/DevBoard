const db = require("../config/database");

const createTask = ({
  boardId,
  title,
  description,
  status,
  priority,
  dueDate
}) => {
  return new Promise((resolve, reject) => {
    db.run(
      `
      INSERT INTO tasks
      (boardId, title, description, status, priority, dueDate)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [boardId, title, description, status, priority, dueDate],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            boardId,
            title,
            description,
            status,
            priority,
            dueDate
          });
        }
      }
    );
  });
};

const getTasksByBoardId = (boardId) => {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT *
      FROM tasks
      WHERE boardId = ?
      ORDER BY createdAt DESC
      `,
      [boardId],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

const getTaskById = (taskId) => {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT *
      FROM tasks
      WHERE id = ?
      `,
      [taskId],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
};

const updateTask = ({
  taskId,
  title,
  description,
  status,
  priority,
  dueDate
}) => {
  return new Promise((resolve, reject) => {
    db.run(
      `
      UPDATE tasks
      SET title = ?, description = ?, status = ?, priority = ?, dueDate = ?
      WHERE id = ?
      `,
      [title, description, status, priority, dueDate, taskId],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            changes: this.changes
          });
        }
      }
    );
  });
};

const deleteTask = (taskId) => {
  return new Promise((resolve, reject) => {
    db.run(
      `
      DELETE FROM tasks
      WHERE id = ?
      `,
      [taskId],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            changes: this.changes
          });
        }
      }
    );
  });
};

module.exports = {
  createTask,
  getTasksByBoardId,
  getTaskById,
  updateTask,
  deleteTask
};