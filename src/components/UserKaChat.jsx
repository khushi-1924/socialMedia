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
      <div
        className="flex-1 overflow-y-auto bg-cover bg-center bg-repeat-y"
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/thumbnails/003/042/243/small/abstract-blue-grunge-texture-background-free-vector.jpg')",
        }}
      >
        <MessagesChat />
      </div>
      <div className="shrink-0">
        <SendMessage />
      </div>
    </div>
  );
};

export default UserKaChat;
