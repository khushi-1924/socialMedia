import React, { useContext } from "react";
import useConversation from "../stateManagement/useConversation";
import UserContext from "../contexts/users/UserContext";
import { useSocketContext } from "../contexts/socket/SocketContext";

const Upper = () => {
  const { selectedConversation } = useConversation();
  const { onlineUsers, socket } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedConversation._id);

  return (
    <div className="w-full bg-slate-900 border-l border-l-gray-700">
      <div className="w-full py-2 px-7 flex rounded items-center">
        <div className="relative">
          <img
            src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
            className="w-12 h-12 object-cover rounded-full"
            alt=""
          />
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>
        <div className="ml-6">
          <p className="text-lg">{selectedConversation?.name}</p>
          <p className="text-sm text-gray-400">{selectedConversation?.username}</p>
        </div>
      </div>
    </div>
  );
};

export default Upper;
