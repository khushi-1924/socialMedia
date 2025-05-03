import React from "react";

const MessageIn = ({ message }) => {
  return (
    <div className="flex justify-start gap-2.5 p-1">
      <div className="flex flex-col max-w-[400px] p-3 rounded-r-2xl rounded-bl-2xl bg-teal-900 relative">
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

export default MessageIn;
