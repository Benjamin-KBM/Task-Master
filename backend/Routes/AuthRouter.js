const { signup, login } = require("../Controllers/AuthControllers");
const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/AuthValidation");

const router = require("express").Router();

// Login validation middleware
router.post("/login", loginValidation, login);
// SignUp validation middleware
router.post("/signup", signupValidation, signup);
module.exports = router;
