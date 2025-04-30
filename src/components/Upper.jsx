import React from "react";

const Upper = () => {
  return (
    <div className="w-full bg-slate-800">
      <div className="w-full py-2 px-7 flex rounded items-center">
        <div>
          <img
            src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
            className="w-12 h-12 object-cover rounded-full"
            alt=""
          />
        </div>
        <div className="ml-6">
          <p className="text-lg">Oreo</p>
          <p className="text-sm">online</p>
        </div>
      </div>
    </div>
  );
};

export default Upper;
