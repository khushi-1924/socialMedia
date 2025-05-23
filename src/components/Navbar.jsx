import React, { useState, useContext } from "react";
import logoName from "../assets/logo-1.png";
import profile from "../assets/profile.png";
import add from "../assets/add.png";
import search from "../assets/search.png";
import hamburger from "../assets/hamburger.png";
import close from "../assets/close.png";
import message from "../assets/message.png";
import { Link, useNavigate } from "react-router-dom";
import logout from "../assets/logout.png";
import postContext from "../contexts/posts/PostContext";

const Navbar = () => {
  const { setPosts } = useContext(postContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    // localStorage.removeItem("authToken");
    localStorage.clear();
    setPosts([]);
    navigate("/", { replace: true });
  };
  return (
    <div>
      <div className="bg-slate-800 rounded-b-sm h-18 w-full flex items-center justify-between">
        <div className="flex h-16 items-center mx-5">
          <Link to="/home">
            <img src={logoName} className="h-12 w-28 invert-30" alt="" />
          </Link>
        </div>
        <div className="h-16 hidden md:flex items-center justify-center mr-5">
          <div className="relative group w-11 mx-5">
            <Link to="/message">
              <img
                src={message}
                className="h-11 w-11 p-1 mx-5 transition duration-300 transform hover:scale-110 hover:outline-2 rounded-xl invert"
                alt=""
              />
            </Link>
            <span className="absolute top-11 left-1/2 transform -translate-x-1 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity delay-400 duration-100 text-sm text-white bg-black px-2 py-1 rounded-lg text-center z-10">
              Message
            </span>
          </div>
          <div className="relative group w-11 mx-5">
            <Link to="/search">
              <img
                src={search}
                className="h-11 w-11 p-1 mx-5 transition duration-300 transform hover:scale-110 hover:outline-2 rounded-xl invert"
                alt=""
              />
            </Link>
            <span className="absolute top-11 left-1/2 transform -translate-x-1 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity delay-400 duration-100 text-sm text-white bg-black px-2 py-1 rounded-lg text-center z-10">
              Search
            </span>
          </div>
          <div className="relative group w-11 mx-5">
            <Link to="/addPost">
              <img
                src={add}
                className="h-10 w-10 p-1 mx-5 transition duration-300 transform hover:scale-110 hover:outline-2 rounded-xl invert"
                alt=""
              />
            </Link>
            <span className="absolute top-11 left-1/2 transform -translate-x-1 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity delay-400 duration-100 text-sm text-white bg-black px-2 py-1 rounded-lg text-center z-10">
              Add
            </span>
          </div>
          <div className="relative group w-11 mx-5">
            <Link to="/profileUser">
              <img
                src={profile}
                className="h-10 w-10 p-1 mx-5 transition duration-300 transform hover:scale-110 hover:outline-2 rounded-xl invert"
                alt=""
              />{" "}
            </Link>
            <span className="absolute top-11 left-1/2 transform -translate-x-1 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity delay-400 duration-100 text-sm text-white bg-black px-2 py-1 rounded-lg text-center z-10">
              Profile
            </span>
          </div>
          <div className="relative group w-11 mx-5 hover:cursor-pointer">
            <img
              src={logout}
              className="h-10 w-10 p-1 mx-5 transition duration-300 transform hover:scale-110 hover:outline-2 rounded-xl invert"
              alt=""
              onClick={handleLogout}
            />{" "}
            <span className="absolute top-11 left-1/2 transform -translate-x-1 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity delay-400 duration-100 text-sm text-white bg-black px-2 py-1 rounded-lg text-center z-10">
              Logout
            </span>
          </div>
        </div>
        <div className="block md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl focus:outline-none"
          >
            {menuOpen ? (
              <img
                src={close}
                className="h-10 w-10 p-1 mx-5 transition duration-300 transform hover:scale-110 hover:outline-2 rounded-xl"
              />
            ) : (
              <img
                src={hamburger}
                className="h-10 w-10 p-1 mx-5 transition duration-300 transform hover:scale-110 hover:outline-2 rounded-xl"
              />
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-30 flex flex-col items-center md:hidden">
            <Link to='/search'>
            <div className="flex items-center">
              <img
                src={search}
                className="h-7 w-7 p-1 my-2 transition duration-300 transform hover:scale-110"
                alt="Search"
              />
              <p className="text-xl font-semibold font-sans mx-2">Search</p>
            </div>
            </Link>
            <hr />
            <Link to='/addPost'>
            <div className="flex items-center">
              <img
                src={add}
                className="h-7 w-7 p-1 my-2 transition duration-300 transform hover:scale-110"
                alt="Add"
              />
              <p className="text-xl font-semibold font-sans mx-2">Add</p>
            </div>
            </Link>
            <hr />
            <Link to='/profileUser'>
            <div className="flex items-center">
              <img
                src={profile}
                className="h-7 w-7 p-1 my-2 transition duration-300 transform hover:scale-110"
                alt="User"
              />
              <p className="text-xl font-semibold font-sans mx-2">Profile</p>
            </div>
            </Link>
            <Link to="/message">
              <div className="flex items-center">
                <img
                  src={message}
                  className="h-7 w-7 p-1 my-2 transition duration-300 transform hover:scale-110"
                  alt="Message"
                />
                <p className="text-xl font-semibold font-sans mx-2">Messages</p>
              </div>
            </Link>
            <div className="flex items-center hover:bg-red-400">
              <img
                src={logout}
                className="h-7 w-7 p-1 my-2 transition duration-300 transform hover:scale-110"
                onClick={handleLogout}
                alt="Logout"
              />
              <p className="text-xl font-semibold font-sans mx-2">Logout</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
