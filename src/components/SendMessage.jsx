import React from "react";
import send from "../assets/send.png";

const SendMessage = () => {
  return (
    <div className="w-full px-4 py-3 bg-slate-800 flex justify-end items-end">
      <input
        type="text"
        className="w-full rounded-full bg-slate-700 px-5 py-2 outline-0"
        placeholder="type here"
      />
      <button className="w-10 h-10 hover:bg-slate-700 rounded flex justify-center items-center ml-3">
        <img src={send} alt="send" className="w-7 h-7 invert" />
      </button>
    </div>
  );
};

export default SendMessage;
