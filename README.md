# Tenant Management Backend

A high-performance, secure, and scalable API built with **Node.js**, **Express**, and **MongoDB**. This backend serves as the core engine for the Ada Lovelace Technologies Tenant Management System.

---

## 🏗️ Architecture: Service-Layer Pattern

This project employs a strict **Service-Layer Architecture** to keep business logic separate from transport logic (HTTP).

- **`src/server.js`**: Entry point for initializing the server and DB.
- **`src/app.js`**: Express application configuration and middleware setup.
- **`src/routes/`**: Defines the API endpoints and maps them to controllers.
- **`src/controllers/`**: Handles the request/response lifecycle.
- **`src/services/`**: **Core Business Logic**. Services handle DB operations and data processing.
- **`src/models/`**: Mongoose schemas and data validation logic.
- **`src/middleware/`**: JWT validation, error handling, and activity logging.

---

## 🔒 Security Features

- **JWT Authentication**: Stateless authentication using JSON Web Tokens.
- **Password Hashing**: Industry-standard hashing using `bcryptjs`.
- **CORS Configuration**: Restricted cross-origin resource sharing for security.
- **RBAC (Role-Based Access Control)**: Granular permission management for developers, admins, and users.

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file with the following keys:
```env
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

### 3. Running the Server
- **Development**: `npm run dev` (watches for changes)
- **Production**: `npm start`
- **Seed Data**: `npm run seed` (populates initial roles and users)

---

## 🛣️ API Documentation

### Auth & Users
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/users/login` | Authenticate user and return JWT |
| `GET` | `/api/users` | Fetch all users (with pagination/search) |
| `POST` | `/api/users` | Create a new user account |
| `PUT` | `/api/users/:id` | Update user details or status |

### Roles & Permissions
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/roles` | List all available system roles |
| `POST` | `/api/roles` | Define a new role with permissions |

### Sites & Infrastructure
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/sites` | List all managed sites |
| `POST` | `/api/sites` | Register a new site |

### Dashboard Analytics
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/dashboard` | Get real-time system statistics |

---

## 🛠️ Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Logging**: Morgan
- **Error Handling**: `express-async-handler`

---

*Powered by Ada Lovelace Technologies.*
