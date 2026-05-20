# DevBoard

DevBoard is a full-stack task and board management application developed for the System Analysis and Design course.

The system allows users to create boards, manage tasks, track task status and organize their workflow using a modern single-page frontend interface.

---

# Features

- User registration and login
- JWT authentication
- Board management (CRUD)
- Task management (CRUD)
- Task status and priority system
- Board progress calculation
- Responsive modern UI
- RESTful API architecture
- Swagger API documentation
- Unit testing support

---

# Technologies Used

## Backend

- Node.js
- Express.js
- SQLite
- JWT Authentication
- Swagger UI
- Jest

## Frontend

- HTML
- CSS
- Vanilla JavaScript

---

# Project Structure

```text
DevBoard/
│
├── backend/
│   ├── src/
│   ├── package.json
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│
├── README.md
```

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/hasansirac/DevBoard.git
```

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

# Running the Backend

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:3000
```

---

# Swagger API Documentation

Swagger UI:

```text
http://localhost:3000/api-docs
```

The API documentation allows testing endpoints directly from the browser.

---

# Running the Frontend

Open:

```text
frontend/index.html
```

using Live Server in Visual Studio Code.

---

# API Features

## Authentication

- Register user
- Login user
- JWT token authorization

## Boards

- Create board
- Get boards
- Update board
- Delete board
- Calculate board progress

## Tasks

- Create task
- Get tasks by board
- Update task
- Delete task

---

# Validation

The system validates user input on both frontend and backend layers.

Examples:

- Empty fields are rejected
- Minimum title length validation
- Authentication token validation

---

# Testing

Unit tests were implemented using Jest.

Run tests with:

```bash
npm test
```

---

# Screens and Functionality

- Login/Register screen
- Board dashboard
- Task management system
- Dynamic SPA frontend updates
- Interactive Swagger documentation

---

# Author

Hasan Sıraç Özbeyler