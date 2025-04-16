import React, { useEffect, useContext, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import user from '../assets/user.png'
import PostContext from "../contexts/posts/PostContext";
import UserContext from "../contexts/users/UserContext";
import Card from "../components/Card";

const Profile = () => {
  // const { id } = useParams();
  const context = useContext(PostContext);
  const { posts, getPosts, getTargetUserPosts, targetUserPosts } = context;
  const context1 = useContext(UserContext);
  const { user, getTargetUserProfilePicUrl, targetUser, isFollowing, setIsFollowing, handleFollowToggle } = context1; 


  const postClick = (post) => {
    <Card post={post} />
  }

  useEffect(() => {
    getPosts();
    console.log(targetUser)
  }, []);

  useEffect(() => {
    getTargetUserPosts(targetUser?._id);
  }, [targetUser]);

  useEffect(() => {
      console.log("Running useEffect");
      if (user && targetUser) {
        setIsFollowing(user.following.includes(targetUser._id));
        console.log(isFollowing);
      }
    }, [user, targetUser]);

  return (
    <>
      <Navbar />
      <div className="bg-slate-900 min-h-screen w-full overflow-x-hidden">
        <div className="w-full h-40 flex items-center justify-center relative" style={{
          backgroundColor: targetUser?.backgroundColor || "#ffffff", // fallback if not set
          fontFamily: targetUser?.font || "sans-serif", // fallback font
        }}> 
          <p className="font-bold text-2xl">
          {targetUser?.text || `"Whoever is happy will make others happy."`}
          </p>
          <div className="absolute top-24 z-1">
            <img
              src={getTargetUserProfilePicUrl()}
              className="h-32 w-32 object-cover object-center rounded-full border-4 border-white"
              alt=""
            />
            <p className="mt-2 font-semibold text-2xl text-center font-mono text-white">
            {targetUser?.username}
            </p>
          </div>
        </div>
        <div className="mt-32 w-full h-20 grid grid-cols-3 text-sky-200">
          <div className="text-center font-semibold text-lg">
            <p>{targetUserPosts.length}</p>
            <p>Posts</p>
          </div>
          <div className="text-center font-semibold text-lg">
            <p>{targetUser?.followers?.length}</p>
            <p>Followers</p>
          </div>
          <div className="text-center font-semibold text-lg">
            <p>{targetUser?.following?.length}</p>
            <p>Following</p>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-3/4 h-14 flex items-center justify-between">
          {isFollowing ? (
            <button className="p-2 mx-4 w-3/4 bg-red-400 transition delay-100 hover:cursor-pointer hover:bg-red-500 font-semibold text-lg rounded text-slate-900" onClick={()=>handleFollowToggle(targetUser._id)}>
            Unfollow
       </button>
          ) : (
            <button className="p-2 mx-4 w-3/4 bg-blue-400 transition delay-100 hover:cursor-pointer hover:bg-blue-500 font-semibold text-lg rounded text-slate-900" onClick={()=>handleFollowToggle(targetUser._id)}>
                 Follow
            </button>
          )}
            
            <button className="p-2 mx-4 w-3/4 outline-1 outline-white text-white trasition delay-100 hover:bg-sky-200 hover:text-slate-900 hover:cursor-pointer font-semibold text-lg rounded">
              Message
            </button>
          </div>
        </div>
        <div>
          <div className="mt-3 mb-1 w-full h-10 outline-1 outline-slate-800 text-center text-sky-200 flex justify-center items-center">
            <p className="text-xl">Posts</p>
          </div>
          <div className=" my-1 grid grid-cols-2 md:grid-cols-5 gap-0.5 w-full max-w-screen overflow-hidden relative group">
            {targetUserPosts && targetUserPosts.length > 0 ? (
              targetUserPosts.map((post, index) => (
                <img
                  key={index}
                  src={post.img} // Render image as base64
                  alt={post.caption || "Post Image"}
                  className="w-full h-64 aspect-square object-contain object-center outline-1 outline-sky-200"
                  onClick={()=>postClick(post)}
                />
              ))
            ) : (
              <p className="text-gray-400 text-center col-span-4">
                No posts to display yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
