import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

// ================= DB =================
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Keerthi@36",
  database: "dotix"
});

// ================= CREATE JOB =================
app.post("/jobs", async (req, res) => {
  const { taskName, payload, priority } = req.body;

  await db.execute(
    "INSERT INTO jobs (taskName, payload, priority, status) VALUES (?, ?, ?, 'pending')",
    [taskName, JSON.stringify(payload || {}), priority]
  );

  res.json({ message: "Job created" });
});

// ================= LIST JOBS =================
app.get("/jobs", async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM jobs");
  res.json(rows);
});

// ================= RUN JOB =================
app.post("/run-job/:id", async (req, res) => {
  const jobId = req.params.id;

  await db.execute(
    "UPDATE jobs SET status='running' WHERE id=?",
    [jobId]
  );

  res.json({ message: "Job running" });

  setTimeout(async () => {
    await db.execute(
      "UPDATE jobs SET status='completed', completedAt=NOW() WHERE id=?",
      [jobId]
    );

    const [job] = await db.execute(
      "SELECT * FROM jobs WHERE id=?",
      [jobId]
    );

    // 🔔 SEND WEBHOOK (LOCAL)
    await axios.post("http://localhost:5000/webhook-test", {
      jobId: job[0].id,
      taskName: job[0].taskName,
      status: "completed",
      priority: job[0].priority,
      payload: job[0].payload,
      completedAt: job[0].completedAt
    });
  }, 3000);
});

// ================= WEBHOOK RECEIVER =================
app.post("/webhook-test", (req, res) => {
  console.log("✅ WEBHOOK RECEIVED:");
  console.log(JSON.stringify(req.body, null, 2));
  res.json({ message: "Webhook received successfully" });
});

// ================= START =================
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
