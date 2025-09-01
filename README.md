# 📌 Job Application Tracker

A full-stack web app to organize and track your job applications in a **Kanban-style board**. Built with React, Node.js, and a MongoDB backend.

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

**Database**: MongoDB

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

<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/8c4edaf2-f509-4a6e-ac61-79974098a550" />

<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/f2fad849-1026-44c7-89c8-7ad2ef2d57f5" />

<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/ac70904d-e5a6-41f5-8554-9a524f947587" />

<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/c70eebf6-dd3b-47c0-9533-005833badf67" />

<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/1aa47631-1d9e-47f8-b566-95669727056c" />

<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/c7236699-5c05-46ac-bf81-fb5c8bb0f9bc" />



---

## 📌 Future Enhancements

* 🔗 LinkedIn API integration
* 📅 Email reminders for interviews
* 📊 Advanced analytics (time-to-offer, success rates)

---

## 👨‍💻 Author

**Nathan Dacosta**
[Portfolio Website](#) • [LinkedIn](https://www.linkedin.com/in/nathan-dacosta-2651a6134/) • [Email](mailto:nathanamdacosta@gmail.com)
