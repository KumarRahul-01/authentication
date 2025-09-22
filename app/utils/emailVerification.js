const transporter  = require('../config/emailConfig');
const OTPmodel=require('../model/otp');
const sendOTPverification= async(req,student)=>{
    const otp=Math.floor(1000+Math.random()*9000)
    const saveOTP= new OTPmodel({
        studentId:student._id,
        otp:otp,
    }).save();
    await transporter.sendMail({
        from:process.env.EMAIL_FROM,
        to:student.email,
        subject:"OTP Verify your account",
        html:`<p>Dear ${student.name} </p> <h2>your OTP:${otp} </p>`
    });
    console.log(otp);
    return otp
    
};
module.exports=sendOTPverification;