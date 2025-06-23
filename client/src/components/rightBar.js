import "../App.css";
import "./rightbar.css";
import allCars from "./cars";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBill } from "../redux/billActions";
import Notification from "./notification";
import { useNavigate } from "react-router-dom";

export default function RightBar({
  state,
  setState,
  brand,
  estimatedPrice,
  autoNumber,
}) {
  const navigate = useNavigate();

  const details = allCars.filter((car) => car.model === brand);

  const [date, setDate] = useState("");

  const [hrs, setHrs] = useState(null);
  const [mins, setMins] = useState(null);
  const [period, setPeriod] = useState("AM");
  const [errmsg, setErrMsg] = useState("");
  const [errdate, seterrDate] = useState("");
  const [errtime, seterrTime] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  const nightCharges = period === "PM" && hrs > 6 ? 15 + 2 + 2 : 0;
  let grandTotal = parseFloat(estimatedPrice) + 15 + nightCharges;

  const InputRef = useRef();

  const getCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  const intParser = (string) => {
    let parts = string.split("-");
    let Result = parts.map((part) => {
      return parseInt(part);
    });
    return Result;
  };

  const dispatch = useDispatch();
  const { markerDetails, totalTime } = useSelector((state) => state.mapReducer);

  const createBillHanler = () => {
    let currentResult = intParser(getCurrentDate());
    let selectedResult = intParser(date);

    selectedResult.map((res, i) => {
      if (res < currentResult[i] || date === "") {
        seterrDate("Not a Valid Date");
      } else {
        if (hrs > 24 || mins > 60 || !hrs || !mins) {
          seterrTime("Not a Valid Time");
        } else {
          let time = hrs + ":" + mins;
          let locations = {
            start: markerDetails[0].result.p1,
            end: markerDetails[1].result.p1,
          };
          let car = {
            name: autoNumber,
            brand: brand,
          };
          let datetime = {
            date: date,
            time: time,
            period: period,
            estime: Math.ceil(totalTime),
          };

          dispatch(
            createBill({
              locations,
              car,
              datetime,
              grandTotal,
              navigate,
              setErrMsg,
            })
          );
        }
      }
    });
  };
  const { msg, loading } = useSelector((state) => state.billReducer);

  console.log(msg);
  console.log(loading);

  return (
    <div className="barContainer">
      <p className="errmain">{errmsg}</p>
      {msg !== undefined ? <Notification msg={msg} /> : null}
      <div className="close" onClick={() => setState(!state)}>
        <ion-icon name="close-outline" style={{ fontSize: 30 }}></ion-icon>
      </div>
      <div className="rightbar">
        {/* <p className="head">{details[0].model}</p>
        <p className="sub">{details[0].brand}</p> */}
        <div className="tags">
          <div className="tag">AutoRikshaw</div>
          <div className="tag">seats: 3</div>
          <div className="tag">Diesel</div>
        </div>
        <div className="selections">
          <div className="lineContainer">
            <div className="circle" />
            <div className="line" />
            <div className="circle" />
          </div>
          <div className="center">
            <div className="placeContainer">
              <p className="place">{markerDetails[0].result.p1}</p>
              <p className="place">{markerDetails[1].result.p1}</p>
            </div>
          </div>
        </div>
        <div className="inputSection">
          <div className="timeContainer">
            <input
              className="inpt"
              type="text"
              placeholder="Select pickup date"
              ref={InputRef}
              onFocus={() => {
                InputRef.current.type = "date";
              }}
              onBlur={() => {
                InputRef.current.type = "text";
              }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <p className="err">{errdate}</p>
            <div className="current">
              <input className="checkbox" id="checkbox" type="checkbox" />
              <div className="box">
                <ion-icon
                  name="checkmark-outline"
                  style={{ color: "white", fontSize: 11 }}
                ></ion-icon>
              </div>
              <label
                className="label"
                onClick={() => setDate(getCurrentDate())}
                for="checkbox"
              >
                Use Current Date
              </label>
            </div>
          </div>
          <div className="timeContainer">
            <div className="row">
              <div className="dateSelector">
                <p className="label2">Pickup Time</p>
                <input
                  type="number"
                  min="0"
                  max="11"
                  className=""
                  style={{outline:"none",border:"none",background:"none"}}
                  value={hrs}
                  onChange={(e) => setHrs(e.target.value)}
                />
                <p className="colon">:</p>
                <input
                  type="number"
                  min="0"
                  max="59"
                  className=""
                  
                  style={{outline:"none",border:"none",background:"none"}}

                  
                  value={mins}
                  onChange={(e) => setMins(e.target.value)}
                />
              </div>
              <div className="Tsec">
                <div
                  className="item"
                  style={{
                    background: period === "AM" ? "grey" : "",
                    cursor: "pointer",
                  }}
                  onClick={() => setPeriod("AM")}
                >
                  AM
                </div>
                <div
                  className="item"
                  style={{
                    background: period === "PM" ? "grey" : "",
                    cursor: "pointer",
                  }}
                  onClick={() => setPeriod("PM")}
                >
                  PM
                </div>
              </div>
            </div>
            <p className="err">{errtime}</p>
          </div>
          <div className="total">
            <p className="label">Confirm Details</p>
            <div className="table">
              <div className="row bg">
                <div className="head">Description</div>
                <div className="head">Price</div>
              </div>
              <div className="row">
                <div className="sub">SubTotal</div>
                <div className="sub">{estimatedPrice}/-</div>
              </div>
              <div className="row">
                <div className="sub">Car Charges</div>
                <div className="sub">{15}/-</div>
              </div>
              {period === "PM" && hrs > 6 ? (
                <div className="row">
                  <div className="sub">Extra Charges</div>
                  <div className="sub">{nightCharges}/-</div>
                </div>
              ) : null}
              <div className="row bg">
                <div className="sub">GrandTotal</div>
                <div className="sub">{grandTotal}/-</div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowPayment(true)}
            style={{ backgroundColor: "blueviolet" }}
            className="btn"
          >
            Pay Now
          </button>
        </div>
      </div>
      {showPayment && (
  <div className="paymentModal">
    <div className="modalContent">
      <div className="paymentHeader">
        <h2>Payment Details</h2>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe Logo" className="stripeLogo" />
      </div>
      <p>Total Amount: {grandTotal}/-</p>
      <div className="paymentForm">
        <label>Card Number</label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          maxLength="19"
          className="inputField"
        />
        <label>Cardholder Name</label>
        <input
          type="text"
          placeholder="John Doe"
          className="inputField"
        />
        <div className="cardDetails">
          <div>
            <label>Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              maxLength="5"
              className="inputField"
            />
          </div>
          <div>
            <label>CVV</label>
            <input
              type="password"
              placeholder="123"
              maxLength="3"
              className="inputField"
            />
          </div>
        </div>
      </div>
      <button 
        onClick={() => createBillHanler()}
        className="btn payNowBtn">
        {loading ? (
          <div className="loading" />
        ) : msg !== undefined ? (
          "Success"
        ) : (
          "Pay Now"
        )}
      </button>
      <button onClick={() => setShowPayment(false)} className="btn cancelBtn">Cancel</button>
    </div>
  </div>
)}


    </div>
  );
}
