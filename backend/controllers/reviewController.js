const nodemailer = require("nodemailer");
const Review = require("../models/Review");

// Configure the transporter for sending emails using Mailtrap with direct credentials
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

// HTML email template for a visually appealing design
function getEmailTemplate(review) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #333;">New Review Submitted</h2>
      <p>A new review has been submitted with the following details:</p>
      <ul style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
        <li><strong>Title:</strong> ${review.title}</li>
        <li><strong>Content:</strong> ${review.content}</li>
        <li><strong>Rating:</strong> ${review.rating}</li>
        <li><strong>Stars:</strong> ${review.stars}</li>
        <li><strong>Review ID:</strong> ${review._id}</li>
      </ul>
      <p>Thank you for staying updated with our reviews!</p>
      <p style="color: #555;">Best regards,<br>Your Website Team</p>
    </div>
  `;
}

exports.addReview = async (req, res) => {
  const { title, content, rating, stars, userEmail } = req.body;

  try {
    const review = new Review({ title, content, rating, stars });
    await review.save();

    // Email options for admin
    const mailOptionsAdmin = {
      from: "fuaddganiyu@gmail.com", // Sender's email
      to: "fuaddganiyu@gmail.com", // Replace with the actual admin email
      subject: "New Review Submitted",
      html: getEmailTemplate(review),
    };

    // Send email to admin
    transporter.sendMail(mailOptionsAdmin, (err, info) => {
      if (err) {
        console.error("Error sending email to admin: ", err);
        return res.status(500).send("Error sending email to admin");
      }
      console.log("Admin email sent: " + info.response);
    });

    // Email options for user
    const mailOptionsUser = {
      from: "fuaddganiyu@gmail.com", // Sender's email
      to: userEmail, // User's email who submitted the review
      subject: "Thank You for Your Review!",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">Thank You for Your Review!</h2>
          <p>Dear User,</p>
          <p>Thank you for submitting a review for our website. Here’s a summary:</p>
          <ul style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
            <li><strong>Title:</strong> ${review.title}</li>
            <li><strong>Content:</strong> ${review.content}</li>
            <li><strong>Rating:</strong> ${review.rating}</li>
            <li><strong>Stars:</strong> ${review.stars}</li>
          </ul>
          <p>We appreciate your feedback and will continue to improve our service.</p>
          <p style="color: #555;">Best regards,<br>Your Website Team</p>
        </div>
      `,
    };

    // Send email to user
    transporter.sendMail(mailOptionsUser, (err, info) => {
      if (err) {
        console.error("Error sending email to user: ", err);
        return res.status(500).send("Error sending email to user");
      }
      console.log("User email sent: " + info.response);
    });

    res.status(201).json({ msg: "Review added successfully", review });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json({ success: true, reviews });
  } catch (err) {
    console.error("Error fetching reviews:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({ error: "Review not found" });

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    review.content = req.body.content || review.content;
    review.rating = req.body.rating || review.rating;
    await review.save();

    res.json({ message: "Review updated!", review });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({ error: "Review not found" });

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await review.remove();
    res.json({ message: "Review deleted!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};