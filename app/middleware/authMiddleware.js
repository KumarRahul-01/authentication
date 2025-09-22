const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const hashedPass = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  return hashedPass;
};

const comparePass = async (password, hashedPass) => {
  return await bcrypt.compare(password, hashedPass);
};

const gererateToken = async (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

const authCheck = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({ message: "unauthorize token" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

module.exports = { hashedPass, comparePass, gererateToken, authCheck };
