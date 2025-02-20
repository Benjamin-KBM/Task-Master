const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");

require("dotenv").config();
require("./Models/db");

// Use allocated port set in .env file
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
// Middleware to allow cross-origin requests
app.use(cors());
// Authentication Route
app.use("/auth", AuthRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
