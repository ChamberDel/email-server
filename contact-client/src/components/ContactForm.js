import React, { useState } from "react";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://email-server-nine-gules.vercel.app/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Email sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus(data.message || "❌ Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("❌ Failed to send email. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <input
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="email"
        placeholder="Your Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="message"
        placeholder="Your Message"
        value={form.message}
        onChange={handleChange}
        className="w-full border p-2 rounded h-32"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Send
      </button>
      {status && <p className="text-center text-sm mt-2">{status}</p>}
    </form>
  );
};

export default ContactForm;

