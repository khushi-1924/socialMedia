import React from "react";

const MessageOut = () => {
  return (
    <div>
      <div className="flex justify-end gap-2.5 p-4">
        <div className="flex flex-col w-full max-w-[400px] leading-1.5 p-4 rounded-l-xl rounded-br-xl bg-blue-950">
          <div className="flex items-center space-x-2 rtl:space-x-reverse"></div>
          <p className="text-sm font-normal py-2.5 text-white">
            That's awesome. I think our users will really appreciate the
            improvements.
          </p>

          <span className="text-sm text-start font-normal text-gray-500 dark:text-gray-400">
            11:46
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageOut;
