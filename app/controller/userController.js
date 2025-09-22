const {
  hashedPass,
  comparePass,
  gererateToken,
} = require("../middleware/authMiddleware");
const User = require("../model/user");

class UserController {
  async registerUser(req, res) {
    try {
      const { name, email, role, password } = req.body;
      const profileImg = req.file ? req.file.filename : "";
      // console.log(profileImg);
      if (!name || !email || !role || !password) {
        return res.status(400).json({ message: "All fields are require" });
        // console.log("All fields are require");
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          status: false,
          message: "User already Exist",
        });
      }

      const hashedPassword = await hashedPass(password);

      const userData = new User({
        name,
        email,
        role,
        password: hashedPassword,
        image: profileImg,
      });
      userData.save();
      res.status(201).json({
        status: true,
        message: "User Register Successfull",
        userData,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "error creating user",
        error: error.message,
      });
    }
  }
  async userLogin(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const isMatch = await comparePass(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const token = await gererateToken(user);
      res.status(200).json({
        status: true,
        message: "user login successfull",
        userData: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        },
        token: token,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
  async getprofile(req, res) {
    try {
      const user = await User.findById(req.user.id, "-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        status: true,
        message: "User profile fetched successfully",
        userData: user,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
  async getAllData(req, res) {
    try {
      const data = await User.find({}, "-password");
      res.status(200).json({
        status: true,
        total: data.length,
        message: "All user data",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, role } = req.body;

      const image = req.file.filename;
      const updateData = { name, role, image };

      const update = await User.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (update) {
        return res.status(200).json({
          status: true,
          message: "Data updated.",
          data:update
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }
  async deleteUser(req,res){
    try {
      const {id}=req.params;
    const deleteUser= await User.findByIdAndDelete(id);
    res.status(200).json({
      status:true,
      message:"deleted",
      deleteData:deleteUser
    })
      
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new UserController();
