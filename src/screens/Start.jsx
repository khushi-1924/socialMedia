import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="bg-[#051b34] h-full w-full flex justify-center items-center">
      <div className="bg-[#9c8c7d] h-1/2 w-1/2 rounded-lg flex justify-between">
        <div className="w-1/2 h-full">
          <img
            src="https://thumbs.dreamstime.com/b/cat-dog-lying-together-bed-love-friendship-kitten-puppy-ai-generated-347353418.jpg"
            className="h-full w-full object-cover rounded-l-lg"
            alt=""
          />
        </div>
        <div className="w-1/2 h-full">
          <h2 className="text-3xl text-center font-bold mt-7 p-1 text-amber-950">LOGIN</h2>
          <form>
            <div className="flex flex-col items-center justify-center mt-5">
              <input
                type="text"
                placeholder="Username"
                className="w-3/4 p-2 pl-3 m-2 rounded-lg outline-1"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-3/4 p-2 pl-3 m-2 rounded-lg outline-1"
              />
              <button className="bg-amber-950 hover:bg-[#2c1001e3] text-white text-lg p-2 rounded-lg w-3/4 mt-4">
                Login
              </button>
              <div className="font-semibold p-1 mt-1 hover:underline hover:underline-offset-2 hover:cursor-pointer">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <div className="font-semibold p-1 hover:underline hover:underline-offset-2 hover:cursor-pointer">
                <Link to="/signup">Create an Account</Link>
              </div>
            </div>
          </form>
          
          
        </div>
      </div>
    </div>
  );
};

export default Start;
