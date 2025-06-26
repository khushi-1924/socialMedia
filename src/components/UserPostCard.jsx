import React, { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import heart from "../assets/heart.png";
import heartLiked from "../assets/heartLiked.png";
import comment from "../assets/comment.png";
import send from "../assets/send.png";
import UserContext from "../contexts/users/UserContext";

const Card = ({ post }) => {
  const navigate = useNavigate();
  const {
    setTargetUser,
    user,
    getTargetUserProfilePicUrl,
    targetUser,
    handleFollowToggle,
  } = useContext(UserContext);
  const currentUser = user; // Assuming you have the current user data in context or props
  const host = "http://localhost:3000";
  // const [follow, setFollow] = useState(false);

  const [like, setLike] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [commentText, setCommentText] = useState("");

  const handleLike = async () => {
    try {
      const response = await fetch(`${host}/api/posts/like/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      });

      const updatedPost = await response.json();
      console.log(updatedPost);
      setLike(updatedPost.likes.includes(user._id));
      setLikesCount(updatedPost.likes.length);
    } catch (error) {
      console.error("Failed to like the post", error);
    }
  };

  useEffect(() => {
    if (user && post.likes && Array.isArray(post.likes)) {
      const liked = post.likes.some((id) =>
        typeof id === "string" ? id === user._id : id._id === user._id
      );
      setLike(liked);
    }
  }, [post.likes, user]);

  // Add Comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/api/posts/comment/${post._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ text: commentText }),
      });

      const updatedPost = await response.json();
      setCommentText(""); // Clear textarea
      console.log(updatedPost); // You can refresh comments if you want
    } catch (error) {
      console.error("Failed to comment", error);
    }
  };

  const textAreaRef = useRef(null);
  const commentOnClick = () => {
    console.log("Comment Clicked");
    if (textAreaRef.current) textAreaRef.current.focus();
  };
  const handleUserClick = (user) => {
    setTargetUser(post.user); // sets the clicked user
    navigate(`/profile/${user._id}`); // navigate to profile page
  };

  return (
    <div className="bg-slate-900 h-full w-full">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="bg-amber-50 w-full md:w-1/2 h-[400px] rounded-xl flex flex-col md:flex-row overflow-visible shadow-lg md:shrink-0 divide-x divide-yellow-200">
          <div className="h-1/2 md:h-full w-full md:w-1/2">
            <img
              src={post.img}
              className="h-full w-full object-contain object-center rounded-l-xl"
              alt=""
            />
          </div>
          <div className="h-1/2 md:h-full w-full md:w-1/2">
            <div className="p-2 ml-1">
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center">
                  <img
                    src={post.user.profilePic}
                    className="h-12 w-12 object-cover object-center rounded-full"
                    alt=""
                  />
                  <p
                    className="ml-3 font-bold text-xl font-mono hover:underline hover:underline-offset-2 cursor-pointer"
                    onClick={() => handleUserClick(post.user)}
                  >
                    {post.user.username}
                  </p>
                </div>
                <div></div>
              </div>
              <div className="p-2">
                <p className="font-serif text-lg">{post.caption}</p>
                <span className="mr-5 text-sm text-slate-500">
                  {post.date.substring(0, 10)}
                </span>
                <span className="text-sm text-slate-500">
                  {post.date.substring(11, 16)}
                </span>
              </div>
              <div className="ml-2 p-1 flex items-center">
                <img
                  className="h-8 w-8 mr-4 transition-all duration-300 delay-100 ease-in-out transform scale-100 hover:scale-110 opacity-100 hover:cursor-pointer"
                  src={like ? heartLiked : heart}
                  onClick={handleLike}
                  alt="like icons"
                />{" "}
                {likesCount}
                <img
                  src={comment}
                  onClick={commentOnClick}
                  className="h-7 w-7 ml-4 transition-all duration-300 delay-100 ease-in-out transform scale-100 hover:scale-110 opacity-100 hover:cursor-pointer"
                  alt=""
                />
              </div>
            </div>
            <div>
              <form onSubmit={handleCommentSubmit} className="w-full px-4">
                <div className="outline-slate-200 outline-1 rounded-3xl flex justify-between items-center">
                  <textarea
                    ref={textAreaRef}
                    type="text"
                    className="w-full p-2 px-4 rounded-3xl outline-0 resize-none overflow-hidden h-10 max-h-32"
                    placeholder="type here..."
                    rows="1"
                    onChange={(e) => setCommentText(e.target.value)}
                    onInput={(e) => {
                      e.target.style.height = "10px"; // Reset height
                      e.target.style.height = e.target.scrollHeight + "px"; // Set to content height
                    }}
                  />
                  <img
                    type="submit"
                    src={send}
                    className="w-7 h-7 mr-3 hover:cursor-pointer transition-all duration-300 delay-100 ease-in-out transform scale-100 hover:scale-110 opacity-100"
                    alt=""
                  />
                </div>
              </form>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
