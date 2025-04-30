import React from "react";
import Upper from "./Upper";
import MessageIn from "./MessageIn";
import MessageOut from "./MessageOut";
import MessagesChat from "./MessagesChat";
import SendMessage from "./SendMessage";

const UserKaChat = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="shrink-0">
        <Upper />
      </div>
      <div className="flex-1 overflow-y-auto">
        <MessagesChat />
      </div>
      <div className="shrink-0">
        <SendMessage />
      </div>
    </div>
  );
};

export default UserKaChat;
