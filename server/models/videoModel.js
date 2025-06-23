import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  rideId: { type: mongoose.Schema.Types.ObjectId, ref: "BillModel" },
  email: String,
  startLocation: String,
  endLocation: String,
  status: String,
  videoUrl: String,
  createdAt: { type: Date, default: Date.now },
});

const videoModel = mongoose.model("videoModel", videoSchema);

export default videoModel;
