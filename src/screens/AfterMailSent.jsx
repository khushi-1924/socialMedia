import React from "react";
import mail from "../assets/mail.gif";

const AfterMailSent = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#b2b2b2]">
      <div className="bg-gray-900 py-4 px-6 rounded-xl mt-2 flex flex-col items-center">
        <h2 className="text-xl text-white mt-2">
          a reset link has been sent to your email
        </h2>
        <p className="text-gray-300 mt-2">
          Please check your inbox and follow the instructions to reset your
          password.
        </p>
        <p className="text-gray-300 mt-2">
          If you don't see the email, please check your spam folder.
        </p>
      </div>
      <img src={mail} className="invert-30 mt-20" alt="" />
    </div>
  );
};

export default AfterMailSent;
