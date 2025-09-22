const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    require: true,
  },
  otp: { type: Number, require: true },
  createdAt: { type: Date, default: Date.now(), expiresIn: "15m" },
});

module.exports=mongoose.model('OTP',otpSchema)
