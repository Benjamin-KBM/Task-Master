const jwt = require("jsonwebtoken");

// middleware for authentication
const isAuthenticated = (req, res, next) => {
  // check if the request contains the authorization header. If not, return an error.
  // If yes, verify the token. If valid, add the user to the request object. If not, return an error.
  const auth = req.headers["authorization"];
  if (!auth) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    // verify the token and get the user details. If valid, add the user to the request object. If not, return an error.
    // The jwt.verify function will throw an error if the token is invalid.  The decoded object contains the user details.
    // req.user will be added to the request object.
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "unauthorized, jwt token wrong or has expired" });
  }
};

module.exports = isAuthenticated;
