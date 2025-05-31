import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// Send OTP SMS
export const sendOTP = async (to, otp) => {
  try {
    const message = await client.messages.create({
      body: `Your verification code is: ${otp}`,
      from: twilioNumber,
      to,
    });
    return message;
  } catch (error) {
    console.error("Twilio SMS Error:", error);
    throw error;
  }
};
