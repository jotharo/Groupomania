const express = require ('express');
const router = express.Router();
const userCtrl = require('../controllers/user')

//const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');

router.put('/', userCtrl.signupUser);
router.post('/', userCtrl.loginUser);
router.put('/:id',  userCtrl.editUser);
router.get('/:id',  userCtrl.getOneUser); 
router.get('/',  userCtrl.getAllUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;