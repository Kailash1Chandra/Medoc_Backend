# Medoc Backend - OPD Token Management System

A comprehensive healthcare appointment and token management system for managing patient queues in a hospital's Out-Patient Department (OPD). This backend service handles doctor scheduling, patient token allocation, and queue prioritization.

## 📋 Overview

Medoc is a token-based queue management system designed to streamline patient flow in medical facilities. It enables:
- **Token Generation**: Automated token number assignment for patients
- **Doctor Management**: Registration and management of doctors and their availability
- **Slot Management**: Creation and management of appointment slots
- **Priority Queuing**: Intelligent prioritization based on patient category
- **Smart Allocation**: Automatic allocation of patients to available slots

## ✨ Features

- 👥 **Multi-Doctor Support**: Manage multiple doctors with their availability slots
- 🎫 **Token Management**: Automatic token number generation and tracking
- 📅 **Slot Management**: Create and manage appointment slots for doctors
- ⚕️ **Priority Handling**: Support for multiple patient categories:
  - Emergency (Priority 1)
  - Priority (Priority 2)
  - Follow-up (Priority 3)
  - Online (Priority 4)
  - Walk-in (Priority 5)
- 🔀 **Smart Allocation**: Automatic allocation of patients to available slots based on priority
- 🌐 **CORS Enabled**: Support for cross-origin requests from frontend applications
- 📊 **Simulation Tools**: Test and verify allocation logic

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Database**: MongoDB
- **ORM**: Mongoose (v9.1.5)
- **CORS**: cors (v2.8.6)
- **Environment**: dotenv (v17.2.3)
- **Development**: Nodemon (v3.1.11)

## 📁 Project Structure

```
Medoc Backend/
├── frontend/                    # Web UI for patients
│   ├── index.html              # Landing page
│   ├── patient.html            # Patient booking interface
│   ├── script.js               # Frontend logic
│   └── style.css               # Styling
│
├── src/
│   ├── app.js                  # Express app configuration
│   ├── server.js               # Server entry point & DB connection
│   │
│   ├── models/                 # MongoDB schemas
│   │   ├── Doctor.js           # Doctor model (name, specialization, hours)
│   │   ├── Slot.js             # Appointment slot model
│   │   └── Token.js            # Patient token model
│   │
│   ├── routes/                 # API endpoints
│   │   ├── doctor.routes.js    # Doctor management endpoints
│   │   ├── token.routes.js     # Token generation endpoints
│   │   └── simulation.routes.js# Simulation/testing endpoints
│   │
│   ├── services/               # Business logic
│   │   └── allocation.service.js # Patient-to-slot allocation logic
│   │
│   └── utils/                  # Helper utilities
│       └── priorityMap.js      # Priority level mappings
│
├── .env                        # Environment variables
├── package.json                # Dependencies and scripts
├── package-lock.json           # Dependency lock file
└── README.md                   # This file
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (cloud or local instance)
- npm or yarn

### Steps

1. **Navigate to project directory**
   ```bash
   cd "Medoc Backend"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory with:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string_here
   ```
   
   **Note**: Never commit `.env` file to version control. Keep it private and secure.

4. **Start the server**
   ```bash
   # Development mode (with hot-reload)
   npm run dev

   # Production mode
   npm start
   ```

The server will run on port `3000`

## 📊 Database Models

### Doctor Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  specialization: String (required),
  availableFrom: String,
  availableTo: String
}
```

### Slot Model
```javascript
{
  _id: ObjectId,
  doctorId: ObjectId (ref: Doctor),
  startTime: String,
  endTime: String,
  capacity: Number,
  currentTokens: Number (default: 0)
}
```

### Token Model
```javascript
{
  _id: ObjectId,
  patientName: String (required),
  doctorId: ObjectId (ref: Doctor, required),
  tokenNumber: Number (required),
  slotId: ObjectId (ref: Slot),
  source: String (enum: ONLINE, WALKIN, PRIORITY, FOLLOWUP, EMERGENCY),
  priority: Number,
  status: String (enum: BOOKED, CANCELLED, NO_SHOW, COMPLETED),
  timestamps: { createdAt, updatedAt }
}
```

## 🎯 Priority System

Patients are assigned priorities based on their source type:

| Source | Priority Level | Description |
|--------|:---------------:|---|
| EMERGENCY | 1 | Life-threatening situations |
| PRIORITY | 2 | Patients with special needs |
| FOLLOWUP | 3 | Follow-up appointments |
| ONLINE | 4 | Regular online bookings |
| WALKIN | 5 | Walk-in patients |

Lower numbers = Higher priority in queue

## 💻 Development

### Run in Development Mode
```bash
npm run dev
```
Uses Nodemon for auto-restart on file changes

### MongoDB Connection
- Server automatically connects to MongoDB using `MONGO_URI`
- Connection status logged in console
- Ensure MongoDB instance is running before starting server

### Testing Endpoints
Use tools like Postman or curl to test API endpoints. Refer to the **API Endpoints** section above for request/response formats.

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Verify `MONGO_URI` in `.env` is correct and MongoDB is running |
| Port 3000 already in use | Change `PORT` in `.env` or kill process: `lsof -i :3000` |
| CORS errors from frontend | CORS is enabled in `app.js`. Verify frontend URL |
| Token creation fails | Ensure `doctorId` exists and `patientName` is provided |

## 🔄 Allocation Service

The `allocation.service.js` handles:
1. **Normal Allocation**: Assigns patient to available slots
2. **Priority Reallocation**: Emergency/Priority patients can override capacity
3. **Waitlist Management**: Tracks patients when all slots are full

## 📝 Scripts

```json
{
  "start": "node src/server.js",
  "dev": "nodemon src/server.js"
}
```

## 🌐 Frontend Integration

The `frontend/` directory contains:
- **index.html** - Home page
- **patient.html** - Token booking interface
- **script.js** - API communication
- **style.css** - UI styling

Frontend is served on the same server as the backend

## 🚀 Future Enhancements

- [ ] Real-time queue updates (WebSockets)
- [ ] SMS/Email notifications
- [ ] Admin dashboard
- [ ] Analytics & reporting
- [ ] Mobile app
- [ ] Payment integration
- [ ] Doctor calendar
- [ ] Patient feedback

## 📄 License

ISC

## 👤 Author

Kailash

---

**Status**: ✅ Ready to run  
**Last Updated**: January 2026  
**Questions?** Check console logs for detailed error messages
