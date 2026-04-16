"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("Message sent! We'll get back to you soon.");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus(data.error || "Failed to send message");
      }
    } catch (err) {
      console.error(err);
      setStatus("Failed to send message");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      />
      <textarea
        name="message"
        placeholder="Your Message"
        value={form.message}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        rows={5}
        required
      />
      <button type="submit" className="px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition">
        Send Message
      </button>
      {status && <p className="text-center mt-2">{status}</p>}
    </form>
  );
}