import Map from "../Map/Map";
import Analytics from "../Analytics/Analytics";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ExploreData from "../ExploreData/ExploreData";
import "./Analytics_page.css";
import axios from "axios";

import baseUrl from '../../baseUrl';

const baseURL = baseUrl

// const baseURL = "http://localhost:3001";

const api = axios.create({
  baseURL: baseURL,
});

const Loading = () => {
  return (
    <div className="loadingContainer">
      <div className="dot dot1"></div>
      <div className="dot dot2"></div>
      <div className="dot dot3"></div>
    </div>
  );
};

const Analytics_page = ({ distinctVariables }) => {
  const [chatopen, setChatOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  // const sendMessage = async () => {
  //   if (!message.trim()) {
  //     console.log("No message to send");
  //     return;
  //   }

  //   try {
  //     const response = await api.post('/api/chat', { message });
  //     setConversation([...conversation, { user: message, reply: response.data.reply }]);
  //     console.log(response.data.reply);
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //     // Optionally handle the error, e.g., display a message to the user
  //   }

  //   // Clear the message input after sending
  //   setMessage('');

  // };

  const sendMessage = async () => {
    if (!message.trim()) {
      console.log("No message to send");
      return;
    }

    // Add user's message to conversation with a loading placeholder for the reply
    const newMessage = { user: message, reply: <Loading />, loading: true };
    const newConversation = [...conversation, newMessage];
    setConversation(newConversation);
    setMessage("");

    try {
      const response = await api.post("/api/chat", { message });
      // Update the conversation with the actual reply
      const updatedConversation = newConversation.map((msg) =>
        msg === newMessage
          ? { ...msg, reply: response.data.reply, loading: false }
          : msg
      );
      setConversation(updatedConversation);
    } catch (error) {
      console.error("Error sending message:", error);
      // Optionally handle the error, e.g., display a message to the user
    }
  };

  const [dataSelections, setDataSelections] = useState([
    {
      selectedData: "INCOME",
      selectedDataName: "Household Income",
      selectedDistributionName: "Age",
      selectedDistribution: "AGECL",
      secondarySelectedDistribution: "None",
      secondarySelectedDistributionName: "None",
      selectedDisplay: [{ label: "35 <", value: 1 }],
      secondarySelectedDisplay: [{ label: "None", value: "None" }],
    },
  ]);

  const [uniqueValues, setUniqueValues] = useState([
    [
      {
        label: "less than 35",
        value: 1,
      },
      { label: "35-44", value: 2 },
      { label: "45-54", value: 3 },
      { label: "55-64", value: 4 },
      { label: "65-74", value: 5 },
      { label: "more than 75", value: 6 },
    ],
  ]);

  return (
    <>
      <div
        className="chatroom"
        style={
          chatopen
            ? {}
            : {
                height: "4rem",
                width: "5rem",
                overflow: "hidden",
                backgroundColor: "#0E518E",
              }
        }
      >
        <h1 style={chatopen ? {} : { display: "none" }}>SCF Helper Beta</h1>
        <h1
          onClick={() => setChatOpen(!chatopen)}
          style={
            chatopen
              ? {}
              : {
                  backgroundColor: "#0E518E",
                  borderRadius: 0,
                  color: "#FDFFFC",
                }
          }
        >
          {chatopen ? "-" : "+"}
        </h1>
        <div className="wrapper" style={chatopen ? {} : { display: "none" }}>
          <div className="message">
            {conversation.length === 0 && <h2>How can I help you today?</h2>}
            {conversation.length === 0 && (
              <div className="starter">
                <p
                  onClick={() => {
                    setMessage("Does scf have data about savings account?");
                    sendMessage();
                  }}
                >
                  Does scf have data about savings account?
                </p>
                <p
                  onClick={() => {
                    setMessage(
                      "What is the average income among people who are younger than 35 years old?"
                    );
                    sendMessage();
                  }}
                >
                  What is the average income among people who are younger than
                  35 years old?
                </p>
              </div>
            )}
            {conversation.map((m, index) => (
              <div key={index} className="messagediv">
                <div className="user">
                  <span>You</span>
                  <p>{m.user}</p>
                </div>
                <div className="assistant">
                  <span>SCF Helper</span>
                  <p>{m.reply}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="inputdiv">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Message SCF Helper..."
            />
            <button type="submit" onClick={sendMessage}>
              Ask
            </button>
          </div>
        </div>
      </div>

      <div className="analytics_page_container">
        <div className="analytics_page_map_container">
          <Map
            distinctVariables={distinctVariables}
            dataSelections={dataSelections}
            setDataSelections={setDataSelections}
            uniqueValues={uniqueValues}
            setUniqueValues={setUniqueValues}
          />
        </div>
        <div className="analytics_page_analytics_container">
          <Analytics
            dataSelections={dataSelections}
            setDataSelections={setDataSelections}
            uniqueValues={uniqueValues}
            setUniqueValues={setUniqueValues}
          />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Analytics_page;
