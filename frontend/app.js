const API_URL = "http://localhost:3000/api";

let token = localStorage.getItem("token") || "";
let selectedBoardId = null;

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const boardTitleInput = document.getElementById("boardTitle");
const boardDescriptionInput = document.getElementById("boardDescription");

const taskTitleInput = document.getElementById("taskTitle");
const taskDescriptionInput = document.getElementById("taskDescription");
const taskStatusInput = document.getElementById("taskStatus");
const taskPriorityInput = document.getElementById("taskPriority");
const taskDueDateInput = document.getElementById("taskDueDate");

const boardsContainer = document.getElementById("boardsContainer");
const tasksContainer = document.getElementById("tasksContainer");
const selectedBoardText = document.getElementById("selectedBoardText");

document.getElementById("registerBtn").addEventListener("click", register);
document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("logoutBtn").addEventListener("click", logout);
document.getElementById("createBoardBtn").addEventListener("click", createBoard);
document.getElementById("createTaskBtn").addEventListener("click", createTask);

async function register() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    alert("Username and password are required");
    return;
  }

  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();
  alert(data.message || data.error || "Register failed");
}

async function login() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    alert("Username and password are required");
    return;
  }

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (data.token) {
    token = data.token;
    localStorage.setItem("token", token);
    alert("Login successful");
    loadBoards();
  } else {
    alert(data.error || "Login failed");
  }
}

function logout() {
  token = "";
  selectedBoardId = null;
  localStorage.removeItem("token");
  boardsContainer.innerHTML = "";
  tasksContainer.innerHTML = "";
  selectedBoardText.textContent = "No board selected.";
  alert("Logged out");
}

async function createBoard() {
  const title = boardTitleInput.value.trim();
  const description = boardDescriptionInput.value.trim();

  if (!token) {
    alert("Please login first");
    return;
  }

  if (title.length < 3) {
    alert("Board title must be at least 3 characters");
    return;
  }

  const response = await fetch(`${API_URL}/boards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, description })
  });

  const data = await response.json();

  if (response.ok) {
    boardTitleInput.value = "";
    boardDescriptionInput.value = "";
    loadBoards();
  }

  alert(data.message || data.error || "Board operation completed");
}

async function loadBoards() {
  if (!token) return;

  const response = await fetch(`${API_URL}/boards`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const boards = await response.json();

  boardsContainer.innerHTML = "";

  boards.forEach((board) => {
    const div = document.createElement("div");
    div.className = "board-card";

    div.innerHTML = `
      <h3>${board.title}</h3>
      <p>${board.description || ""}</p>
      <button onclick="selectBoard(${board.id}, '${board.title}')">Select</button>
      <button onclick="updateBoard(${board.id})">Update</button>
      <button onclick="deleteBoard(${board.id})">Delete</button>
    `;

    boardsContainer.appendChild(div);
  });
}

function selectBoard(boardId, boardTitle) {
  selectedBoardId = boardId;
  selectedBoardText.textContent = `Selected board: ${boardTitle}`;
  loadTasks(boardId);
}

async function updateBoard(boardId) {
  const newTitle = prompt("Enter new board title:");

  if (!newTitle || newTitle.trim().length < 3) {
    alert("Board title must be at least 3 characters");
    return;
  }

  const newDescription = prompt("Enter new board description:");

  const response = await fetch(`${API_URL}/boards/${boardId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      title: newTitle,
      description: newDescription
    })
  });

  const data = await response.json();
  alert(data.message || data.error);
  loadBoards();
}

async function deleteBoard(boardId) {
  if (!confirm("Are you sure you want to delete this board?")) return;

  const response = await fetch(`${API_URL}/boards/${boardId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();
  alert(data.message || data.error);

  if (selectedBoardId === boardId) {
    selectedBoardId = null;
    tasksContainer.innerHTML = "";
    selectedBoardText.textContent = "No board selected.";
  }

  loadBoards();
}

async function createTask() {
  if (!selectedBoardId) {
    alert("Please select a board first");
    return;
  }

  const title = taskTitleInput.value.trim();
  const description = taskDescriptionInput.value.trim();
  const status = taskStatusInput.value;
  const priority = taskPriorityInput.value;
  const dueDate = taskDueDateInput.value;

  if (title.length < 3) {
    alert("Task title must be at least 3 characters");
    return;
  }

  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      boardId: selectedBoardId,
      title,
      description,
      status,
      priority,
      dueDate
    })
  });

  const data = await response.json();

  if (response.ok) {
    taskTitleInput.value = "";
    taskDescriptionInput.value = "";
    taskDueDateInput.value = "";
    loadTasks(selectedBoardId);
  }

  alert(data.message || data.error || "Task operation completed");
}

async function loadTasks(boardId) {
  const response = await fetch(`${API_URL}/tasks/board/${boardId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const tasks = await response.json();

  tasksContainer.innerHTML = "";

  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task-card";

    div.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description || ""}</p>
      <p>Status: ${task.status}</p>
      <p>Priority: ${task.priority}</p>
      <p>Due Date: ${task.dueDate || "No due date"}</p>
      <button onclick="updateTask(${task.id})">Update</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;

    tasksContainer.appendChild(div);
  });
}

async function updateTask(taskId) {
  const title = prompt("Enter new task title:");

  if (!title || title.trim().length < 3) {
    alert("Task title must be at least 3 characters");
    return;
  }

  const description = prompt("Enter new task description:");
  const status = prompt("Enter status: todo, in_progress, done");
  const priority = prompt("Enter priority: low, medium, high");
  const dueDate = prompt("Enter due date: YYYY-MM-DD");

  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      title,
      description,
      status,
      priority,
      dueDate
    })
  });

  const data = await response.json();
  alert(data.message || data.error);

  if (selectedBoardId) {
    loadTasks(selectedBoardId);
  }
}

async function deleteTask(taskId) {
  if (!confirm("Are you sure you want to delete this task?")) return;

  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();
  alert(data.message || data.error);

  if (selectedBoardId) {
    loadTasks(selectedBoardId);
  }
}

if (token) {
  loadBoards();
}