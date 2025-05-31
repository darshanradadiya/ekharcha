// models/account.model.js
import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
  },
  username : {
    type: String,
    required: true,
    unique: true,
  },
  email : {
    type: String,
    required: true,
  },
  type : {
    type: String,
    enum: ['Expanse', 'Income'],
  },
  createdAt : {
    type: Date,
    default: Date.now,
  },
  updatedAt : {
    type: Date,
    default: Date.now,
  },
});

const Account = mongoose.model('Account', accountSchema);
export default Account;
