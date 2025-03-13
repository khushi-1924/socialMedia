import React, { useState } from "react";
import logoName from "../assets/logo-1.png";
import user from "../assets/user.png";
import add from "../assets/add.png";
import search from "../assets/search.png";
import hamburger from "../assets/hamburger.png";
import close from "../assets/close.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <div className="bg-[#d6e6ff] rounded-b-sm h-18 w-full flex items-center justify-between">
        <div className="flex h-16 items-center mx-5">
          <img src={logoName} className="h-12 w-28" alt="" />
        </div>
        <div className="h-16 hidden md:flex items-center justify-center mr-5">
          <div class="relative group w-11 mx-5">
            <img
              src={search}
              className="h-11 w-11 p-1 mx-5 transition duration-300 transform hover:scale-110 hover:outline-2 rounded-xl"
              alt=""
            />
            <span className="absolute top-11 left-1/2 transform -translate-x-1 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity delay-400 duration-100 text-sm text-white bg-black px-2 py-1 rounded-lg text-center">
              Search
            </span>
          </div>
          <div class="relative group w-11 mx-5">
            <img
              src={add}
              className="h-10 w-10 p-1 mx-5 transition duration-300 transform hover:scale-110 hover:outline-2 rounded-xl"
              alt=""
            />
            <span className="absolute top-11 left-1/2 transform -translate-x-1 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity delay-400 duration-100 text-sm text-white bg-black px-2 py-1 rounded-lg text-center">
              Add
            </span>
          </div>
          <div class="relative group w-11 mx-5">
            <Link to='/profile'><img
              src={user}
              className="h-10 w-10 p-1 mx-5 transition duration-300 transform hover:scale-110 hover:outline-2 rounded-xl"
              alt=""
            /> </Link>
            <span className="absolute top-11 left-1/2 transform -translate-x-1 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity delay-400 duration-100 text-sm text-white bg-black px-2 py-1 rounded-lg text-center">
              Profile
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
            <div className="flex items-center">
              <img
                src={search}
                className="h-7 w-7 p-1 my-2 transition duration-300 transform hover:scale-110"
                alt="Search"
              />
              <p className="text-xl font-semibold font-sans mx-2">Search</p>
            </div>
            <hr />
            <div className="flex items-center">
              <img
                src={add}
                className="h-7 w-7 p-1 my-2 transition duration-300 transform hover:scale-110"
                alt="Add"
              />
              <p className="text-xl font-semibold font-sans mx-2">Add</p>
            </div>
            <hr />
            <div className="flex items-center">
              <img
                src={user}
                className="h-7 w-7 p-1 my-2 transition duration-300 transform hover:scale-110"
                alt="User"
              />
              <p className="text-xl font-semibold font-sans mx-2">Profile</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
