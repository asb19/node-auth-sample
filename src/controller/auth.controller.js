const User = require("../models/user.model");


const { sendOtp, verifyOtp } = require("../utils/twilioOtp");

// --------------------- create new user ---------------------------------

exports.signup = async (req, res, next) => {
  try {
    let { phone, name, countryCode } = req.body;


    // check duplicate phone Number
    const phoneExist = await User.findOne({ phone });

    if (phoneExist) {
      return res.status(400).json({
        type: "error",
        message: "phone already exists",
        data: {
          user: countryCode+phone,
        },
      })

    }
    await sendOtp(countryCode+phone)


    
    res.status(200).json({
      type: "success",
      message: " OTP sended to mobile number",
      data: {
        user: countryCode+phone,
      },
    });
  } catch (error) {
    throw new Error("bad request")
  }
};


//verifyOtp 
exports.verifyOtpController = async(req,res,next) => {
    const type = req.query.type;
    const {phone, name, countryCode} = req.body
    const verified = await verifyOtp(req.body.countryCode+req.body.phone, req.body.otp)
    console.log(verified)
    if(!verified) {throw new Error("wrong otp")}
    if(type=="signup") {
    // create new user
    const createUser = new User({
        phone,
        countryCode,
        name,
      });
  
      // save user
  
      const user = await createUser.save();

      res.status(200).json({
        type: "success",
        message: "Account created",
        data: {
          userId: user._id,
        },
      });
    }
    else {
        const user = await User.findOne({ phone });
        res.status(201).json({
            type: "success",
            message: "OTP verified and logged in",
            data: {
              userId: user._id,
            },
          });
    }
  

}



// ------------ login with phone otp ----------------------------------

exports.loginWithPhoneOtp = async (req, res, next) => {
  try {

    const { phone, countryCode } = req.body;
    const user = await User.findOne({ phone });

    if (!user) {
      next({ status: 400, message: "PHONE_NOT_FOUND_ERR" });
      return;
    }
    await sendOtp(countryCode+phone)

    res.status(201).json({
      type: "success",
      message: "OTP sended to your registered phone number",
      data: {
        userId: user._id,
      },
    });

    
  } catch (error) {
    next(error);
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
        user:currentUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

