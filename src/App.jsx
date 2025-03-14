import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./screens/Start";
import ForgetPassword from "./screens/ForgetPassword";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Message from "./screens/Message";
import Search from "./screens/Search";
import AddPost from "./screens/AddPost";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <div className="h-screen w-screen">
        <Routes>
          <Route exact path="/" element={<Start />} />
          <Route exact path="/forgot-password" element={<ForgetPassword />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/message" element={<Message /> } />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/addPost" element={<AddPost />} />
        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
