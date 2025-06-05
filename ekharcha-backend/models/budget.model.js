import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  budgeted: {
    type: Number,
    required: true,
  },
  spent: {
    type: Number,
    required: true,
    default: 0,
  },
  lastAlertSent: {
    type: Date,
    default: null,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

export const Budget = mongoose.model('Budget', budgetSchema);
export default Budget;
