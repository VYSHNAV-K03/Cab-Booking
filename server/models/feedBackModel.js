import mongoose from "mongoose";

const feedschema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId to reference the user collection
    ref: "userModel", // Name of the user model
    required: true,
  },
  auto_id: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId to reference the user collection
    ref: "userModel", // Name of the user model
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FeedModel = mongoose.model("FeedModel", feedschema);
export default FeedModel;
