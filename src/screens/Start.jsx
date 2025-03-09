import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Start = () => {
  const [message, setMessage] = useState("");
  const [creds, setCreds] = useState({
    emailORusername: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const { emailORusername, password } = creds;
    const response = await fetch("http://localhost:3000/api/auth/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emailORusername, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      navigate("/home");
      alert(json.message);
    } else {
      alert(json.message);
    }
  };

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-slate-900 h-full w-full flex justify-center items-center">
      <div className="bg-[#9c8c7d] h-3/5 w-1/2 rounded-lg flex justify-between">
        <div className="w-1/2 h-full">
          <img
            src="https://thumbs.dreamstime.com/b/cat-dog-lying-together-bed-love-friendship-kitten-puppy-ai-generated-347353418.jpg"
            className="h-full w-full object-cover rounded-l-lg"
            alt=""
          />
        </div>
        <div className="w-1/2 h-full">
          <h2 className="text-4xl text-center font-bold mt-7 p-1 text-amber-950">
            LOGIN
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center mt-5">
              <label
                htmlFor="emailORusername"
                className="w-3/4 text-left px-1 text-lg text-yellow-800 font-medium"
              >
                Email or Username
              </label>
              <input
                type="text"
                id="emailORusername"
                name="emailORusername"
                value={creds.emailORusername}
                onChange={onChange}
                placeholder="eg. oreo_the_dog"
                className="w-3/4 p-2 pl-3 m-2 rounded-lg outline-1"
              />
              <label
                htmlFor="password"
                className="mt-3 w-3/4 text-left px-1 text-lg text-yellow-800 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={creds.password}
                onChange={onChange}
                placeholder="eg. oreo_123"
                id="password"
                className="w-3/4 p-2 pl-3 m-2 rounded-lg outline-1"
              />
              <button className="bg-amber-950 hover:bg-[#2c1001f2] text-white text-lg p-2 rounded-lg w-3/4 mt-4">
                Login
              </button>
              <div className="font-semibold p-1 mt-3 hover:underline hover:underline-offset-2 hover:cursor-pointer">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <div className="font-semibold p-1 hover:underline hover:underline-offset-2 hover:cursor-pointer">
                <Link to="/signup">Create an Account</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Start;
