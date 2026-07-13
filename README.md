<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</div>

<br/>

<div align="center">
  <h1>⚡ The Third Strike</h1>
  <p><strong>"Three complaints. Two warnings. One final strike."</strong></p>
  <p>Student Safety & Accountability Platform</p>
  
  <a href="https://the-third-strike-client.vercel.app">
    <img src="https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/Hackathon-2026-7030EF?style=for-the-badge" alt="Hackathon" />
  </a>
</div>

---

## 📖 About The Project

**The Third Strike** is a revolutionary student safety platform built for the **BAIUST Computer Club Hackathon 2026**. It empowers students to anonymously report misconduct, send real-time SOS alerts, track corrupt activities, and ensure captain accountability through a democratic strike system.

> "When Kodu Kuddus became captain, he turned the class into a dictatorship. Now, the students fight back with technology."

### 🎯 The Mission
- **Anonymous Reporting** – Report without fear
- **Real-time SOS** – Emergency alerts instantly
- **Three Strikes System** – Democratic impeachment process
- **AI-Powered Tools** – Syllabus summarizer & fact checker

---

## 🌐 Live Demo

| Environment | URL | Status |
|-------------|-----|--------|
| **Production** | [https://the-third-strike-client.vercel.app](https://the-third-strike-client.vercel.app) | ✅ Live |
| **Backend API** | [https://the-third-strike-server-1.onrender.com](https://the-third-strike-server-1.onrender.com) | ✅ Live |

---

##  Features

###  Authentication System
- **Student Login**: Roll Number + Secret Code (100% anonymous)
- **Teacher Login**: Email + Password
- **Captain Login**: Email + Password
- **Role-based Dashboard** for each user type
- **Dark/Light Theme** toggle

###  Student Dashboard
-  **Strike Progress Bar** – Track impeachment progress
-  **Seat Grid** – Anti-camouflage seating view
-  **Recent Activities** – Latest actions and updates
-  **Quick Actions** – Report, SOS, Syllabus AI, Fact Checker

###  Teacher Dashboard
-  **Complaint Review** – Approve or reject anonymous complaints
-  **Issue Strikes** – Issue warnings and final strikes
-  **Audit Log** – Complete history of actions

###  Captain Dashboard
-  **SOS Alerts** – Real-time emergency notifications
-  **Strike Management** – View and manage strikes

###  Core Features (6 Missions)

| Mission | Feature | Description |
|---------|---------|-------------|
| **1** | Anonymous Whistleblower | Submit complaints without revealing identity |
| **2** | Anti-Camouflage Seat Planner | Algorithmic seating to catch Kuddus |
| **3** | Syllabus AI Summarizer | AI-powered syllabus simplification |
| **4** | Corrupt Economy Ledger | Track 2-taka toll and tiffin theft |
| **5** | SOS Rescue Flare | One-click emergency alerts |
| **6** | Kuddus Fact Checker | Debunk fake rules instantly |

---

##  Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **Vite** | Build Tool & Dev Server |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Smooth animations |
| **Lucide React** | Icon library |
| **React Router DOM** | Client-side routing |
| **Socket.io Client** | Real-time communication |

### UI/UX Design
- **Glassmorphism** effects
- **Gradient** color schemes
- **Responsive** layout (Mobile/Tablet/Desktop)
- **Micro-interactions** & hover effects
- **Accessibility** friendly


---

##  Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Backend server running

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SultanaBristy226/the-third-strike-client.git
cd the-third-strike-client

# 2. Install dependencies
npm install

# 3. Create environment variables
echo "VITE_API_URL=http://localhost:5000/api" > .env
echo "VITE_SOCKET_URL=http://localhost:5000" >> .env

# 4. Start development server
npm run dev

# 5. Open http://localhost:5173

| Route                 | Page                  | Access        |
| --------------------- | --------------------- | ------------- |
| `/`                   | Landing Page          | 🌐 Public     |
| `/login`              | Login                 | 🌐 Public     |
| `/register`           | Register              | 🌐 Public     |
| `/student/dashboard`  | Student Dashboard     | 🎓 Student    |
| `/student/complaint`  | Complaint Form        | 🎓 Student    |
| `/student/sos`        | SOS Emergency         | 🎓 Student    |
| `/student/syllabus`   | AI Syllabus Assistant | 🎓 Student    |
| `/teacher/dashboard`  | Teacher Dashboard     | 👨‍🏫 Teacher |
| `/teacher/complaints` | Complaint Review      | 👨‍🏫 Teacher |
| `/teacher/strikes`    | Issue Strikes         | 👨‍🏫 Teacher |
| `/teacher/audit`      | Audit Log             | 👨‍🏫 Teacher |
| `/captain/dashboard`  | Captain Dashboard     | 👮 Captain    |
| `/captain/sos`        | SOS Alerts            | 👮 Captain    |
| `/captain/strikes`    | Strike Management     | 👮 Captain    |
| `/seat-planner`       | Seat Planner          | 👥 All Users  |
| `/ledger`             | Digital Ledger        | 👥 All Users  |
| `/fact-checker`       | AI Fact Checker       | 👥 All Users  |

 Contributing
This project is created for the BAIUST Computer Club Hackathon 2026.


 Team Members
    Habiba Sultana Bristy
    Nosratee Jahan Naba
    Amina Islam Meem
    Iffat Ara Nowshin

