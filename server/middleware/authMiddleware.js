import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import userModel from "../models/userModel.js";
dotenv.config();

let WT_SECRET = process.env.WT_SECRET;

export default function AuthMiddleWare(req, res, next) {
  let token = req.headers.token;
  if (token == null || token === "")
    res
      .status(404)
      .json({ err: "Invalid Credintials please try logging in again" });
  else {
    const verifyToken = jwt.verify(token, WT_SECRET,async (err, suc) => {
      if (err)
        res
          .status(400)
          .json({ err: "Invalid Credintials please try logging in again" });
      else {
        req.body.token = suc;
        const user = await userModel.findOne({ email: suc.email }).select("-password"); // Exclude password
        req.user = user;

        console.log("auth", suc);
        next();
      }
    });

    // console.log("verified user id", verifyToken);
  }
}
