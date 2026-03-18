const mongoose = require("mongoose");

const logSchema = mongoose.Schema({
  timeStamp: { type: Date, required: true },
  level: { type: String, enum: ["INFO", "WARN", "ERROR"], required: true },
  service: {
    type: String,
    enum: ["auth", "payments", "notifications"],
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Log", logSchema);
