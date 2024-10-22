# ParkIT

A web application developed for the SC2006 Software Engineering module in NTU that helps users find and manage parking spaces in Singapore, with real-time availability tracking, expense management, and navigation features.

## Project Structure

```
parkit/
├── README.md
├── frontend/
│   ├── README.md
│   └── ...
└── backend/
    ├── README.md
    └── ...
```

## Overview

ParkIT is a comprehensive parking management solution built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled with Tailwind CSS. It integrates with Singapore's HDB parking API to provide real-time parking availability data and helps users manage their parking expenses.

## Key Features

- Real-time parking availability tracking
- User authentication and profile management
- Interactive map interface with car park locations
- Parking expense tracking and analytics
- Favorite car parks management
- Check-in/check-out system
- Feedback submission system

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn
- Git

## Quick Start

1. Clone the repository

```bash
git clone https://github.com/yourusername/parkit.git
cd parkit
```

2. Install dependencies for both frontend and backend

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Start the development servers

```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend server (from frontend directory)
npm start
```

4. Visit `http://localhost:3000` in your browser

---
