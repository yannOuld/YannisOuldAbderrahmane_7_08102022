const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const { auth } = require("../middleware/auth");
const multer = require("../middleware/multer-config.js");

router.get("/", postCtrl.getAllPosts);
router.get("/:uuid", auth, postCtrl.getOnePost);
router.post("/", auth, multer, postCtrl.createPost);
router.patch("/:uuid", auth, multer, postCtrl.modifyPost);
router.delete("/:uuid", auth, postCtrl.deletePost);


module.exports = router;
