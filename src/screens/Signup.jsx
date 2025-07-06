import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import user from '../assets/user.png';
import toast from "react-hot-toast";

const Signup = () => {
  const host = "https://picta-backend.onrender.com";
  const [creds, setCreds] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    password: "",
    profilePic: {user}
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, username, phone, password } = creds;
    const response = await fetch(`${host}/api/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, username, phone, password }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      navigate("/");
      toast.success(json.message);
    } else {
      toast.error(json.message);
    }
  };

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-full h-full bg-slate-900 flex justify-center items-center">
      <div className="h-4/5 w-1/3 border-3 border-slate-600 rounded-2xl">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center mt-5">
            <label
              htmlFor="name"
              className="w-4/5 text-left px-1 text-lg text-sky-200 font-medium"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="eg. oreo dog"
              value={creds.name}
              onChange={onChange}
              className="w-4/5 p-2 pl-3 m-2 rounded-lg outline-slate-600 outline-1 text-sky-300"
            />
            <label
              htmlFor="email"
              className="w-4/5 text-left px-1 text-lg text-sky-200 font-medium"
            >
              Email id
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="eg. oreo@gmail.com"
              value={creds.email}
              onChange={onChange}
              className="w-4/5 p-2 pl-3 m-2 rounded-lg outline-slate-600 outline-1 text-sky-300"
            />
            <label
              htmlFor="username"
              className="w-4/5 text-left px-1 text-lg text-sky-200 font-medium"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="eg. oreo_the_dog"
              value={creds.username}
              onChange={onChange}
              className="w-4/5 p-2 pl-3 m-2 rounded-lg outline-slate-600 outline-1 text-sky-300"
            />
            <label
              htmlFor="phone"
              className="w-4/5 text-left px-1 text-lg text-sky-200 font-medium"
            >
              Phone No.
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="eg. 11111"
              value={creds.phone}
              onChange={onChange}
              className="w-4/5 p-2 pl-3 m-2 rounded-lg outline-slate-600 outline-1 text-sky-300"
            />
            <label
              htmlFor="password"
              className="w-4/5 text-left px-1 text-lg text-sky-200 font-medium"
            >
              Password
            </label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="eg. oreo_123"
              value={creds.password}
              onChange={onChange}
              className="w-4/5 p-2 pl-3 m-2 rounded-lg outline-slate-600 outline-1 text-sky-300"
            />

            <button
              type="submit"
              className="bg-sky-800 hover:bg-sky-600 text-white text-lg p-2 rounded-lg w-4/5 mt-4"
            >
              Create Account
            </button>
            <div className="text-sky-300 font-semibold mt-4 p-1 hover:underline hover:underline-offset-2 hover:cursor-pointer">
              <Link to="/">Already a User?</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
