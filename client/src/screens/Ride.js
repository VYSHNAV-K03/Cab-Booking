import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Ride.css";
import { serverUri } from "../axios";

const Ride = ({ token }) => {
  const [bookings, setBookings] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [otpMap, setOtpMap] = useState({}); // Store OTPs for each email
  const [rideidchunks, setrideidchunks] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.post(
        serverUri + `/rides`,
        { token: token },
        {
          headers: { token: token },
        }
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Start Video Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      const options = { mimeType: "video/webm; codecs=vp9" }; // Ensure correct codec
      const recorder = new MediaRecorder(stream, options);
      const chunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log(event.data);
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        stopRecordingAndUpload(chunks); // Pass directly to upload
      };

      recorder.start();
      setMediaRecorder(recorder);
    } catch (error) {
      console.error("Error starting video recording:", error);
    }
  };

  // Stop Video Recording and Send to Backend
  const stopRecordingAndUpload = async (chunks) => {
    console.log(chunks);

    if (chunks.length > 0) {
      const videoBlob = new Blob(chunks, { type: "video/webm" });
      console.log(videoBlob);

      const formData = new FormData();
      formData.append("video", videoBlob);
      formData.append("rideId", rideidchunks);

      try {
        await axios.post(`${serverUri}/upload-video`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    }
  };
  // Generate a 6-digit OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendVerificationCode = async (email, rideId) => {
    const otp = generateOTP();
    setOtpMap((prev) => ({ ...prev, [email]: otp })); // Store OTP locally
    try {
      await axios.post(`${serverUri}/send-verification`, {
        email,
        rideId,
        otp,
      });
      alert("Verification code sent to the customer's email.");
    } catch (error) {
      console.error("Error sending verification code:", error);
    }
  };
  const updateRideStatus = async (id, status) => {
    try {
      setrideidchunks(id);
      await axios.patch(serverUri + `/rides/${status}/${id}`);
      if (status === "start") {
        startRecording(); // Start webcam when ride starts
      } else if (status === "end") {
        if (mediaRecorder) {
          mediaRecorder.stop();
          mediaRecorder.stream.getTracks().forEach((track) => track.stop());
        } else {
          console.error("MediaRecorder not initialized.");
        }
      }
      fetchBookings();
    } catch (error) {
      console.error("Error updating ride status:", error);
    }
  };

  return (
    <div className="ride-container">
      <h2>My Rides</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "300px", display: "block", margin: "10px 0" }}
      ></video>
      <table className="ride-table">
        <thead>
          <tr>
            <th>Customer Email</th>
            <th>Start Location</th>
            <th>End Location</th>
            {/* <th>Status</th> */}
            <th>Actions</th>
            <th>OTP</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.email}</td>
              <td>{booking.locations.start}</td>
              <td>{booking.locations.end}</td>
              {/* <td>{booking.status}</td> */}
              <td>
                <button
                  className="start-btn"
                  style={{ marginBottom: "10px" }}
                  onClick={() =>
                    sendVerificationCode(booking.email, booking._id)
                  }
                >
                  Send Verification
                </button>
                {booking.status === "completed" && (
                  <button
                    className="start-btn"
                    onClick={() => updateRideStatus(booking._id, "start")}
                  >
                    Start Ride
                  </button>
                )}
                {booking.status === "ongoing" && (
                  <button
                    className="end-btn"
                    onClick={() => updateRideStatus(booking._id, "end")}
                  >
                    End Ride
                  </button>
                )}
              </td>
              <td>
                {otpMap[booking.email] ? (
                  <strong>{otpMap[booking.email]}</strong>
                ) : (
                  "Not Sent"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ride;
