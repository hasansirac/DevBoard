const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRepository = require("../repositories/userRepository");

const register = async (userData) => {
  const { username, password } = userData;

  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  const existingUser = await userRepository.findByUsername(username);

  if (existingUser) {
    throw new Error("Username already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await userRepository.createUser({
    username,
    passwordHash
  });

  return {
    message: "User registered successfully",
    user: newUser
  };
};

const login = async (userData) => {
  const { username, password } = userData;

  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  const user = await userRepository.findByUsername(username);

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid username or password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username
    },
    "devboard_secret_key",
    {
      expiresIn: "1h"
    }
  );

  return {
    message: "Login successful",
    token
  };
};

module.exports = {
  register,
  login
};