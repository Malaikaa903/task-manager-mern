# Task Manager App 📋

A full-stack **Task Manager** web application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).

![Task Manager](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)

---

## 🚀 Live Demo

- **Frontend:** _Coming soon (Vercel)_
- **Backend API:** _Coming soon (Render)_

---

## ✨ Features

- 🔐 User Authentication (Register/Login with JWT)
- ✅ Create, Read, Update, Delete Tasks
- 🎯 Task Priority Levels (Low / Medium / High / Urgent)
- 📊 Dashboard with live stats (Total / In Progress / Completed / Overdue)
- 🔍 Filter tasks by status and priority
- 📅 Due date tracking with overdue detection
- 🗑️ Delete confirmation modal
- 📱 Clean responsive UI with sidebar navigation

---

## 🛠️ Tech Stack

### Frontend

- React.js (Vite)
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

---

## 📁 Project Structure

```
task-manager/
├── backend/
│   ├── config/         # Database connection
│   ├── controllers/    # Route logic
│   ├── middleware/     # Auth middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   └── server.js       # Entry point
│
└── frontend/
    ├── src/
    │   ├── api/        # Axios config
    │   ├── components/ # Reusable components
    │   ├── context/    # Auth context
    │   ├── pages/      # App pages
    │   └── main.jsx    # Entry point
    └── package.json
```

---

## ⚙️ Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/Malaikaa903/task-manager-mern.git
cd task-manager-mern
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create `.env` file in backend folder:

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key
```

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

### 4. Open in browser

http://localhost:5173

---

## 🔗 API Endpoints

### Auth

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/auth/register | Register new user |
| POST   | /api/auth/login    | Login user        |

### Tasks

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | /api/tasks       | Get all tasks       |
| POST   | /api/tasks       | Create task         |
| PUT    | /api/tasks/:id   | Update task         |
| DELETE | /api/tasks/:id   | Delete task         |
| GET    | /api/tasks/stats | Get dashboard stats |

---

## 👩‍💻 Author

**Malaika Tabassum**

- GitHub: [@Malaikaa903](https://github.com/Malaikaa903)
- LinkedIn: [Malaika Tabassum](https://linkedin.com/in/malaika-tabassum-a29420371)
- Email: malaikatabassum83@gmail.com

---

⭐ If you found this project helpful, please give it a star!
