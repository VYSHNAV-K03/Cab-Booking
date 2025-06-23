import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { serverUri } from "../redux/actions";
import cabimg from "../assets/Taigun.jpg";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;

  .carCard {
    width: 500px;
    background: #ffffff;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }
  .carCard:hover {
    transform: scale(1.08);
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
  }
  .imageContainer {
    height: 350px;
    overflow: hidden;
    border-bottom: 3px solid #ddd;
  }
  .carImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .details_1 {
    font-family: "Poppins", sans-serif;
    padding: 25px;
  }
  .name_status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .name_1 {
    font-size: 28px;
    font-weight: bold;
    color: #333;
  }
  .brand_1 {
    font-size: 18px;
    color: #666;
    margin: 8px 0;
  }
  .num {
    font-weight: bold;
    color: #222;
  }
  .avail_btn {
    background: ${(props) => (props.avail ? "#28a745" : "#dc3545")};
    border: none;
    outline: none;
    padding: 12px 20px;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  .avail_btn:hover {
    background: ${(props) => (props.avail ? "#218838" : "#c82333")};
  }
  .location_btn {
    background: #007bff;
    border: none;
    outline: none;
    padding: 14px 22px;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
    margin-top: 15px;
    width: 100%;
    text-align: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  .location_btn:hover {
    background: #0056b3;
  }
`;

const Cartype1 = ({ number, place, phone, avail, token, cabid }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeAvail = async () => {
    try {
      setLoading(true);
      await axios.post(
        serverUri + "/available",
        { avail: !avail },
        { headers: { token, "Content-type": "application/json" } }
      );
      window.location.reload();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <Container avail={avail}>
      <div className="carCard">
        <div className="imageContainer">
          <img className="carImg" src={cabimg} alt="Cab" />
        </div>
        <div className="details_1">
          <div className="name_status">
            <p className="name_1">3 Seater</p>
            {loading ? (
              <span>Loading...</span>
            ) : (
              <button onClick={changeAvail} className="avail_btn">
                {avail ? "Available" : "Not Available"}
              </button>
            )}
          </div>
          <p className="brand_1">Ape Compact Auto</p>
          <p className="brand_1">
            Auto Number: <span className="num">{number}</span>
          </p>
          <p className="brand_1">
            Phone: <span className="num">{phone}</span>
          </p>
          <p className="brand_1">
            Place: <span className="num">{place}</span>
          </p>
          <button
            onClick={() => navigate(`/cablocation/${cabid}`)}
            className="location_btn"
          >
            Get Location
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Cartype1;
