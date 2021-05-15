const express = require ('express');
const router = express.Router();
const postCtrl = require('../controllers/post')

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPost);
router.get('/:id', auth, postCtrl.getOnePost); 
router.put("/:id", auth, postCtrl.editPost);
router.delete("/:id",auth, postCtrl.deletePost);

/*
router.post("/:id/like", likeCtrl.likePost);
router.delete("/:id/like", likeCtrl.unLikePost);
router.get('/:postId/like',  likeCtrl.getOneLike)
router.get('/:postId/likes',  likeCtrl.getAllLike)


router.post("/:id/comments", commentCtrl.createComment);
router.get('/:postId/comments/:id',  commentsCtrl.getOneComment)
router.get('/:postId/comments/',  commentsCtrl.getAllComment)
router.put("/:id/comments", commentCtrl.editComment);
router.delete("/comments/:id", commentCtrl.deleteComment);/*/

module.exports = router;