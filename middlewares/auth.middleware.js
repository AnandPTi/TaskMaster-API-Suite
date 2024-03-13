const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");

exports.verifyToken = (req, res, next) => {
  try {
    const tokenW = req.cookies.sudoCookie || req.headers.authorization;
    if (!tokenW) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    try {
      const token = tokenW.startsWith("Bearer ") ? tokenW.slice(7) : tokenW;
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      req.user = payload;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong, while verifying the token",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "THis is a protected route for admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User Role is not matching",
    });
  }
};