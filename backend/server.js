const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
//const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/dbConnection");

connectDb();
const app = express();
app.use(express.json());

//app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
