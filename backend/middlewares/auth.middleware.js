import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Verify JWT token and add user to request
export const isAuthenticated = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await User.findById(decoded.userId)
      .select("-password")
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

    // Add user to request object
    req.user = user;
    next();
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
      message: "Authentication failed",
      error: error.message,
    });
  }
};

// Check if user is admin
export const isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin rights required",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: "Authorization failed",
      error: error.message,
    });
  }
};
