const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = require("twilio")(accountSid, authToken);

exports.sendOtp = async(phone)=> {
    const res =  await twilioClient.verify
  .services(process.env.VID) //Put the Verification service SID here
  .verifications.create({to: phone, channel: "sms"})
  console.log(res)
  return res.sid
  

}

exports.verifyOtp = async(phone, otp)=>{
    const res = await twilioClient.verify
  .services(process.env.VID) //Put the Verification service SID here
  .verificationChecks.create({ to: phone, code: otp })
  console.log(res.status)
  return res.status

}