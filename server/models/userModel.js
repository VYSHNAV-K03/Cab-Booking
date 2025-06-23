import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: { type: String },
  otpExpires: { type: Date }, // Expiry time for OTP
  phone: {
    type: String,
  },
  place: {
    type: String,
  },
  document_path: {
    type: String,
  },
  type: {
    type: Number,
    default: 0,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  available: {
    type: Boolean,
    default: false,
  },
  latitude: { type: Number },
  longitude: { type: Number },
  msg: [
    {
      message: {
        type: String,
      },
      locations: {
        start: {
          type: String,
          required: true,
        },
        end: {
          type: String,
          required: true,
        },
      },
      car: {
        name: {
          type: String,
          required: true,
        },
        brand: {
          type: String,
          required: true,
        },
      },
      datetime: {
        date: {
          type: Date,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
        period: {
          type: String,
          required: true,
        },
        estime: {
          type: Number,
          required: true,
        },
      },
      grandtotal: {
        type: Number,
        required: true,
      },
      sender_email: {
        type: String,
        required: true,
      },
    },
  ],
});

const userModel = mongoose.model("userModel", userSchema);

export default userModel;
