# AI Resume Builder 🚀

An AI-powered Resume Builder built with the MERN stack that helps users create professional ATS-friendly resumes, enhance content using Google Gemini AI, manage multiple resumes, and export polished resume templates.

## 🌟 Features

### Authentication

* User Registration & Login
* JWT-based Authentication
* Protected Routes
* Persistent Login using Redux

### Resume Management

* Create Multiple Resumes
* Edit Existing Resumes
* Delete Resumes
* Resume Preview
* Public Resume Sharing

### AI-Powered Enhancement

* AI-enhanced Professional Summary
* AI-enhanced Project Descriptions
* AI-enhanced Work Experience
* Powered by Google Gemini AI

### Resume Templates

* NIT Trichy Template
* Modern Template
* Classic Template
* Minimal Template
* Minimal Image Template

### Media & Storage

* Profile Image Upload
* Image Background Removal
* ImageKit Integration
* MongoDB Atlas Database

### Additional Features

* Resume Data Auto-Save
* Responsive Design
* Dark/Light Theme Support
* Redux State Management
* REST API Architecture

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Redux Toolkit
* React Router DOM
* Axios
* Tailwind CSS
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer

### AI & Third-Party Services

* Google Gemini AI
* ImageKit

---

## 📂 Project Structure

```bash
ai-resume-builder/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── config/
│   ├── middlewares/
│   └── server.js
│
└── README.md
```

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/RashmranjanSahoo/ai-resume-builder.git

cd ai-resume-builder
```

### Backend Setup

```bash
cd server

npm install

npm start
```

### Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

## 🔑 Environment Variables

### Backend (.env)

```env
JWT_SECRET=your_secret

MONGODB_URI=your_mongodb_connection_string

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key

GEMINI_API_KEY=your_gemini_api_key
```

### Frontend (.env)

```env
VITE_BASE_URL=http://localhost:5000
```

---

## 📸 Screenshots

* Home Page
* Dashboard
* Resume Builder
* Resume Preview
* AI Enhancement Features

(Add screenshots here after deployment)

---

## 🚀 Deployment

### Frontend

* Vercel

### Backend

* Render

### Database

* MongoDB Atlas

---

## 📈 Future Improvements

* Resume PDF Export
* Resume Import from PDF
* More ATS Templates
* Cover Letter Generator
* AI Interview Preparation
* Resume Analytics

---

## 👨‍💻 Author

**Rashmi Ranjan Sahoo**

* Mathematics Gold Medalist
* Full Stack Developer
* MERN Stack Enthusiast

GitHub: https://github.com/RashmranjanSahoo

---

## 📜 License

This project is licensed under the MIT License.
