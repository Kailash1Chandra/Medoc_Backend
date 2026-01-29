const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
  doctorId: mongoose.Schema.Types.ObjectId,
  startTime: String,
  endTime: String,
  capacity: Number,
  currentTokens: { type: Number, default: 0 }
});

module.exports = mongoose.model("Slot", SlotSchema);
