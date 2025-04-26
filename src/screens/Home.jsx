import React, { useState, useContext } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import PostContext from "../contexts/posts/PostContext";
import UserContext from "../contexts/users/UserContext";
import SmallCard from "../components/SmallCard";

const Home = () => {
  const { posts, loading } = useContext(PostContext);
  const { users, user } = useContext(UserContext);
  const currentUser = user;
  return (
    <div className="bg-slate-900 h-full w-full overflow-x-hidden">
      <Navbar />
      {loading ? (
        <div className="w-full h-[40px] flex items-center justify-center">
          <span className="loader mt-20"></span>
        </div>
      ) : posts.length === 0 ? (
        <div>
          <div className="text-white text-2xl text-center">
            no posts to display.. follow people and get started
          </div>
          <div className='mt-10 flex justify-around items-center'>
            {currentUser && users.filter((user) => user._id !== currentUser._id)
            .map((user) => (
              <SmallCard key={user._id} user={user} />
            ))}
          </div>
        </div>
      ) : (
        posts.map((post) => {
          return (
            <div key={post._id} className="flex justify-center mt-5">
              <Card post={post} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;
