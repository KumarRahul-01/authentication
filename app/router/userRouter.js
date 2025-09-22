const express=require('express');

const UserController = require('../controller/userController');
const { authCheck } = require('../middleware/authMiddleware');
const userImage = require('../helper/profileImg');
const router=express.Router()

router.post('/register',userImage.single('image'),UserController.registerUser);
router.post('/login',UserController.userLogin);
router.get('/getAll',UserController.getAllData);
router.get('/getProfile',authCheck,UserController.getprofile);
router.post('/update/:id',userImage.single('image'),UserController.updateUser);
router.delete('/delete/:id',UserController.deleteUser)

module.exports=router;