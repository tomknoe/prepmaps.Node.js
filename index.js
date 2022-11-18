const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

require("dotenv").config();

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB..."))
  .catch(() => console.log("Couldn't connect to MongoDB"));

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", require("./routes/auth"));

// open port to listen
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server running...");
});
