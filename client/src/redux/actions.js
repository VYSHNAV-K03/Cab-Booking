import axios from "axios";

var markers = [];
var markerDetails = [];
let distance;
let totalTime;
let pricePerKm = 4;

export const serverUri = "http://localhost:4000";

//map actions

export const getAllMarkers = (marker, result, type) => async (dispatch) => {
  if (markers.length < 2) {
    markers = [...markers, { marker: marker, type: type }];
    markerDetails = [...markerDetails, { result: result, type: type }];
  } else {
    let removeableMarkers = markers.filter((obj) => obj.type == type);
    removeableMarkers.map((mar) => {
      mar.marker.remove();
    });

    markers = markers.filter((obj) => obj.type != type);
    markerDetails = markerDetails.filter((obj) => obj.type != type);
    markers = [...markers, { marker: marker, type: type }];
    markerDetails = [...markerDetails, { result: result, type: type }];
  }

  // console.log(markers);
  dispatch({
    type: "getMarkers",
    markers: markers,
    details: markerDetails,
  });
};

export const storeDistanceTime = (totalDis, time) => async (dispatch) => {
  distance = totalDis;
  totalTime = time;
  dispatch({
    type: "getDistance",
    tDistance: distance,
    totalTime: totalTime,
    pricePerKm: pricePerKm,
  });
};

export const removeAllMarkers = () => async (dispatch) => {
  markers = [];
  markerDetails = [];
};

//user actions
export const sendOtp = (email) => async (dispatch) => {
  try {
    await axios.post(serverUri + "/send-otp", { email });
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to send OTP");
  }
};

export const verifyOtp = (email, otp) => async (dispatch) => {
  try {
    await axios.post(serverUri + "/verify-otp", { email, otp });
  } catch (error) {
    throw new Error(error.response.data.message || "Failed to verify OTP");
  }
};
export const signupUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "signupRequest" });

      let msg = await axios.post(
        serverUri + "/signup",
        { email: email, password: password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (msg.data.token != undefined) {
        dispatch({
          type: "signupSuccess",
          msg: msg.data.msg,
        });
      }
    } catch (error) {
      dispatch({
        type: "signupFailed",
        err: error.response.data.err,
      });
    }
  };

export const signupAuto =
  ({ email, password, phone, place, file }) =>
  async (dispatch) => {
    const formData = new FormData();
    formData.append("autonumber", email);
    formData.append("phone", phone);
    formData.append("place", place);
    formData.append("password", password);
    formData.append("autodoc", file);

    // Get the user's current location before sending the request
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);

        try {
          dispatch({ type: "signupRequest" });

          let msg = await axios.post(serverUri + "/signup_auto", formData, {
            headers: {
              "Content-type": "multipart/form-data", // Update content type
            },
          });

          if (msg.data.token !== undefined) {
            dispatch({
              type: "signupSuccess",
              msg: msg.data.msg,
            });
          }
        } catch (error) {
          dispatch({
            type: "signupFailed",
            err: error.response?.data?.err || "Signup failed",
          });
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        dispatch({
          type: "signupFailed",
          err: "Unable to fetch location. Please enable GPS.",
        });
      }
    );
  };

export const signinUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "signinRequest" });

      let msg = await axios.post(
        serverUri + "/login",
        { email: email, password: password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (msg.data.token != undefined) {
        window.localStorage.setItem("token", msg.data.token);
        dispatch({
          type: "signinSuccess",
          msg: msg.data.msg,
        });
      }
      setTimeout(() => (window.location.href = "/cabhome"), 2000);
    } catch (error) {
      dispatch({
        type: "signinFailed",
        err: error.response.data.err,
      });
    }
  };
