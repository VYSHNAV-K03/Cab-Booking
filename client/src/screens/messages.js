import axios from "axios";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { serverUri } from "../redux/actions";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .container {
    width: 900px;
    background: white;
    font-family: sans-serif;
    border-radius: 15px;
  }
  .each_msg {
    padding: 10px;
    border-bottom: 2px solid grey;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .button_notify {
    position: absolute;
    right: 0;
    top: 40px;
    margin: auto 0;
    padding: 8px 10px;
    background: green;
    color: white;
    border-radius: 10px;
    cursor: pointer;
  }
  .msg_title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .locations {
    display: flex;
  }
  .start,
  .to {
    margin-right: 15px;
  }
  .sender {
    margin-bottom: 10px;
  }
  .date {
    font-size: 0.7rem;
    font-weight: bold;
    margin-left: auto;
  }
`;

const Messages = ({ messages, type, token }) => {
  console.log("user messages", messages);

  const [loading, setLoading] = useState(false);
  const notifiedEmails = useRef(new Set()); // Keeps track of notified emails

  const notifyCustomer = async (email) => {
    if (notifiedEmails.current.has(email)) {
      window.alert("Customer has already been notified.");
      return;
    }

    try {
      setLoading(true);
      
      await axios.post(
        serverUri + "/notify_customer",
        { email },
        {
          headers: {
            token,
            "Content-type": "application/json",
          },
        }
      );

      window.alert("Notified successfully");
      notifiedEmails.current.add(email); // Store notified email
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Filter out duplicate messages based on sender email
  const uniqueMessages = messages
    ? messages.filter(
        (msg, index, self) =>
          index === self.findIndex((m) => m.sender_email === msg.sender_email)
      )
    : [];

  return (
    <Container>
      <div className="container">
        {uniqueMessages
          .map((msg) => (
            <div key={msg.sender_email} className="each_msg">
              {type === 1 && (
                <div
                  className="button_notify"
                  onClick={() => notifyCustomer(msg.sender_email)}
                >
                  Notify
                </div>
              )}
              <div className="date">{msg?.datetime?.date}</div>
              <div className="msg_title">{msg?.message}</div>
              <div className="sender">From: {msg?.sender_email}</div>
              {type === 1 && msg?.locations && (
                <div className="locations">
                  <div className="start">{msg?.locations?.start}</div>
                  <div className="to">To</div>
                  <div className="end">{msg?.locations?.end}</div>
                </div>
              )}
            </div>
          ))
          .reverse()}
      </div>
    </Container>
  );
};

export default Messages;
