const db = require("../config/database");

const createBoard = ({ userId, title, description }) => {
  return new Promise((resolve, reject) => {
    db.run(
      `
      INSERT INTO boards
      (userId, title, description)
      VALUES (?, ?, ?)
      `,
      [userId, title, description],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            userId,
            title,
            description
          });
        }
      }
    );
  });
};

const getBoardsByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT *
      FROM boards
      WHERE userId = ?
      ORDER BY createdAt DESC
      `,
      [userId],
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

const getBoardById = (boardId, userId) => {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT *
      FROM boards
      WHERE id = ? AND userId = ?
      `,
      [boardId, userId],
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

const updateBoard = ({ boardId, userId, title, description }) => {
  return new Promise((resolve, reject) => {
    db.run(
      `
      UPDATE boards
      SET title = ?, description = ?
      WHERE id = ? AND userId = ?
      `,
      [title, description, boardId, userId],
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

const deleteBoard = (boardId, userId) => {
  return new Promise((resolve, reject) => {
    db.run(
      `
      DELETE FROM boards
      WHERE id = ? AND userId = ?
      `,
      [boardId, userId],
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
  createBoard,
  getBoardsByUserId,
  getBoardById,
  updateBoard,
  deleteBoard
};