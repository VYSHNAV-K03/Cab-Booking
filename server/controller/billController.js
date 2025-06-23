import BillModel from "../models/billModel.js";
import FeedModel from "../models/feedBackModel.js";
import userModel from "../models/userModel.js";
import videoModel from "../models/videoModel.js";

const createBill = async (req, res) => {
  const { locations, car, grandtotal, token, datetime } = req.body;

  console.log({ locations, car, grandtotal, token, datetime });

  console.log(req.body);

  try {
    // if(datetime.time!=="undefined:undefined")
    const bills = await BillModel.find({ email: token.email });

    console.log(bills.length);

    if (bills.length <= 0) {
      let newBill = new BillModel();
      newBill.locations = locations;
      newBill.car = car;
      newBill.status = "completed";
      newBill.grandtotal = grandtotal;
      newBill.email = token.email;
      newBill.datetime = datetime;
      await newBill.save();

      console.log(newBill);

      await userModel.findOneAndUpdate(
        { email: car.name },
        {
          $push: {
            msg: {
              message: "You have a booking",
              sender_email: token.email,
              locations: locations,
              car: car,
              grandtotal: grandtotal,
              datetime: datetime,
            },
          },
        }
      );
      res
        .status(200)
        .json({ msg: "Cab booking successfull, have a happy ride" });
    } else {
      res.status(400).json({ msg: "You have already booked a cab" });
    }
  } catch (error) {
    res.status(400).json({ msg: "create bill error" });
  }
};

const getBill = (req, res) => {
  const { token } = req.body;

  try {
    BillModel.find({ email: token.email }).then((bill) => {
      if (bill.length <= 0) {
        res.status(404).json({ msg: "You haven't booked a cab" });
      } else {
        console.log(bill);
        res.status(200).json(bill);
      }
    });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const getBillCab = (req, res) => {
  const { token } = req.body;
  const userid = req.user._id;

  console.log("getbillcab", token);

  try {
    BillModel.find({ "car.brand": userid }).then((bill) => {
      if (bill.length <= 0) {
        res.status(404).json({ msg: "You haven't booked a cab" });
      } else {
        res.status(200).json(bill);
      }
    });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const updateRideStatus = async (req, res) => {
  try {
    const { id, status } = req.params;

    // Validate status
    if (!["start", "end"].includes(status)) {
      return res.status(400).json({ msg: "Invalid ride status" });
    }

    // Update the ride status
    const updatedRide = await BillModel.findByIdAndUpdate(
      id,
      { status: status === "start" ? "ongoing" : "completed" }, // Update ride state
      { new: true }
    );

    if (!updatedRide) {
      return res.status(404).json({ msg: "Ride not found" });
    }

    res
      .status(200)
      .json({ msg: `Ride ${status}ed successfully`, ride: updatedRide });
  } catch (error) {
    console.error("Error updating ride status:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

const videoUpload = async (req, res) => {
  try {
    const { rideId } = req.body;
    const videoPath = req.file.path;

    console.log("Ride ID:", rideId);
    console.log("Video Path:", videoPath);

    // Fetch ride details from the primary database
    const ride = await BillModel.findById(rideId);
    if (!ride) {
      return res.status(404).json({ error: "Ride not found" });
    }

    // Save video details in the secondary database
    const newVideo = new videoModel({
      rideId: ride._id,
      email: ride.car.name,
      startLocation: ride.locations.start,
      endLocation: ride.locations.end,
      status: ride.status,
      videoUrl: videoPath,
    });

    await newVideo.save();

    console.log(newVideo);

    res
      .status(200)
      .json({ message: "Video uploaded and saved successfully", videoPath });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ error: "Failed to upload video" });
  }
};

const getVideo = async (req, res) => {
  try {
    const videos = await videoModel.find();
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

const cancelBill = async (req, res) => {
  const autoid = req.params.id;

  console.log(autoid);

  try {
    console.log(req.body.token.email);

    const response = await BillModel.deleteMany({
      email: req.body.token.email,
    });

    await userModel.findOneAndUpdate(
      { _id: autoid },
      {
        $push: {
          msg: {
            message: "Booking cancelled",
            sender_email: req.body.token.email,
          },
        },
      }
    );

    res.status(201).json({ msg: "Your booking has been canceled" });
  } catch (error) {
    res.status(400).json({ msg: "error" });
  }
};

const feedBack = async (req, res) => {
  const { autoid, feedback, token } = req.body;

  console.log({ autoid, feedback });
  try {
    let newFeedBack = new FeedModel();
    newFeedBack.user = req.user._id;
    newFeedBack.auto_id = autoid;
    newFeedBack.feedback = feedback;

    console.log(newFeedBack);

    await newFeedBack.save();

    res.status(201).json({ msg: "Your Feedback Added" });
  } catch (error) {
    res.status(400).json({ msg: "something went wrong" });
  }
};

const getFeedback = async (req, res) => {
  const auto_id = req.params.auto_id;

  console.log(auto_id);
  try {
    const feedBack = await FeedModel.find({ auto_id: auto_id }).populate(
      "user"
    );
    res.status(200).send(feedBack);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

export {
  createBill,
  getBill,
  videoUpload,
  getVideo,
  cancelBill,
  feedBack,
  getFeedback,
  getBillCab,
  updateRideStatus,
};
