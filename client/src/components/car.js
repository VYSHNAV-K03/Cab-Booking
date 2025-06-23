import "../App.css";
import { useSelector } from "react-redux";

export default function Car({
  details,
  setState,
  setSelectedBrand,
  setautoNumber,
}) {
  const { totalDistance, pricePerKm } = useSelector(
    (state) => state.mapReducer
  );

  console.log("total distance", totalDistance);

  return (
    <div className="carCard">
      <div className="imageContainer">
        <img
          className="carImg"
          src={
            "https://5.imimg.com/data5/GI/AQ/NU/ANDROID-96578473/product-jpeg-500x500.jpeg"
          }
        />
      </div>
      <div className="details">
        <div>
          <p className="name">3 Seater</p>
          <p className="brand">Auto Number:{details.email}</p>
          <p className="brand">
            Cab Charges:{" "}
            <span style={{ fontWeight: 600, fontSize: 15 }}>15</span> /-
          </p>
          <p className="brand">
            Estimated price:{" "}
            <span style={{ fontWeight: 600, fontSize: 15 }}>
              {(totalDistance * pricePerKm + 15).toFixed(1)}
            </span>{" "}
            /-
          </p>
        </div>
        <div className="tag">
          {details.available ? "available" : "not available"}
        </div>
      </div>
      <button
        className="btn"
        onClick={() => {
          setState(true);
          setSelectedBrand(details._id);
          setautoNumber(details.email);
        }}
      >
        Order Cab
      </button>
    </div>
  );
}
