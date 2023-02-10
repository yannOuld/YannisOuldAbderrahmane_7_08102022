const jwt = require("../manager/jwt");


function modifyPermit(req, res, user_id) {
  if (req.auth.role === "admin") return;
  if (user_id === req.auth.user_id) return;
  throw res.status(401).json("Unauthorized")
}



function auth(req, res, next) {
  const header = req.headers.authorization;
  const token = header.split(" ")[1];
  const decodedToken = jwt.verify(token);
  req.auth = decodedToken;

  if (!req.auth.user_id) throw res.status(401).json('Unauthorized');
  next();

};


module.exports = { modifyPermit, auth }
