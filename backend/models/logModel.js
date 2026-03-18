const mongoose = require("mongoose");

const logSchema = mongoose.Schema({
  timestamp: { type: Date, required: true },
  level: { type: String, enum: ["INFO", "WARN", "ERROR"], required: true },
  service: {
    type: String,
    enum: ["auth", "payments", "notifications"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Log", logSchema);
