import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({
          message: "Email already registered",
        });
      }
      if (existingUser.username === username) {
        return res.status(400).json({
          message: "Username already taken",
        });
      }
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password, // Password will be hashed by the pre-save middleware
    });

    // Save user to database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Get user data without sensitive information
    const userData = newUser.getPublicProfile();

    res.status(201).json({
      message: "Registration successful",
      user: userData,
      token,
    });
  } catch (error) {
    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Handle other errors
    res.status(500).json({
      message: "Failed to register user",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    // Get user from database with password
    const user = await User.findOne({ email }).select("+password");

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Update last login time
    user.lastLogin = new Date();
    await user.save();

    // Get user data without sensitive information
    const userData = user.getPublicProfile();

    res.json({
      message: "Login successful",
      user: userData,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to login",
      error: error.message,
    });
  }
};

export const me = async (req, res) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Please login to continue",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await User.findById(decoded.userId)
      .populate("cart.product")
      .populate("wishlist")
      .populate("orders");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check if account is active
    if (user.accountStatus !== "active") {
      return res.status(403).json({
        message: `Your account is ${user.accountStatus}. Please contact support.`,
      });
    }

    // Get user data without sensitive information
    const userData = user.getPublicProfile();

    res.json({
      user: userData,
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired",
      });
    }
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Since we're using JWT, we don't need to do anything server-side
    // The client will remove the token
    res.json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to logout",
      error: error.message,
    });
  }
};
