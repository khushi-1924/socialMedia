import React from "react";
import Navbar from "../components/Navbar";

const Profile = () => {
  return (
    <>
    <Navbar />
    <div className="bg-slate-900 min-h-screen w-full overflow-x-hidden">
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
        <button className="p-2 mx-4 w-3/4 bg-blue-400 trasition delay-100 hover:cursor-pointer hover:bg-blue-500 font-semibold text-lg rounded text-slate-900">Follow</button>
        <button className="p-2 mx-4 w-3/4 outline-1 outline-white text-white trasition delay-100 hover:bg-sky-200 hover:text-slate-900 hover:cursor-pointer font-semibold text-lg rounded">Message</button>
      </div>
      </div>
      <div>
      <div className="mt-3 mb-1 w-full h-10 outline-1 outline-slate-800 text-center text-sky-200 flex justify-center items-center">
        <p className="text-xl">Posts</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 w-full max-w-screen overflow-hidden relative group">
        <img src="https://i.ytimg.com/vi/Vp7nW2SP6H8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDO2NDUjRyvSRoo-p3JlSMJ3t0tZw" className="w-full h-auto aspect-square object-cover" alt="" />
        
        <img src="https://i.ytimg.com/vi/Vp7nW2SP6H8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDO2NDUjRyvSRoo-p3JlSMJ3t0tZw" className="w-full h-auto aspect-square object-cover" alt="" />
        <img src="https://i.ytimg.com/vi/Vp7nW2SP6H8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDO2NDUjRyvSRoo-p3JlSMJ3t0tZw" className="w-full h-auto aspect-square object-cover" alt="" />
        <img src="https://i.ytimg.com/vi/Vp7nW2SP6H8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDO2NDUjRyvSRoo-p3JlSMJ3t0tZw" className="w-full h-auto aspect-square object-cover" alt="" />
        <img src="https://i.ytimg.com/vi/Vp7nW2SP6H8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDO2NDUjRyvSRoo-p3JlSMJ3t0tZw" className="w-full h-auto aspect-square object-cover" alt="" />
      </div>
      </div>
    </div>
    
    
    
    </>
  );
};

export default Profile;
