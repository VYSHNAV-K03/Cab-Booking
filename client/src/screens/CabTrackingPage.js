import { useLocation, useNavigate, useParams } from "react-router-dom";
import CabMap from "../components/CabMap";

const CabTrackingPage = () => {
  const { cabid } = useParams();
  const navigate = useNavigate(); // Hook for navigation

  console.log(cabid);

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        ⬅ Back
      </button>
      <h2>Cab Live Location</h2>
      {/* i want a bootstrap button here  */}

      <CabMap cabId={cabid} />
    </div>
  );
};

export default CabTrackingPage;
