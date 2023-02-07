const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const multer = require('../middleware/multer-config.js');

router.get('/', auth, postCtrl.getAllPosts);
router.get('/:uuid', auth, postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.createPost);
router.patch('/:uuid', auth, multer, postCtrl.modifyPost);
router.delete('/:uuid', auth, postCtrl.deletePost);

router.get('/', auth, authAdmin, postCtrl.getAllPosts);
router.patch('/:uuid/admin', auth, authAdmin, multer, postCtrl.modifyPost);
router.delete('/:uuid/admin', auth, authAdmin, postCtrl.deletePost);


module.exports = router;