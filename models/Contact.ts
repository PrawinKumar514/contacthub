import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  designation?: string;
  address?: string;
  notes?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    company: { type: String },
    designation: { type: String },
    address: { type: String },
    notes: { type: String },
    profileImage: { type: String },
  },
  {
    timestamps: true,
  }
);

// Index for search
ContactSchema.index({ name: "text", email: "text", company: "text", phone: "text" });

const Contact =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;