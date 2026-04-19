import jwt from "jsonwebtoken";
import users from "../models/user.models.js";
import configure from "../config/config.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if(!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }
    const decodedToken = jwt.verify(token, configure.JWT_SECRET);
    const user = await users.findById(decodedToken.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    req.user = user;
    next();
  }catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
}

const sellerMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }
    const decodedToken = jwt.verify(token, configure.JWT_SECRET);
    console.log(decodedToken)
    const user = await users.findById(decodedToken.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.role !== "seller") {
      return res.status(403).json({
        success: false,
        message: "Forbidden, User must be seller",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export { authMiddleware, sellerMiddleware };
