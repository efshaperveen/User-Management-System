# User Management System

## Project Overview

The **User Management System** is a full-stack MERN application that provides secure authentication, role-based access control, and user management features.

Users can:

* Sign up and log in securely using JWT authentication
* View and update their profile
* Change their password
* Access protected routes based on roles

Admins can:

* View all users
* Activate or deactivate users
* Access admin-only APIs and dashboard

This project demonstrates real-world authentication, authorization, and secure API handling.

---

##  Purpose of the Application

* Implement JWT-based authentication
* Apply role-based access control (Admin / User)
* Build secure backend APIs
* Create a responsive modern UI
* Demonstrate admin-level user management

---

##  Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* React Router DOM
* Axios
* React Hot Toast
* Lucide React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcrypt.js
* Express Validator

### Tools & Platforms

* VS Code
* Thunder Client
* Git & GitHub
* Render (Backend Deployment)
* Netlify (Frontend Deployment)

---

## ⚙️ Setup Instructions (Local Development)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/user-management-system.git
cd User-Management-System
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

Start the backend server:

```bash
npm run dev
```

Backend will run at:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend (`.env`)

| Variable       | Description               |
| -------------- | ------------------------- |
| PORT           | Server port               |
| MONGO_URI      | MongoDB connection string |
| JWT_SECRET     | JWT secret key            |
| JWT_EXPIRES_IN | Token expiry duration     |

### Frontend (`.env`)

| Variable          | Description          |
| ----------------- | -------------------- |
| VITE_API_BASE_URL | Backend API base URL |

> ⚠️ Actual values are not shared for security reasons.

---

##  Deployment Instructions

### Backend (Render)

1. Push backend code to GitHub
2. Create a new Web Service on Render
3. Connect GitHub repository
4. Add environment variables
5. Set build command:

   ```bash
   npm install
   ```
6. Set start command:

   ```bash
   npm start
   ```
7. Deploy backend

---

### Frontend (Netlify)

1. Push frontend code to GitHub
2. Import project on Netlify
3. Add environment variable:

   ```env
   VITE_API_BASE_URL=<LIVE_BACKEND_URL>
   ```
4. Build and deploy

---

## Authentication & Authorization

* JWT token generated on login
* Token stored in localStorage
* Token sent in Authorization header
* Protected routes secured using middleware
* Role-based access handled on backend

---

##  API Documentation

### Auth Routes

#### Signup

**POST** `/api/auth/signup`

```json
{
  "fullName": "Test User",
  "email": "test@gmail.com",
  "password": "Password@123"
}
```

---

#### Login

**POST** `/api/auth/login`

```json
{
  "email": "test@gmail.com",
  "password": "Password@123"
}
```

---

#### Get Logged-in User

**GET** `/api/auth/me`

Header:

```
Authorization: Bearer <token>
```

---

### User Routes

#### Get Profile

**GET** `/api/users/profile`

---

#### Update Profile

**PUT** `/api/users/profile`

```json
{
  "fullName": "Updated Name",
  "email": "updated@gmail.com"
}
```

---

#### Change Password

**PUT** `/api/users/change-password`

```json
{
  "oldPassword": "OldPassword@123",
  "newPassword": "NewPassword@123"
}
```

---

### Admin Routes (Admin Only)

#### Get All Users

**GET** `/api/users`

---

#### Update User Status

**PUT** `/api/users/:id/status`

```json
{
  "status": "inactive"
}
```

---

## API Testing

* APIs tested using Thunder Client
* Screen recording shows:

  * Authentication flow
  * Protected routes
  * Role-based access
  * Admin actions

---

## 📱 Responsive Design

* Fully responsive UI
* Optimized for desktop and mobile
* Built using Tailwind CSS

---

## 🎥 Screen-Recorded Walkthrough Video

The walkthrough video demonstrates:

* User login & role-based access
* Profile update and password change
* Admin dashboard
* Thunder Client API testing
* Live deployed application

📎 Video Link: (Provided separately)

---

## 👩‍💻 Author

**Efsha Perveen**

















