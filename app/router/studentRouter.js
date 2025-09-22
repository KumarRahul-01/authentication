const express=require('express');
const studentController = require('../controller/studentController');

const router=express.Router();

router.post('/createStudent',studentController.createStudent);
router.get('/allStudent',studentController.getAllStudent);
router.get('/studentById/:id',studentController.getStudentByID);
router.post('/otp-verify',studentController.verifyOTP);
router.post('/updateStudent/:id',studentController.updateStudent);

module.exports=router;