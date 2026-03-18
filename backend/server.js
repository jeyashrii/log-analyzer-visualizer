const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/dbConnection");
const { startLogSimualtion } = require("./log.js");

dotenv.config();
const port = process.env.PORT || 5000;

connectDb();
const app = express();
app.use(express.json());

app.use("/logs", require("./routes/logRoutes"));
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  startLogSimualtion();
});
