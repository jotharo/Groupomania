const express = require ('express');
const router = express.Router();
const postCtrl = require('../controllers/post')
const commentCtrl = require('../controllers/comment')
const likeCtrl = require('../controllers/like')



const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// POST

router.post('/', auth, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost); 
router.get('/', auth, postCtrl.getAllPost);
router.put("/:id", auth, postCtrl.editPost);
router.delete("/:id",auth, postCtrl.deletePost);

// COMMENT

router.post("/:id/comments", commentCtrl.createComment);
router.get('/:id/comments/:id',  commentCtrl.getOneComment);
router.get('/:id/comments/',  commentCtrl.getAllComment);
router.put("/:id/comments/:id", commentCtrl.editComment);
router.delete("/:id/comments/:id", commentCtrl.deleteComment);

// LIKE

router.post("/:id/likes", likeCtrl.likePost);
router.delete("/:id/likes/:id", likeCtrl.deleteLike);


/*
router.get('/:postId/like',  likeCtrl.getOneLike)
router.get('/:postId/likes',  likeCtrl.getAllLike)
*/

module.exports = router;