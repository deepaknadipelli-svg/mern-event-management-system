#  Event Management Application (MERN Stack)

A Full Stack Event Management System built using **React, Node.js, Express, and MongoDB**.

This platform allows users to browse events, register securely, manage registrations, and view upcoming or past events.

---


##  Tech Stack

### Frontend
- React.js
- React Router
- Context API
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs

### Deployment
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

## Features

### Authentication
- User Signup
- User Login
- JWT-based authentication
- Protected routes

### Event Management
- Browse available events
- Search events by name
- Filter events by location
- Filter events by date
- Register for events
- Prevent duplicate registrations
- Capacity validation

### Dashboard
- View registered events
- Categorized into Upcoming and Past
- Cancel event registration
- Secure logout

---

##  Database Design

This project follows a **Many-to-Many relationship**:

User ↔ Registration ↔ Event

- One User can register for multiple Events
- One Event can have multiple Users
- Registration collection links both

### Models

**User**
- name
- email
- password (hashed)

**Event**
- description
- location
- date
- capacity

**Registration**
- user (ObjectId reference)
- event (ObjectId reference)

---

##  Project Structure
bellcorp-event-app/
│
├── server/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
│
├── client/
│ ├── pages/
│ ├── context/
│ └── App.js
│
└── README.md

# Application Flow

User registers or logs in

User browses events

User searches or filters events

User registers for event

Registration stored in database

Dashboard shows upcoming/past events

User can cancel registration

# Key Concepts Implemented

JWT Authentication

Protected Routes

CRUD Operations

Many-to-Many Database Relationship

Dynamic Filtering

REST API Architecture

MVC Backend Structure


# Author

Sai Kiran Deepak Rao