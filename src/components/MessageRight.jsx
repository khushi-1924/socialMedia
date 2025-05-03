import React from "react";
import UserKaChat from "./UserKaChat";
import useConversation from "../stateManagement/useConversation";

const MessageRight = () => {
  const { selectedConversation } = useConversation();
  return (
    <div className="w-[70%] h-full text-white bg-slate-950">
      {!selectedConversation ? (
        <div className="h-full flex justify-center items-center">
          <h1 className="text-2xl font-semibold text-gray-600">
            no chat selected. select a chat to view its messages
          </h1>
        </div>
      ) : (
        <div className="w-full h-full">
          <UserKaChat />
        </div>
      )}
    </div>
  );
};

export default MessageRight;
