import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    service: { type: String, required: true, enum: ['Website Building & Hosting', 'Social Media Handling', 'Digital Marketing'] },
    message: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Inquiry = mongoose.model('Inquiry', InquirySchema);


