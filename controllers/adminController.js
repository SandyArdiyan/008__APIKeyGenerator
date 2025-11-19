const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");
const User = require("../models/User");
const ApiKey = require("../models/ApiKey");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const admin = await Admin.create({ email, password: hash });

  res.json({ message: "Admin registered", admin });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ where: { email } });

  if (!admin) return res.status(400).json({ message: "Admin not found" });

  const valid = await bcrypt.compare(password, admin.password);

  if (!valid) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ id: admin.id }, config.jwtSecret, { expiresIn: "1d" });

  res.json({ message: "Login success", token });
};

exports.dashboard = async (req, res) => {
  const users = await User.findAll();
  const apiKeys = await ApiKey.findAll();

  res.json({ users, apiKeys });
};
