# 🧠 Nested Comment Frontend

This is the **frontend** for the Nested Comment Web App — a modern, responsive, and secure platform built using **React** and **Tailwind CSS**.  
It provides smooth authentication, protected routes, and a simple admin dashboard to manage user comments efficiently.

---
- ⚛️ **Backend Repository** `https://github.com/dhruvgupta-14/NestedCommet-be`

## 🚀 Tech Stack

Built with the latest tools in the React ecosystem:

- ⚛️ **React** `^19.1.1`
- 🎨 **Tailwind CSS** `^4.1.14`
- 🧭 **React Router DOM** `^7.9.4`
- 🌐 **Axios** `^1.12.2`
- 🔥 **React Hot Toast** `^2.6.0`
- ✍️ **React Simple Typewriter** `^5.0.1`
- ⏳ **React Spinners** `^0.17.0`
- 🧩 **Lucide React** `^0.546.0`
- 🛠️ **@tailwindcss/vite** `^4.1.14`

---

## 🔐 Authentication Logic

- The app uses **`AuthContext.jsx`** for global authentication management.
- On initial load, it calls the backend `/me` endpoint (using Axios) to verify if the user is logged in.
- If **not authenticated**, users are **redirected to the login page**.
- Users can **sign up** for a new account or **log in** with existing credentials.
- Protected routes automatically block access if you’re not logged in.

---

## 🧑‍💼 Admin Access

Admin users can log in using the following credentials:

Email: admin@example.com
Password: StrongPassword123



### 🗑️ Admin Features
- Delete user comments directly from the dashboard.
- Manage discussions and maintain platform quality.

---
