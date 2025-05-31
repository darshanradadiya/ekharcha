import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['INCOME', 'EXPENSE'],
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

export const Category = mongoose.model('Category', categorySchema);
export default Category;
