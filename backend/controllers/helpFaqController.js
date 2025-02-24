const Help = require("../models/Help");

exports.addHelp = async (req, res) => {
  const { description } = req.body;

  try {
    const help = new Help({
      user: req.user.id, // Assumes middleware sets req.user
      description,
    });

    await help.save();
    res.status(201).json({ msg: "Help entry added successfully", help });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
