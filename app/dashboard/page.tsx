"use client";
import { useState } from "react";

export default function Dashboard() {
  const [response, setResponse] = useState("");
  const [avatar, setAvatar] = useState("professor");

  async function askAI() {
    const res = await fetch("/api/ai/tutor", {
      method: "POST",
      body: JSON.stringify({
        message: "Explain photosynthesis simply",
        avatarType: avatar
      })
    });
    const data = await res.json();
    setResponse(data.reply);
  }

  return (
    <div style={{ padding: 40, background: "#F8FFF5" }}>
      <h1 style={{ color: "#1E8449" }}>Examly AI</h1>

      <select onChange={(e) => setAvatar(e.target.value)}>
        <option value="professor">🧠 Professor</option>
        <option value="coach">🚀 Coach</option>
        <option value="sage">📘 Sage</option>
        <option value="gamer">🎮 XP Master</option>
      </select>

      <button
        onClick={askAI}
        style={{ background: "#2ECC71", padding: 10, marginLeft: 10 }}
      >
        Ask AI
      </button>

      <pre>{response}</pre>
    </div>
  );
}
