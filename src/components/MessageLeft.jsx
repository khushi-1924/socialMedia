import React, { useContext } from "react";
import LeftSearchChat from "./LeftSearchChat";
import UsersChat from "./UsersChat";
import UserContext from "../contexts/users/UserContext";

const MessageLeft = () => {
  const context = useContext(UserContext);
  const { users } = context;
  return (
    <div className="w-[30%] h-full text-white bg-slate-900">
      <p className="text-4xl text-sky-100 px-5 font-semibold p-2">Chats</p>
      <LeftSearchChat />
      <hr />
      <div className="classUsersList flex flex-col overflow-y-auto h-[77%]">
        {users.map((user) => (
          <UsersChat key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default MessageLeft;
