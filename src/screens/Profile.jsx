import React from "react";

const Profile = () => {
  return (
    <>
    <div className="bg-slate-900 h-full w-full">
      <div className="w-full h-40 bg-white flex items-center justify-center relative">
        <p className="ml-3 font-bold text-2xl">
          "Whoever is happy will make others happy."
        </p>
        <div className="absolute top-24 z-1">
          <img
            src="https://i.ytimg.com/vi/Vp7nW2SP6H8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDO2NDUjRyvSRoo-p3JlSMJ3t0tZw"
            className="h-32 w-32 object-cover object-center rounded-full border-4 border-white"
            alt=""
          />
          <p className="mt-2 font-semibold text-2xl text-center font-mono text-white">oreooo</p>
        </div>
        
      </div>
      <div className="mt-32 w-full h-20 grid grid-cols-3 text-sky-200">
        <div className="text-center font-semibold text-lg">
            <p>50</p>
            <p>Posts</p>
        </div>
        <div className="text-center font-semibold text-lg">
            <p>50</p>
            <p>Followers</p>
        </div>
        <div className="text-center font-semibold text-lg">
            <p>50</p>
            <p>Following</p>
        </div>
      </div>
      <div className="w-full flex justify-center">
      <div className="w-3/4 h-14 flex items-center justify-between">
        <button className="p-2 mx-4 w-3/4 bg-blue-400 font-semibold text-lg rounded">Follow</button>
        <button className="p-2 mx-4 w-3/4 outline-1 outline-white text-white font-semibold text-lg rounded">Message</button>
      </div>
      </div>
    </div>
    
    
    </>
  );
};

export default Profile;
