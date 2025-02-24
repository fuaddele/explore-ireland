const nodemailer = require("nodemailer");
const Review = require("../models/Review");

// Configure the transporter for sending emails using Mailtrap with direct credentials
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1199036a63620b",
    pass: "fd4db8445d7203",
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
      from: "coriowhite123@gmail.com", // Sender's email
      to: "coriowhite123@gmail.com", // Replace with the actual admin email
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
      from: "coriowhite123@gmail.com", // Sender's email
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
    const reviews = await Review.find();
    res.status(200).json({ reviews });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
