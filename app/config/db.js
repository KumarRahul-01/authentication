// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("database Connected");
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports=connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI2);
    console.log("database2 Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports= connectDB;
