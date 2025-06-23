import React, { useEffect, useState } from "react";
import { serverUri } from "../redux/actions";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  background-color: #effdf5;

  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  font-family: Arial, sans-serif;
  text-align: center;
`;

const RideList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const RideCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  text-align: left;
`;

const Video = styled.video`
  width: 100%;
  border-radius: 8px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const RideVideos = ({ token }) => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    getRideVideos();
  }, []);

  const getRideVideos = async () => {
    try {
      const { data } = await axios.get(serverUri + `/rides-with-videos`, {
        headers: {
          token: token,
        },
      });
      setRides(data);
    } catch (error) {
      console.error("Error fetching ride videos:", error);
    }
  };

  return (
    <Container>
      <h2>🎥 Ride Videos</h2>
      {rides.length > 0 ? (
        <RideList>
          {rides.map((ride) => (
            <RideCard key={ride._id}>
              <p>
                <strong>Customer:</strong> {ride.email}
              </p>
              <p>
                <strong>Start:</strong> {ride.startLocation}
              </p>
              <p>
                <strong>End:</strong> {ride.endLocation}
              </p>
              <p>
                <strong>Status:</strong> {ride.status}
              </p>
              {ride.videoUrl ? (
                <Video controls>
                  <source
                    src={`${serverUri}/${ride.videoUrl}`}
                    type="video/webm"
                  />
                  Your browser does not support the video tag.
                </Video>
              ) : (
                <p>No Video Available</p>
              )}
            </RideCard>
          ))}
        </RideList>
      ) : (
        <p>No Ride Videos Found</p>
      )}
    </Container>
  );
};

export default RideVideos;
