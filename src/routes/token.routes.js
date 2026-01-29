const express = require("express");
const router = express.Router();
const Token = require("../models/Token");

router.post("/", async (req, res) => {
  try {
    const { patientName, doctorId } = req.body;

    // count existing tokens for that doctor
    const count = await Token.countDocuments({ doctorId });

    const token = new Token({
      patientName,
      doctorId,
      tokenNumber: count + 1,   // 👈 GENERATED HERE
      source: "ONLINE"
    });

    await token.save();

    res.status(201).json({
      tokenNumber: token.tokenNumber,
      tokenId: token._id
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
