# 📌 Job Application Tracker

A full-stack web app to organize and track your job applications in a **Kanban-style board**. Built with React, Node.js, and a SQL/NoSQL backend.

---

## 🚀 Features

* 🔐 User authentication (JWT-based)
* 📊 Track applications by status: **Applied → Interview → Offer → Rejected**
* 🖱️ Drag & drop jobs between columns
* ✏️ Add, edit, and delete job entries
* 🔍 Search and filter by company or role
* 📤 Export jobs to CSV

---

## 🛠️ Tech Stack

**Frontend**: React + TailwindCSS + react-beautiful-dnd

**Backend**: Node.js + Express

**Database**: PostgreSQL or MongoDB (to be seen)

**Auth**: JWT (JSON Web Tokens)

**Deployment**: Vercel (frontend) + Render/Heroku (backend)

---

## 📂 Project Structure

```
job-tracker/
│── backend/          # Express API
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   └── server.js
│
│── frontend/         # React client
│   ├── src/components
│   ├── src/pages
│   └── src/App.jsx
│
└── README.md
```

---

## ⚡ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/job-tracker.git
cd job-tracker
```

### 2. Setup backend

```bash
cd backend
npm install
npm run dev
```

### 3. Setup frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Environment variables

Create `.env` in `backend/` with:

```
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

---

## 📸 Screenshots

---

## 📌 Future Enhancements

* 🔗 LinkedIn API integration
* 📅 Email reminders for interviews
* 📊 Advanced analytics (time-to-offer, success rates)

---

## 👨‍💻 Author

**Nathan Dacosta**
[Portfolio Website](#) • [LinkedIn](https://www.linkedin.com/in/nathan-dacosta-2651a6134/) • [Email](mailto:nathanamdacosta@gmail.com)
