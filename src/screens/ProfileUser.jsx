import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import user from "../assets/user.png";
import postContext from "../contexts/posts/PostContext";
import userContext from "../contexts/users/UserContext";
import Card from "../components/Card";

const ProfileUser = () => {
  const context = useContext(postContext);
  const { myPosts, getMyPosts } = context;
  const context1 = useContext(userContext);
  const { user, getProfilePicUrl, getUserProfile } = context1;

  const selectedFont = localStorage.getItem("selectedFont") || "Bungee Tint";
  const selectedColor = localStorage.getItem("selectedColor") || "#FFB6C1";
  const selectedText =
    localStorage.getItem("selectedText") ||
    "Whoever is happy will make others happy!";

  const [selectedPost, setSelectedPost] = useState(null);
  const host = "http://localhost:3000";

  const postClick = (post) => {
    setSelectedPost(post);
  };

  const deletePost = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${host}/api/posts/deletePost/${postId}`, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("authToken"),
        },
      });

      const result = await response.json();
      console.log(result);

      // Optionally, refresh posts or remove this post from UI
      window.location.reload(); // or call props.onDelete(post._id)
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-slate-900 min-h-screen w-full overflow-x-hidden">
        <div
          className="w-full h-40 flex items-center justify-center relative"
          style={{
            backgroundColor: user?.backgroundColor || "#ffffff", // fallback if not set
            fontFamily: user?.font || "sans-serif", // fallback font
          }}
        >
          <p className="font-bold text-2xl">
            {user?.text || `"Whoever is happy will make others happy."`}
          </p>
          <div className="absolute top-24 z-1">
            <img
              src={getProfilePicUrl()}
              className="h-32 w-32 object-cover object-center rounded-full border-4 border-white"
              alt=""
            />
            <p className="mt-2 font-semibold text-2xl text-center font-mono text-white">
              {user?.username}
            </p>
          </div>
        </div>
        <div className="mt-32 w-full h-20 grid grid-cols-3 text-sky-200">
          <div className="text-center font-semibold text-lg">
            <p>{myPosts.length}</p>
            <p>Posts</p>
          </div>
          <div className="text-center font-semibold text-lg">
            <p>{user?.followers?.length > 0 ? user.followers.length : 0}</p>
            <p>Followers</p>
          </div>
          <div className="text-center font-semibold text-lg">
            <p>{user?.following?.length > 0 ? user.following.length : 0}</p>
            <p>Following</p>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <Link to="/editProfile">
            <button className="p-2 mx-4 px-5 trasition delay-100 duration-200 hover:cursor-pointer hover:bg-slate-800 font-semibold text-white text-lg rounded border-2 border-white">
              Edit Profile
            </button>
          </Link>
        </div>
        <div>
          <div className="mt-3 mb-1 w-full h-10 outline-1 outline-slate-800 text-center text-sky-200 flex justify-center items-center">
            <p className="text-xl">Posts</p>
          </div>
          <div className=" my-1 grid grid-cols-2 md:grid-cols-5 gap-0.5 w-full max-w-screen overflow-hidden relative group">
            {myPosts && myPosts.length > 0 ? (
              myPosts.map((myPost, index) => (
                <img
                  key={index}
                  src={myPost.img} // Render image as base64
                  alt={myPost.caption || "Post Image"}
                  className="w-full h-64 aspect-square object-contain object-center outline-1 outline-sky-200"
                  onClick={() => postClick(myPost)}
                />
              ))
            ) : (
              <div className="w-screen flex justify-center items-center">
                <p className="text-gray-400 text-2xl p-5 text-center">
                  No posts to display yet.
                </p>
              </div>
            )}
          </div>
          {selectedPost && (
            <div className="fixed inset-0 bg-opacity-60 z-50 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Card post={selectedPost} />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-2 right-2  text-black px-3 py-1 rounded hover:bg-red-500"
                >
                  ✖
                </button>
                <button
                  onClick={() => deletePost(selectedPost._id)}
                  className="absolute top-2 right-15 bg-white text-black px-3 py-1 rounded hover:bg-red-500"
                >
                  delete post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileUser;
