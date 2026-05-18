const db = require("../config/database");

const findByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE username = ?",
      [username],
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

const createUser = ({ username, passwordHash }) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (username, passwordHash) VALUES (?, ?)",
      [username, passwordHash],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            username
          });
        }
      }
    );
  });
};

module.exports = {
  findByUsername,
  createUser
};