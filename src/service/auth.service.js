const ApiError = require("../utils/ApiError");
const { sendOtp, verifyOtp } = require("../utils/twilioOtp");

const User = require("../models/user.model");

const httpStatus = require("http-status");

exports.login = async (payload) => {
  try {
    const { phone, countryCode } = payload;

    const user = await User.findOne({ phone, countryCode });

    if (!user) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "User does not exist, please signup"
      );
    }
    await sendOtp(countryCode + phone);
    return user;
  } catch (err) {
    console.log(err.statusCode);
    throw new ApiError(err.statusCode, err.message);
  }
};

exports.signup = async (phone, countryCode) => {
  try {
    // check duplicate phone Number
    const phoneExist = await User.findOne({ phone });

    if (phoneExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "User already exists, please login"
      );
    }
    await sendOtp(countryCode + phone);
    return true;
  } catch (err) {
    throw new ApiError(err.statusCode, err.message);
  }
};

exports.verifyOtp = async (phone, countryCode, otp, type) => {
  try {
    const verified = await verifyOtp(countryCode + phone, otp);
    console.log(verified);
    if (verified !== "approved") {
      throw new ApiError(httpStatus.BAD_REQUEST, "wrong otp");
    }
    if (type == "signup") {
      // create new user
      const createUser = new User({
        phone,
        countryCode,
      });

      // save user

      const user = await createUser.save();

      return user;
    } else {
      const user = await User.findOne({ phone });
      return user;
    }
  } catch (err) {
    throw new ApiError(err.statusCode, err.message);
  }
};
