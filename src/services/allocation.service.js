const Slot = require("../models/Slot");
const Token = require("../models/Token");
const priorityMap = require("../utils/priorityMap");

async function allocateToken({ doctorId, patientName, source }) {
  const priority = priorityMap[source];

  const slots = await Slot.find({ doctorId }).sort({ startTime: 1 });

  // Try normal allocation
  for (const slot of slots) {
    if (slot.currentTokens < slot.capacity) {
      return await assignToken(slot, doctorId, patientName, source, priority);
    }
  }

  // Emergency / Priority reallocation
  if (priority <= 2) {
    return await reallocate(slots, doctorId, patientName, source, priority);
  }

  return { message: "All slots full. Added to waitlist." };
}

async function assignToken(slot, doctorId, patientName, source, priority) {
  const token = await Token.create({
    patientName,
    doctorId,
    slotId: slot._id,
    source,
    priority
  });

  slot.currentTokens += 1;
  await slot.save();

  return {
    tokenId: token._id,
    slot: `${slot.startTime}-${slot.endTime}`,
    status: "CONFIRMED"
  };
}

async function reallocate(slots, doctorId, patientName, source, priority) {
  const tokens = await Token.find({
    slotId: { $in: slots.map(s => s._id) },
    status: "BOOKED"
  }).sort({ priority: -1 });

  const victim = tokens.find(t => t.priority > priority);
  if (!victim) return { message: "Reallocation not possible" };

  victim.status = "CANCELLED";
  await victim.save();

  const slot = slots.find(s => s._id.equals(victim.slotId));

  return await assignToken(slot, doctorId, patientName, source, priority);
}

module.exports = { allocateToken };
