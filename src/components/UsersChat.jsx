import React, { useContext, useEffect } from "react";
import useConversation from "../stateManagement/useConversation";
import { useSocketContext } from "../contexts/socket/SocketContext";

const UsersChat = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers, socket } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`w-full hover:bg-slate-800 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="w-full py-5 px-7 flex hover:bg-slate-800 rounded items-center">
        <div className="relative">
          <img
            src={user.profilePic}
            className="w-14 h-14 object-cover rounded-full"
            alt=""
          />
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>
        <div className="ml-6">
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-gray-500">{user.username}</p>
        </div>
      </div>
    </div>
  );
};

export default UsersChat;
