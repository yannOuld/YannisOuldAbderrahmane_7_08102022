const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');


router.post('/:uuid/comments', auth, commentCtrl.createComment)
router.get('/:uuid/comments/', auth, commentCtrl.getAllComment)
router.delete('/:uuid/comments/:id', auth, commentCtrl.deleteComment)
router.delete('/:uuid/comments/:id/admin', auth, authAdmin, commentCtrl.deleteComment)

module.exports = router;