# Dotix – Job Scheduler & Automation System

## 📌 Overview
This project is a mini **Job Scheduler & Automation Dashboard** built as part of the Dotix Full Stack Developer Skill Test.  
It allows users to create background jobs, execute them manually, track their status, and trigger webhooks when jobs complete.

The system demonstrates end-to-end full-stack development: **Frontend → Backend → Database → Webhook Integration**.

---

## 🧱 Tech Stack

### Frontend
- Next.js
- React
- JavaScript

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- MySQL

### Integrations
- Webhook (local receiver + webhook.site for testing)

### Tools
- VS Code
- Git & GitHub
- Postman (optional)

---

## ✨ Features
- Create background jobs with task name, priority, and payload
- Persist jobs in database
- Job status lifecycle:
   pending → running → completed
- Manual job execution
- Simulated background processing
- Automatic webhook trigger on job completion
- REST API architecture
- Modular project structure

---

## 🏗️ Architecture

Frontend (Next.js)
↓
Backend (Express APIs)
↓
Database (MySQL)
↓
Webhook Trigger (POST request)


---

## 🔌 API Endpoints

### Create Job
POST /jobs
Creates a new job with default status `pending`.

### List Jobs
GET /jobs
Returns all jobs.

### Job Details
GET /jobs/:id

Returns details of a single job.

### Run Job
POST /run-job/:id
Simulates job execution and triggers webhook after completion.

### Webhook Receiver (Local Testing)
POST /webhook-test
Receives and logs webhook payload.

---

## 🗄️ Database Schema

jobs

id INT (Primary Key)
taskName VARCHAR
payload JSON
priority VARCHAR
status VARCHAR
createdAt TIMESTAMP
updatedAt TIMESTAMP
completedAt TIMESTAMP

---

## ▶️ How to Run Locally

### 1️⃣ Backend Setup
```bash
cd backend
npm install
npm start
Backend runs on:
http://localhost:5000


###2️⃣ Frontend Setup
cd frontend
npm install
npm run dev
Frontend runs on:

http://localhost:3000
🔔 Webhook Flow

When a job reaches completed status:

Backend sends a POST request with job details

Payload includes:
jobId
taskName
priority
payload
completedAt

🤖 AI Usage Disclosure

AI tools were used responsibly to assist development.

Tool Used: ChatGPT

Purpose:

Architecture guidance

Debugging errors

Code structuring

Documentation drafting

All generated code was reviewed, tested, and understood by the developer.
