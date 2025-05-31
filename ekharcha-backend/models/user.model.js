import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  accountLimit: {
    type: Number,
    default: 1,
  },

  // ✅ Additions for OTP verification
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },

  isGoogleUser: {
    type: Boolean,
    default: false,
  },

}, {
  timestamps: true,
  versionKey: false,
});

const User = mongoose.model('User', userSchema);
export default User;
