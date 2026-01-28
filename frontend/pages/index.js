
import { useEffect, useState } from "react";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [taskName, setTask] = useState("");

  const fetchJobs = async () => {
    const res = await fetch("http://localhost:5000/jobs");
    setJobs(await res.json());
  };

  const createJob = async () => {
    await fetch("http://localhost:5000/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskName, priority: "High", payload: {} })
    });
    fetchJobs();
  };

  const runJob = async (id) => {
    await fetch(`http://localhost:5000/run-job/${id}`, { method: "POST" });
    fetchJobs();
  };

  useEffect(() => { fetchJobs(); }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Job Scheduler</h1>
      <input value={taskName} onChange={e => setTask(e.target.value)} />
      <button onClick={createJob}>Create</button>

      <ul>
        {jobs.map(j => (
          <li key={j.id}>
            {j.taskName} - {j.status}
            {j.status === "pending" && (
              <button onClick={() => runJob(j.id)}>Run</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
