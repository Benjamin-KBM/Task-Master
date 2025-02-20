const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
  password: {
    type: String,
    required: true,
  },
});
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
