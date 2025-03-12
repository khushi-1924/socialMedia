import React, { useRef, useState } from "react";
import heart from "../assets/heart.png";
import heartLiked from "../assets/heart (1).png";
import comment from "../assets/chat (1).png";
import send from "../assets/send.png";

const Card = () => {
  const [like, setLike] = useState(false);
  const [follow, setFollow] = useState(false);
  const likeOnClick = () => {
    console.log("Like Clicked");
    setLike(!like);
  };
  const textAreaRef = useRef(null);
  const commentOnClick = () => {
    console.log("Comment Clicked");
    if (textAreaRef.current)
        textAreaRef.current.focus();
  };
  const followOnClick = (e) => {
    console.log("Follow Clicked");
    setFollow(!follow);
  }
  return (
    <div className="bg-slate-900 h-full w-full">
      <div className="bg-slate-900 h-full w-full">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="bg-white w-full md:w-1/2 h-3/4 rounded-xl flex flex-col md:flex-row overflow-visible shadow-lg md:shrink-0">
            <div className="h-1/2 md:h-full w-full md:w-1/2">
              <img
                src="https://i.ytimg.com/vi/Vp7nW2SP6H8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDO2NDUjRyvSRoo-p3JlSMJ3t0tZw"
                className="h-full w-full object-cover object-center rounded-l-xl"
                alt=""
              />
            </div>
            <div className="h-1/2 md:h-full w-full md:w-1/2">
              <div className="p-2 ml-1">
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center">
                    <img
                      src="https://i.ytimg.com/vi/Vp7nW2SP6H8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDO2NDUjRyvSRoo-p3JlSMJ3t0tZw"
                      className="h-12 w-12 object-cover object-center rounded-full"
                      alt=""
                    />
                    <p className="ml-3 font-bold text-xl font-mono">oreooo</p>
                  </div>
                  <div>
                    <button className="rounded-lg py-2 px-4 outline-2 mr-5 hover:cursor-pointer hover:bg-blue-500 hover:outline-blue-600 hover:text-white duration-300" onClick={followOnClick}>
                      {follow ? "Follow" : "Following"}
                    </button>
                  </div>
                </div>
                <div className="p-2">
                  <p className="font-serif text-lg">Hi Guyss!! I'm Oreo</p>
                  <span className="mr-5 text-sm text-slate-500">
                    08-03-2025
                  </span>
                  <span className="text-sm text-slate-500">15:53pm</span>
                </div>
                <div className="ml-2 p-1 flex items-center">
                  <img
                    className="h-8 w-8 mr-4 transition-all duration-300 delay-100 ease-in-out transform scale-100 hover:scale-110 opacity-100 hover:cursor-pointer"
                    src={like ? heart : heartLiked}
                    onClick={likeOnClick}
                    alt="like icons"
                  />
                  <img src={comment} onClick={commentOnClick} className="h-7 w-7 ml-4 transition-all duration-300 delay-100 ease-in-out transform scale-100 hover:scale-110 opacity-100 hover:cursor-pointer" alt="" />
                </div>
              </div>
              <div>
                <form className="w-full px-4">
                  <div className="outline-slate-200 outline-1 rounded-3xl flex justify-between items-center">
                    <textarea
                    ref={textAreaRef}
                      type="text"
                      className="w-full p-2 px-4 rounded-3xl outline-0 resize-none overflow-hidden h-10 max-h-32"
                      placeholder="type here..."
                      rows="1"
                      onInput={(e) => {
                        e.target.style.height = "10px"; // Reset height
                        e.target.style.height = e.target.scrollHeight + "px"; // Set to content height
                      }}
                    />
                    <img src={send} className="w-7 h-7 mr-3 hover:cursor-pointer transition-all duration-300 delay-100 ease-in-out transform scale-100 hover:scale-110 opacity-100" alt="" />
                  </div>
                </form>
              </div>
              <div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
