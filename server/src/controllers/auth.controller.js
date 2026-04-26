import users from "../models/user.models.js";
import jwt from "jsonwebtoken";
import configure from "../config/config.js";
import products from "../models/product.models.js";

const sendTokenResponse = async(user, res) => {
  const token = jwt.sign({ id: user._id }, configure.JWT_SECRET, {
    expiresIn: configure.JWT_EXPIRE,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return token;
}

/**
 * @Register Controller
 */

const userRegisterController = async (req, res) => {
  try {
    const { email, contact, password, fullName, isSeller } = req.body;

    const userExists = await users.findOne({
      $or: [{ email }, { contact }],
    });

    if (userExists) {
      return res.status(400).json({
        message: "User with this email or contact already exists",
      });
    }

    const user = await users.create({
      email,
      contact,
      password,
      fullName,
      role: isSeller ? "seller" : "buyer",
    });

    await sendTokenResponse(user, res);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        email: user.email,
        contact: user.contact,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }

};

/**
 * @Login Controller
 */

const userLoginController = async (req, res) => {

  try {
    const { email, password } = req.body;

    const user = await users.findOne({email})
    if (!user) {
      return res.status(400).json({
        message: "Invalid email and password"
      })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      })
    }

    await sendTokenResponse(user, res)
    
    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        email: user.email,
        contact: user.contact,
        fullName: user.fullName,
        role: user.role,
      },
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * @GoogleSuccess controller
 */

const googleSuccessController = async (req, res) => {
  const { id, displayName, emails, photos } = req.user;
  const email = emails[0].value;

  let user = await users.findOne({ email });

  if (!user) {
    user = await users.create({
      email,
      googleId: id,
      fullName: displayName,
    });
  }

  const token = jwt.sign({ id: user._id }, configure.JWT_SECRET, {
    expiresIn: configure.JWT_EXPIRE,
  });

  res.cookie("token", token);
  res.redirect("http://localhost:5173/");
};

/**
 * @Me Controller
 */

const getMeController = async (req, res) => {
  try {
    const user = req.user
    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullName,
        contact: user.contact,
        role: user.role
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

export {
  userRegisterController, userLoginController, googleSuccessController, getMeController
};