import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import "../bill.css";

export default function Navbar({ type, id }) {
  const [clicked, setClicked] = useState(false);
  const [popup, setPopup] = useState(false);

  const navigate = useNavigate();

  const token = window.localStorage.getItem("token");
  return (
    <div>
      <div
        className="hoverBtn"
        data-clicked={clicked}
        onClick={() => setClicked(!clicked)}
      >
        <ion-icon name="grid-outline" color="white" className="ico"></ion-icon>
      </div>
      <div className="navbar">
        <p className="title" onClick={() => navigate("/")}>
          CAB BOOKING
        </p>
        <div className="other">
          <Link to="/map" className="nav" onClick={() => setClicked(!clicked)}>
            <div className="navIcon">
              <ion-icon name="map-outline"></ion-icon>
            </div>
            {type == 0 ? "Show Map" : "Home"}
          </Link>
          {type == 0 ? (
            <Link
              to="/booking"
              className="nav"
              onClick={() => setClicked(!clicked)}
            >
              <div className="navIcon">
                <ion-icon name="ticket-outline"></ion-icon>
              </div>
              My Bookings
            </Link>
          ) : null}
          {type == 1 &&(
            <Link
              to="/ride"
              className="nav"
              onClick={() => setClicked(!clicked)}
              state={{ id: id }}
            >
              <div className="navIcon">
                <ion-icon name="ticket-outline"></ion-icon>
              </div>
              Ride 
            </Link>
          ) }
          {type == 1 ? (
            <Link
              to="/feedbacks"
              className="nav"
              onClick={() => setClicked(!clicked)}
              state={{ id: id }}
            >
              <div className="navIcon">
                <ion-icon name="ticket-outline"></ion-icon>
              </div>
              FeedBacks
            </Link>
          ) : null}
          <Link
            to="/messages"
            className="nav"
            onClick={() => setClicked(!clicked)}
          >
            <div className="navIcon">
              <ion-icon name="ticket-outline"></ion-icon>
            </div>
            Messages
          </Link>

          {token ? (
            <button
              onClick={() => {
                setPopup(!popup);
                setClicked(!clicked);
              }}
              className="cta"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setClicked(!clicked)}
                className="cta"
                style={{ textDecoration: "none" }}
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setClicked(!clicked)}
                className="cta"
                style={{ textDecoration: "none" }}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      {clicked ? (
        <div className="clickablearea" onClick={() => setClicked(!clicked)} />
      ) : null}
      {popup ? (
        <div className="popupBg">
          <div className="popup">
            <div className="circle">
              <ion-icon name="alert-outline"></ion-icon>
            </div>
            <p className="phead">Logout</p>
            <p className="psub">Are you sure, you wanna logout ?</p>
            <div className="buttonContainer">
              <button className="btn outline" onClick={() => setPopup(!popup)}>
                Cancel
              </button>
              <button
                onClick={() => {
                  setPopup(!popup);
                  window.localStorage.removeItem("token");
                  setTimeout(() => {
                    window.location.reload();
                  }, [2000]);
                }}
                className="btn"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
