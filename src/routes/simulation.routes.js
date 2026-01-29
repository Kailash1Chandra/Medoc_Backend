const express = require("express");
const router = express.Router();
const Token = require("../models/Token");


router.get("/start", async (req, res) => {
  try {
    const tokens = await Token.find().populate("doctorId");
    res.json({
      message: "Simulation started",
      tokens
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
