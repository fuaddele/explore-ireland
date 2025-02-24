// backend/routes/faqRoutes.js
const express = require("express");
const Faq = require("../models/faq");
const nodemailer = require("nodemailer");
const router = express.Router();

// Configure Nodemailer

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "68fb83ea3791cc",
    pass: "42c8c1e237961e",
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});
// Get all FAQs
router.get("/faqs", async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.json({ faqs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post a new FAQ and send emails
router.post("/", async (req, res) => {
  const { name, email, faq } = req.body;

  try {
    const newFaq = new Faq({
      name,
      email,
      faq,
    });

    const savedFaq = await newFaq.save();

    // Email to Admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: "fuaddganiyu@gmail.com", // Replace with admin's email
      subject: "New FAQ Submitted",
      text: `A new FAQ has been submitted by ${name}.\n\nQuestion: ${faq}\n\nEmail: ${email}`,
    };

    // Email to User
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for your FAQ",
      text: `Hello ${name},\n\nThank you for reaching out with your question! We will get back to you shortly.\n\nYour Question: ${faq}`,
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(201).json({
      message: "FAQ added and emails sent successfully",
      faq: savedFaq,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
