import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/users/UserContext";

const SmallCard = ({ user }) => {
  const navigate = useNavigate();
  const { setTargetUser } = useContext(UserContext);

  const handleProfileClick = (user) => {
    setTargetUser(user); // sets the clicked user
    navigate(`/profile/${user._id}`);
  };

  return (
    <div>
      <div className="w-[230px] h-[240px] bg-stone-500 rounded-lg flex flex-col items-center justify-center">
        <img
          src={user.profilePic}
          alt=""
          className="h-[140px] w-[140px] rounded-full border border-stone-700"
        />
        <p className="font-semibold py-1">{user.username}</p>
        <button
          className="bg-stone-800 text-white w-[180px] p-2 rounded hover:bg-stone-900"
          onClick={() => handleProfileClick(user)}
        >
          go to profile
        </button>
      </div>
    </div>
  );
};

export default SmallCard;
