module.exports = async (req, res, next) => {
  try {
    decodedToken = req.reqdata;

    if (decodedToken.role !== "admin")
      throw new Error("you are not an admin !");

    next();
  } catch (error) {
    res.status(401).json({
      error: new Error("You need the administrations rights"),
    });
  }
};
