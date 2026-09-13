"use client";

import { useRef, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  branch: "",
  year: "",
  phone: "",
};

export default function JoinForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function playSuccessAudio() {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: "success", message: "Thanks! You are registered." });
        setForm(initialForm);
        playSuccessAudio();
      } else {
        setStatus({ type: "error", message: data.message || "Something went wrong." });
      }
    } catch (err) {
      setStatus({ type: "error", message: "Could not connect. Try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="join" className="section">
      <div className="container">
        <h2>Join Us</h2>
        <p className="subtitle">Become a member of GDGGU</p>

        <form className="form-box" onSubmit={handleSubmit}>
          <audio
            ref={audioRef}
            src="team/maal_agaya.mp3"
            preload="auto"
          />

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="NAMEEEE DOOOOOO"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="MAIL TU DIA MAINA"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="branch">Department / Branch</label>
            <input
              id="branch"
              name="branch"
              type="text"
              placeholder="e.g. Computer Science"
              value={form.branch}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Year</label>
            <select id="year" name="year" value={form.year} onChange={handleChange}>
              <option value="">Select year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="HIHIHII"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Submitting..." : "Register"}
          </button>

          {status.message && (
            <p className={`form-msg ${status.type}`}>{status.message}</p>
          )}
        </form>
      </div>
    </section>
  );
}
