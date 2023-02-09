const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) throw new Error("JWT_SECRET must be set in .env");

module.exports = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    const token = header.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.reqdata = decodedToken;
    if (req.body.user_id && req.body.user_id !== req.reqdata.user_id) {
      throw " Invalid user ID";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
