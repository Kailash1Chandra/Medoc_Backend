const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },

  tokenNumber: {
    type: Number,
    required: true
  },

  slotId: mongoose.Schema.Types.ObjectId,

  source: {
    type: String,
    enum: ["ONLINE", "WALKIN", "PRIORITY", "FOLLOWUP", "EMERGENCY"],
    default: "ONLINE"
  },

  priority: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ["BOOKED", "CANCELLED", "NO_SHOW", "COMPLETED"],
    default: "BOOKED"
  }

}, { timestamps: true });

module.exports = mongoose.model("Token", TokenSchema);
