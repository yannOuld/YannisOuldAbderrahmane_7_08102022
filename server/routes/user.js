const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const multer = require("../middleware/multer-config.js");

router.get("/:uuid", auth, userCtrl.getOneUser);
router.get("/", auth, authAdmin, userCtrl.getAllUsers);
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.patch("/:uuid", auth, multer, userCtrl.modifyUser);

router.patch("/:uuid/admin", auth, multer, userCtrl.modifyUser);
router.delete("/:uuid/admin", auth, authAdmin, userCtrl.deleteUser);

module.exports = router;
