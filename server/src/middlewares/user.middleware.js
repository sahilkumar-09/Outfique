import jwt from "jsonwebtoken";
import configure from "../config/config.js";
import users from "../models/user.models.js";
import redis from "../services/redis.service.js";

const verifyHelper = async (req, res) => {
  let accessToken = req.cookies?.accessToken
  if (accessToken) {
    const isBlackList = await redis.get(accessToken)
    if (isBlackList) {
      throw new Error("Token is blacklisted")
    }
    try {
      const decoded = jwt.verify(accessToken, configure.ACCESS_TOKEN_SECRET)
      const user = await user.findById(decoded.userid)
      if (user) {
        return user
      }
    } catch (error) {
      
    }
  }

  const refreshToken = req.cookies?.refreshToken
  if (!refreshToken) {
    throw new Error("Refresh token missing")
  }

  const isRefreshBlackListed = await redis.get(refreshToken)
  if(isRefreshBlackListed){
    throw new Error("Refresh token blacklisted")
  }

  const decoded = jwt.verify(refreshToken, configure.REFRESH_TOKEN_SECRET)
  const user = await users.findById(decoded.userid)

  if (!user) {
    throw new Error("User not found")
  }

  const newAccessToken = jwt.sign(
    { userid: user._id },
    configure.ACCESS_TOKEN_SECRET,
    {expiresIn: configure.ACCESS_TOKEN_EXPIRES_IN}
  )

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: configure.NODE_ENV === "production" ? true : false,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000
  })

  return user
}

export const authMiddleware = async (req, res, next) => {
  try {
    const user = await verifyHelper(req, res)
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message
    })
  }
}

export const sellerMiddleware = async (req, res, next) => {
  try {
    const user = await verifyHelper(req, res)
    if (user.role !== "seller") {
      return res.status(403).json({
        success: false,
        message: "Seller access only"
      })
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message
    })
  }
}