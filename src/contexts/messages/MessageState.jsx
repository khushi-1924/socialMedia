import React, { useEffect, useState } from "react";
import MessageContext from "./MessageContext";
import useConversation from "../../stateManagement/useConversation";

const MessageState = (props) => {
  const host = "http://localhost:3000";
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  // to get all messages of a conversation between two users
  const getMessages = async () => {
    setLoading(true);
    if (selectedConversation && selectedConversation._id) {
      try {
        const response = await fetch(
          `${host}/api/message/getMessages/${selectedConversation._id}`,
          {
            method: "GET",
            headers: {
              "auth-token": localStorage.getItem("authToken"),
            },
          }
        );
        const data = await response.json();
        setMessages(data.messages);
        setLoading(false);
      } catch (error) {
        console.log("error in getmessage function", error);
      }
    }
  };

  // to send messages in a conversation between two users
  const sendMessages = async (message) => {
    if (selectedConversation && selectedConversation._id) {
      try {
        const response = await fetch(
          `${host}/api/message/sendMessage/${selectedConversation._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("authToken"),
            },
            body: JSON.stringify({message}),
          }
        );
        const data = await response.json();
        setMessages([...messages, data.messageData]);
      } catch (error) {
        console.log("error in sendmessage function", error);
      }
    }
  };

  useEffect(() => {
    getMessages();
  }, [selectedConversation, setMessages]);

  return (
    <MessageContext.Provider
      value={{
        messages,
        loading,
        sendMessages,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageState;
