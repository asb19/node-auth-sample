const ApiError = require("./ApiError");

const accountSid =
  process.env.TWILIO_ACCOUNT_SID;
const authToken =
  process.env.TWILIO_AUTH_TOKEN;

const twilioClient = require("twilio")(accountSid, authToken);

exports.sendOtp = async (phone) => {
  try {
    const res = await twilioClient.verify
      .services(process.env.VID) //Put the Verification service SID here
      .verifications.create({ to: phone, channel: "sms" });
    console.log(res);

    return res.sid;
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err.message);
  }
};

exports.verifyOtp = async (phone, otp) => {
  try {
    const res = await twilioClient.verify
      .services(process.env.VID) //Put the Verification service SID here
      .verificationChecks.create({ to: phone, code: otp });
    console.log(res.status);
    return res.status;
  } catch (err) {
    throw new ApiError(err.statusCode || 500, err.message);
  }
};
