const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const Slot = require("../models/Slot");

// ✅ POST - Create Doctor
router.post("/", async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET - All Doctors
router.get("/", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

// ✅ GET - Doctor Slots
router.get("/:doctorId/slots", async (req, res) => {
  const slots = await Slot.find({ doctorId: req.params.doctorId });
  res.json(slots);
});

module.exports = router;
