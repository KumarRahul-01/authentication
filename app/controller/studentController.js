const Student = require("../model/student");
const sendOTPverification = require("../utils/emailVerification");
const OTP= require('../model/otp');
const student = require("../model/student");

class StudentController {
  async createStudent(req, res) {
    try {
      const { name, email, age, city } = req.body;
      if (!name || !email || !age || !city) {
        return res.status(400).json({
          messsge: "All fields are required",
        });
      }
      const existingStudent = await Student.findOne({ email });
      if (existingStudent) {
        return res
          .status(400)
          .json({ status: false, message: "Student Exist" });
      }

      const StudentData = new Student({ name, email, age, city });
      StudentData.save();
      await sendOTPverification(req, StudentData);
      res.status(201).json({
        status: true,
        message: "Student created and otp send to email",
        StudentData,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async getAllStudent(req,res){
    try {
      const allStudent=await Student.find()
      res.status(200).json({
        status:true,
        message:"All data",
        total:allStudent.length,
        allStudent

      })
      
    } catch (error) {
      res.status(500).json({
        status:false,
        message:error.message
      })
      
    }
  }
   
  async verifyOTP(req,res){
    try {
      const {email,otp}=req.body;
      // Validate input
      if ( !email||!otp) {
        return res.status(400).json({
          status: false,
          message: "All fields are required.",
        });
      }
      // Check if user exists
      const student = await Student.findOne({ email });
      if (!student) {
        return res.status(400).json({
          status: false,
          message: "Email doesn't exist.",
        });
      }
      const otpVerification= await OTP.findOne({
        studentId:student._id,
        otp
      })
      // If OTP doesn't match
      if (!otpVerification) {
        await sendOTPverification(req, student); //resend otp to the user
        return res.status(400).json({
          status: false,
          message: "Invalid OTP. A new OTP has been sent to your email.",
        });
      }
      // Mark user as verified
      student.isVerified = true;
      await student.save();
      res.status(200).json({
        status: true,
        message: "email verify successfully",
        otpVerification,
      })
      
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
    }
  

  async updateStudent(req, res) {
    try {
      const { id } = req.params;
      const { name, age, city } = req.body;
      //   const data = { name, age, city };

      const updateStudent = await Student.findByIdAndUpdate(
        id,
        { name, age, city },
        {
          new: true,
        }
      );
      if (updateStudent) {
        return res.status(200).json({
          status: true,
          message: "Student Updated",
          updateStudent,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new StudentController();
