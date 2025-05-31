// utils/twilio.js
import dotenv from "dotenv";
import twilio from "twilio";
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendOTP = async (phoneNumber, otp) => {
  return await client.messages.create({
    body: `Your verification code is: ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  });
};

export const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
