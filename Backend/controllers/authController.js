const User = require("../models/User");
const Serviceman = require("../models/Serviceman");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      address,
      category,
      experience,
      hourlyRate,
    } = req.body;

    const existingUser = await User.findOne({ email });
    const existingProvider = await Serviceman.findOne({ email });
    if (existingUser || existingProvider) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    let newUser;
    let assignedRole = role === "provider" ? "provider" : "customer";

    if (role === "provider") {
      newUser = new Serviceman({
        name,
        email,
        password: hashedPassword,
        category,
        experience,
        hourlyRate,
        phone,
        address,
      });
    } else {
      newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: "customer",
        address,
        phone,
      });
    }

    await newUser.save();

    // --- GENERATE TOKEN IMMEDIATELY ---
    const token = jwt.sign(
      { id: newUser._id, role: assignedRole },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    // Send token and user info so frontend can log them in instantly
    res.status(201).json({
      message: "Registration successful!",
      token,
      user: { id: newUser._id, name: newUser.name, role: assignedRole },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// LOGIN LOGIC
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user in both collections
    let user = await User.findOne({ email });
    let userType = "customer";

    if (!user) {
      user = await Serviceman.findOne({ email });
      userType = "provider";
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Generate JWT
    const token = jwt.sign(
      { id: user._id, role: userType },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, role: userType },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// GET CURRENT USER PROFILE
exports.getProfile = async (req, res) => {
  try {
    const { id, role } = req.user;

    let user;
    if (role === "provider") {
      user = await Serviceman.findById(id).select("-password");
    } else {
      user = await User.findById(id).select("-password");
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user data with role
    res.status(200).json({
      ...user.toObject(),
      role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
