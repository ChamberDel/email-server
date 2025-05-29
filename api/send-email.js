const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://chamber-site-v3.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Message from ${name}`,
      text: `Email: ${email}\nMessage:\n${message}`,
    });

    return res.status(200).json({ message: "Email sent successfully!" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to send email." });
  }
}
