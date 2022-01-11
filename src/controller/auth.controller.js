const User = require("../models/user.model");

const Status = require("http-status");
const authService = require("../service/auth.service");

const ApiError = require("../utils/ApiError");

// --------------------- create new user ---------------------------------

exports.signup = async (req, res, next) => {
  try {
    let { phone, name, countryCode } = req.body;
    await authService.signup(phone, countryCode);

    res.status(Status.OK).json({
      status: "SUCCESS",
      message: " OTP sent to mobile number",
      data: {
        user: countryCode + phone,
      },
    });
  } catch (error) {
    next(error);
  }
};

//verifyOtp
exports.verifyOtpController = async (req, res, next) => {
  try {
    const type = req.query.type;
    const { phone, name, countryCode, otp } = req.body;
    const user = await authService.verifyOtp(phone, countryCode, otp, type);

    res.status(200).json({
      status: "SUCCESS",
      message: "Otp verified",
      data: {
        userId: user._id,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ------------ login with phone otp ----------------------------------

exports.loginWithPhoneOtp = async (req, res, next) => {
  try {
    const user = await authService.login(req.body);

    res.status(201).json({
      status: "SUCCESS",
      message: "OTP sended to your registered phone number",
      data: {
        userId: user._id,
      },
    });
  } catch (err) {
    next(err);
  }
};

// --------------- fetch current user -------------------------

exports.fetchCurrentUser = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;

    return res.status(200).json({
      type: "success",
      message: "fetch current user",
      data: {
        user: currentUser,
      },
    });
  } catch (error) {
    next(error);
  }
};
