import React, { useContext, useEffect, useRef } from "react";
import MessageIn from "./MessageIn";
import MessageOut from "./MessageOut";
import MessageContext from "../contexts/messages/MessageContext";
import hello from "../assets/hello.gif";
import UserContext from "../contexts/users/UserContext";
import useGetSocketMessage from '../contexts/socket/useGetSocketMessage';

const MessagesChat = () => {
  const { user } = useContext(UserContext);
  const { messages = [], loading } = useContext(MessageContext);
  useGetSocketMessage();

  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef) {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);
  return (
    <div className="h-full">
      {loading ? (
        <div className="w-full h-[40px] flex items-center justify-center">
          <span className="loader mt-20"></span>
        </div>
      ) : (
        messages?.length > 0 &&
        messages.map((message, index) =>
          message.senderId === user?._id ? (
            <div key={message._id || index} ref={lastMessageRef}>
              <MessageOut message={message} />
            </div>
          ) : (
            <div key={message._id || index} ref={lastMessageRef}>
              <MessageIn message={message} />
            </div>
          )
        )
        
        // messages.map((message) =>
        //   message.senderId === user?._id ? (
        //     <div key={message._id} ref={lastMessageRef}>
        //       <MessageOut message={message} />
        //     </div>
        //   ) : (
        //     <div key={message._id} ref={lastMessageRef}>
        //       <MessageIn message={message} />
        //     </div>
        //   )
        // )
      )}
      {!loading && messages?.length === 0 && (
        <div className="h-full flex flex-col justify-center items-center ">
          <p className="text-xl ">no messages. say hi to start conversation</p>
          <img src={hello} alt="" />
        </div>
      )}
    </div>
  );
};

export default MessagesChat;
