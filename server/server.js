import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import cabRoutes from "./routes/cabRoutes.js";
import dotenv from "dotenv";
import path from "path";
import bodyParser from "body-parser";
import userModel from "./models/userModel.js";

dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let PORT = process.env.PORT || 4000;
let MONGOURI = process.env.DB;

app.use("/", userRoutes);

app.use("/uploads", express.static(path.join("uploads")));


app.get('/', async(req,res) => {
  const user = await userModel.find()
  res.send(user)
})

mongoose
  .connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log("server started at port", PORT);
      
    });
  });
