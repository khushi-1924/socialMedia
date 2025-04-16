import React, { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/users/UserContext";
import { useNavigate } from "react-router-dom";
import userImg from '../assets/user.png'

const Search = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { user, results, setResults, fetchUsers, loading, targetUser, setTargetUser } = context;
  const [query, setQuery] = useState("");

  const onSearchClick = (clickedUser) => {
    setTargetUser(clickedUser);
    if (clickedUser._id === user._id) {
      navigate('/profileUser')
    }
    else
      navigate(`/profile/${clickedUser._id}`);
  }

  useEffect(()=>{
    setTargetUser(null);
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }
      fetchUsers(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="w-full h-full bg-slate-900 flex justify-center items-center">
      <div className="w-1/2 min-h-screen text-white p-4">
        <input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full p-3 px-5 rounded-xl bg-slate-700 text-white outline-none mb-4"
        />

        {loading ? (
          <div className="w-full h-[40px] flex items-center justify-center">
            <span className="loader mt-20"></span>
          </div>
        ) : results.length > 0 ? (
          <ul className="space-y-4">
            {results.map((user) => (
              <li
                key={user._id}
                className="flex items-center space-x-4 bg-slate-800 p-4 rounded-xl"
                onClick={()=>onSearchClick(user)}
              >
                <img
                  src={
                    user.profilePic ? user.profilePic : userImg // fallback default image
                  }
                  alt="profilePic"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-lg font-semibold">{user.username}</span>
              </li>
            ))}
          </ul>
        ) : query ? (
          <p>No users found</p>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
