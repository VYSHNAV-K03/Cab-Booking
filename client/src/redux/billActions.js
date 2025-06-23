import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

let serverUri = "http://localhost:4000";

let token = window.localStorage.getItem("token");


export const createBill =
  ({ locations, car, datetime, grandTotal, image, navigate, setErrMsg }) =>
  async (dispatch) => {
    try {
      console.log({
        locations: locations,
        car: car,
        datetime: datetime,
        grandtotal: grandTotal,
        image: image,
      });
      dispatch({ type: "createBillRequest" });

      const msg = await axios.post(
        serverUri + "/createbill",
        {
          locations: locations,
          car: car,
          datetime: datetime,
          grandtotal: grandTotal,
          image: image,
        },
        {
          headers: {
            token: token,
            "Content-type": "application/json",
          },
        }
      );
      dispatch({
        type: "createBillSuccess",
        msg: msg.data.msg,
      });

      navigate("/booking");
    } catch (error) {
      dispatch({
        type: "createBillFailed",
        err: error.response.data.msg,
      });
      // window.alert(error.response.data.msg);
      setErrMsg(error.response.data.msg);
    }
  };

export const getBill = () => async (dispatch) => {
  try {
    let bill = await axios.get(serverUri + "/getbill", {
      headers: {
        token: token,
        "Content-type": "application/json",
      },
    });
    
    dispatch({
      type: "getBillSuccess",
      bill: bill.data[0],
    });
  } catch (error) {
    dispatch({
      type: "getBillFailed",
      err: error.response.data.msg,
    });
  }
};

export const cancelBooking = (autoid) => async (dispatch) => {
  console.log("cancel bill", { autoid });
  try {
    let msg = await axios.delete(serverUri + `/cancelbill/${autoid}`, {
      headers: {
        token: token,
        "Content-type": "application/json",
      },
    });
    dispatch({
      type: "cancelBillSuccess",
      msg: msg.data.msg,
    });

    window.location.reload();
  } catch (error) {
    dispatch({
      type: "cancelBillFailed",
      err: error.response.data.msg,
    });
  }
};
