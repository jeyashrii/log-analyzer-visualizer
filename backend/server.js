const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDb = require("./config/dbConnection");
const { startLogSimulation } = require("./log.js");

dotenv.config();
const port = process.env.PORT || 5000;

connectDb();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/logs", require("./routes/logRoutes"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  startLogSimulation();
});
