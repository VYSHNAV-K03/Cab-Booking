import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { serverUri } from "../redux/actions";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  /* background-color: #EFFDF5; */
`;

const FeedbackContainer = styled.div`
  width: 900px;
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const MessageCard = styled.div`
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    border-color: #00B98E;
  }
`;

const MessageTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const SenderInfo = styled.div`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 5px;
`;

const FeedBack = ({ token }) => {
  const [feedback, setFeedback] = useState();
  const location = useLocation();

  const getFeedBack = async () => {
    try {
      const res = await axios.get(
        serverUri + "/getfeedbacks" + `/${location.state.id}`,
        {
          headers: {
            token: token,
            "Content-type": "application/json",
          },
        }
      );
      setFeedback(res.data);
    } catch (error) {
      console.log("get feedback error", error);
    }
  };

  useEffect(() => {
    getFeedBack();
  }, []);

  return (
    <Container>
      <FeedbackContainer>
        {feedback &&
          feedback
            ?.map((msg) => (
              <MessageCard key={msg._id}>
                <MessageTitle>{msg?.feedback}</MessageTitle>
                <SenderInfo>From: {msg?.user.email}</SenderInfo>
              </MessageCard>
            ))
            .reverse()}
      </FeedbackContainer>
    </Container>
  );
};

export default FeedBack;
