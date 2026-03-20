const { levels, services, messages } = require("./constants.js");
const Log = require("./models/logModel");

const getRandomValue = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const generateLogEntry = () => {
  const level = getRandomValue(levels);
  const service = getRandomValue(services);
  const message = getRandomValue(messages[service]);
  return {
    timestamp: new Date(),
    level: level,
    service: service,
    message: message,
  };
};

const startLogSimulation = () => {
  setInterval(async () => {
    try {
      const newLog = generateLogEntry();
      await Log.create(newLog);
      console.log("Created new log");
    } catch (err) {
      console.error("Error generating log:", err.message);
    }
  }, 1000);
};

module.exports = { generateLogEntry, startLogSimulation };
