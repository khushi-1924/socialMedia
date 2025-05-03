import React from "react";

const MessageOut = ({ message }) => {
  return (
    <div className="flex justify-end gap-2.5 p-1">
      <div className="flex flex-col max-w-[400px] p-3 rounded-l-2xl rounded-br-2xl bg-blue-600 relative">
        <p className="text-sm font-normal text-white pr-12">
          {message.message}
        </p>

        <div className="absolute bottom-2 right-2 flex items-center gap-1">
          <span className="text-[10px] text-gray-400">
            {new Date(message.createdAt).toLocaleTimeString("en-IN", {
              timeZone: "Asia/Kolkata",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageOut;
