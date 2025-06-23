import React, { useEffect, useState } from "react";
import { serverUri } from "../redux/actions";
import axios from "axios";
import styled from "styled-components";
import FileDownload from "js-file-download";
import { useNavigate } from "react-router-dom";

import delete_img from "../assets/delete_icon.png";

const Container = styled.div`
  padding: 20px;
  .carCard {
    position: relative;
  }
  .delete_image {
    position: absolute;
    right: 0;
    top: 5px;
    width: 40px;
    height: 40px;
    transition: all 0.2s ease-in-out;
    :hover {
      transform: scale(1.2);
    }
  }
  .delete_image img {
    width: 100%;
    height: 100%;
  }
  .doc_download {
    outline: none;
    border: none;
    border-radius: 10px;
    background: blueviolet;
    color: white;
    padding: 4px 8px;
    font-size: 0.7rem;
    margin-left: 5px;
    cursor: pointer;
    font-weight: 600;
  }
  .btnvideo {
    background: linear-gradient(135deg, #ff7eb3, #ff758c);
    color: white;
    padding: 12px 18px;
    border-radius: 25px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
    transition: transform 0.2s ease-in-out, box-shadow 0.3s;
    font-weight: bold;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    }
  }
`;

const Admin = ({ token, details }) => {
  const [autos, setautos] = useState();

  const [document, setdocument] = useState();

  const getAutoAdmin = async () => {
    try {
      let data = await axios.get(serverUri + `/get_auto_admin`, {
        headers: {
          token: token,
          "Content-type": "application/json",
        },
      });

      setautos(data?.data);
    } catch (error) {
      console.log("get auto admin error", error);
    }
  };

  const downloadDoc = async (email) => {
    try {
      const file = await axios.post(
        serverUri + `/download`,
        {
          autonumber: email,
        },
        {
          responseType: "arraybuffer",
          headers: {
            token: token,
          },
        }
      );

      setdocument(file.data);

      FileDownload(file.data, "targe.png");

      // console.log(blfile);
    } catch (error) {
      console.log("download document admin error", error);
    }
  };

  const verifyAuto = async (_id, verify) => {
    try {
      let data = await axios.post(
        serverUri + `/verify_auto`,
        {
          auto_id: _id,
          verify: !verify,
        },
        {
          headers: {
            token: token,
            "Content-type": "application/json",
          },
        }
      );

      window.location.reload();
    } catch (error) {
      console.log("get auto admin error", error);
    }
  };

  const deleteAuto = async (_id) => {
    try {
      await axios.delete(serverUri + `/delete_auto/${_id}`, {
        headers: {
          token: token,
          "Content-type": "application/json",
        },
      });

      window.location.reload();
    } catch (error) {
      console.log("get auto admin error", error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getAutoAdmin();
  }, []);

  return (
    <>
      <button className="btnvideo" onClick={() => navigate("/ride-videos")}>
        🎥 View Ride Videos
      </button>
    <Container>
      {autos &&
        autos.map((details) => (
          <div className="carCard">
            <div
              className="delete_image"
              onClick={() => deleteAuto(details._id)}
            >
              <img src={delete_img} alt="" />
            </div>
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
                <p className="brand">Auto Number: {details.email}</p>
                <p className="brand">Place: {details.place}</p>
                <p className="brand">
                  Cab Charges:{" "}
                  <span style={{ fontWeight: 600, fontSize: 15 }}>15</span> /-
                </p>
                <p className="brand">
                  Document:{" "}
                  <button
                    className="doc_download"
                    onClick={() => {
                      downloadDoc(details.email);
                    }}
                  >
                    download
                  </button>{" "}
                </p>
              </div>
              {/* <div className="tag">
                {details.available ? "available" : "not available"}
              </div> */}
              <div className="tag">
                {details.verify ? "verified" : "not verified"}
              </div>
            </div>
            <button
              className="btn"
              onClick={() => {
                verifyAuto(details._id, details.verify);
              }}
            >
              Change Verification
            </button>
          </div>
        ))}
    </Container>
    </>

  );
};

export default Admin;
