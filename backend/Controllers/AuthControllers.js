const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");
// -----------------------------------------------------------------------------------------------------------------------
// handle the sign up functionality
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // search the collection have retrieve all mail addresses
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }
    // Hash the password before saving it in the database
    const userModel = new UserModel({ firstName, lastName, email, password });
    userModel.password = await bcrypt.hash(password, 8);
    await userModel.save();
    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
// -------------------------------------------------------------------------------------------------------------------------
// handles login functionality
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // search the collection have retrieve all mail addresses
    const user = await UserModel.findOne({ email });
    const errorMsg = "Auth failed email or password is wrong";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    // Check if the password entered matches the password in the database.
    const isPasswordAMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordAMatch) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login Success",
      success: true,
      jwtToken,
      email,
      name: user.firstName,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  signup,
  login,
};
