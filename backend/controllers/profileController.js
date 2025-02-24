const User = require("../models/User");
const path = require("path"); // Add this line

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // Use req.user.userId
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.profilePicture) {
      user.profilePicture = `http://localhost:5000/${user.profilePicture.replace(
        /\\/g,
        "/"
      )}`;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let isUpdated = false;
    if (name && user.name !== name) {
      user.name = name;
      isUpdated = true;
    }
    if (email && user.email !== email) {
      user.email = email;
      isUpdated = true;
    }

    if (req.file) {
      console.log("Uploaded file:", req.file);
      user.profilePicture = path.posix.join("uploads", req.file.filename); // Use path.posix.join
      isUpdated = true;
    }

    if (isUpdated) {
      await user.save();

      // Construct the full URL for the profile picture
      const imageUrl = `${req.protocol}://${req.get("host")}/${
        user.profilePicture
      }`;

      return res.json({
        message: "Profile updated successfully",
        updated: true,
        user: {
          name: user.name,
          email: user.email,
          profilePicture: imageUrl, // Correct URL format
        },
      });
    } else {
      return res.json({
        message: "No changes were made to the profile.",
        updated: false,
      });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
