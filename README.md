
# 🎬 IMDB Clone – Backend API

This repository contains the **backend API** for an **IMDB Clone application**, built using **Node.js**, **Express**, and **MongoDB**.
It provides secure authentication, user management, and movie-related operations through RESTful APIs.

---

## 📌 Project Overview

The backend is responsible for:

* User authentication & authorization
* Secure password handling
* JWT-based session management
* Database operations using MongoDB
* Providing APIs for frontend consumption

This project follows **modern backend best practices** and is designed to be **scalable, secure, and maintainable**.

---

## 🧰 Technologies Used

### 🟢 Runtime & Server

* **Node.js** – JavaScript runtime for building fast and scalable server-side applications
* **Express** – Minimal and flexible web framework for REST API development

### 🟢 Database

* **MongoDB** – NoSQL database for storing users, movies, and favorites
* **Mongoose** – ODM library for schema-based MongoDB modeling

### 🟢 Authentication & Security

* **JSON Web Token** – Token-based authentication for secure API access
* **bcryptjs** – Secure password hashing and comparison

### 🟢 Middleware & Utilities

* **cors** – Enables Cross-Origin Resource Sharing
* **dotenv** – Manages environment variables securely

### 🟢 Development Tools

* **nodemon** – Automatically restarts server on code changes
* **ESLint** – Ensures code quality and consistency

---

## 📦 Dependencies Summary

```json
bcryptjs        → Password encryption
cors            → Cross-origin request handling
dotenv          → Environment variable support
eslint          → Code linting and best practices
express         → Backend framework
jsonwebtoken    → Authentication with JWT
mongoose        → MongoDB object modeling
nodemon         → Development auto-restart
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Erangamadhushan/IMDB-Clone-Backend.git
cd IMDB-Clone-Backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the Server

**Development mode**

```bash
npm run dev
```

**Production mode**

```bash
npm start
```

---

## 📁 Project Structure (Typical)

```
IMDB-Clone-Backend/
│
├── models/        # Mongoose schemas
├── routes/        # API routes
├── controllers/   # Business logic
├── middleware/    # Auth & error handlers
├── config/        # Database config
├── index.js       # App entry point
├── .env           # Environment variables
└── package.json
```

---

## 🔐 Security Features

* Password hashing using **bcrypt**
* JWT-based authentication
* Protected routes with middleware
* Environment variable protection
* CORS-enabled API access

---

## 📡 API Usage

This backend is designed to be consumed by:

* React / Next.js frontend
* Mobile applications
* Any REST-capable client

---

## 🛠️ Future Improvements

* Role-based authorization
* Unit and integration tests
* Docker support

---

## 👤 Author

**Eranga Madhushan**
GitHub: [https://github.com/Erangamadhushan](https://github.com/Erangamadhushan)

---

## 📄 License

This project is licensed under the **ISC License**.

---

