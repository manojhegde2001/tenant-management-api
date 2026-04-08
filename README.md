# Tenant Management Backend

A clean-architecture MERN backend for managing users, roles, and sites.

## Tech Stack
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication

## Folder Structure
- `src/config`: Database connection
- `src/models`: Mongoose schemas
- `src/services`: Business logic (Service Layer)
- `src/controllers`: Request/Response handling
- `src/routes`: API endpoints
- `src/middleware`: Auth and Error handling
- `src/utils`: Helpers (JWT, constants)

## Setup Instructions

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Create a `.env` file in the root:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    ```

3.  **Run the Server**:
    - Development: `npm run dev` (requires nodemon)
    - Production: `npm start`

## API Endpoints

### Auth
- `POST /api/users/login`: Login user and get token

### Users
- `GET /api/users`: List users (Search & Pagination)
- `POST /api/users`: Create user
- `PUT /api/users/:id`: Update user
- `DELETE /api/users/:id`: Deactivate user

### Roles
- `GET /api/roles`: List roles
- `POST /api/roles`: Create role
- `PUT /api/roles/:id`: Update role
- `DELETE /api/roles/:id`: Delete role (fails if assigned to users)

### Sites
- `GET /api/sites`: List sites
- `POST /api/sites`: Create site
- `PUT /api/sites/:id`: Update site
- `DELETE /api/sites/:id`: Delete site

### Dashboard
- `GET /api/dashboard`: Get statistics
