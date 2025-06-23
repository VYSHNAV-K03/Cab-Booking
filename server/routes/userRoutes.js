import express from "express";
import {
  cancelBill,
  createBill,
  feedBack,
  getBill,
  getBillCab,
  getFeedback,
  getVideo,
  updateRideStatus,
  videoUpload,
} from "../controller/billController.js";
import {
  availableAuto,
  deleteAuto,
  downloadDocument,
  getAllAuto,
  getAllUser,
  getAutoAdmin,
  getCabLocation,
  getMsg,
  getUser,
  loginUser,
  notifyCustomer,
  sendOtp,
  signUpAuto,
  signUpUser,
  verifyAuto,
  verifyOtp,
} from "../controller/userController.js";
import { upload } from "../helpers/filehelper.js";
import AuthMiddleWare from "../middleware/authMiddleware.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const userRoutes = express.Router();

const otpStorage = new Map(); // Temporary storage for OTPs

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);
console.log("hello");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey", // SendGrid requires "apikey" as the user
    pass: process.env.SENDGRID_API_KEY, // Use API Key from .env file
  },
});

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Endpoint to send verification code
userRoutes.post("/send-verification", async (req, res) => {
  const { email, rideId, otp } = req.body;

  if (!email || !rideId) {
    return res.status(400).json({ message: "Email and Ride ID are required." });
  }

  try {
    const verificationCode = generateVerificationCode();

    // Store the code in the ride document (if needed)

    // Send email
    const mailOptions = {
      from: "amarnathappu891@gmail.com", // Use a verified email in SendGrid
      to: email,
      subject: "Your Ride Verification Code",
      text: `Your ride verification code is: ${otp}`,
      html: `<p>Your ride verification code is: <b>${otp}</b></p>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Verification code sent successfully!" });
  } catch (error) {
    console.error("Error sending verification code:", error);
    res.status(500).json({ message: "Failed to send verification code" });
  }
});

userRoutes.post("/send-otp", sendOtp);
userRoutes.post("/verify-otp", verifyOtp);
userRoutes.post("/signup", signUpUser);
userRoutes.post("/signup_auto", upload.single("autodoc"), signUpAuto);

userRoutes.get("/get_cab_location/:cabId", getCabLocation);

userRoutes.post("/login", loginUser);

userRoutes.post("/createbill", AuthMiddleWare, createBill);
userRoutes.get("/getbill", AuthMiddleWare, getBill);

userRoutes.post("/feedback", AuthMiddleWare, feedBack);
userRoutes.get("/getfeedbacks/:auto_id", AuthMiddleWare, getFeedback);

userRoutes.get("/getuser", AuthMiddleWare, getUser);
userRoutes.get("/getmsgs", AuthMiddleWare, getMsg);
userRoutes.post("/notify_customer", AuthMiddleWare, notifyCustomer);

userRoutes.get("/getalluser", AuthMiddleWare, getAllUser);
userRoutes.get("/getallauto/:place", AuthMiddleWare, getAllAuto);

userRoutes.get("/get_auto_admin", AuthMiddleWare, getAutoAdmin);
userRoutes.post("/verify_auto", AuthMiddleWare, verifyAuto);
userRoutes.delete("/delete_auto/:auto_id", AuthMiddleWare, deleteAuto);
userRoutes.post("/download", AuthMiddleWare, downloadDocument);

userRoutes.delete("/cancelbill/:id", AuthMiddleWare, cancelBill);
userRoutes.post("/available", AuthMiddleWare, availableAuto);

userRoutes.post("/rides", AuthMiddleWare, getBillCab);
userRoutes.patch("/rides/:status/:id", updateRideStatus);

userRoutes.post("/ridess", AuthMiddleWare, (req, res) => {
  console.log("hello");
});

// Video Upload Route
userRoutes.post("/upload-video", upload.single("video"), videoUpload);
userRoutes.get("/rides-with-videos", getVideo);

export default userRoutes;
