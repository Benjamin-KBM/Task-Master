const mongoose = require("mongoose");

// Connect to MongoDB
const mongo_url = process.env.MONGO_CONN;

mongoose
  .connect(mongo_url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));
