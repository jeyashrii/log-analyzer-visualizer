const levels = ["INFO", "WARN", "ERROR"];
const services = ["auth", "payments", "notifications"];
const messages = {
  auth: ["Login successful", "Invalid username or password", "session expired"],
  payments: ["payment successful", "payment failed", "payment timed out"],
  notifications: ["email delivered", "Failed to send message"],
};

module.exports = { levels, services, messages };
