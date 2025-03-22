import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Start from "./screens/Start";
import ForgetPassword from "./screens/ForgetPassword";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Message from "./screens/Message";
import Search from "./screens/Search";
import AddPost from "./screens/AddPost";
import PostState from "./contexts/posts/PostState";

function App() {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/home", { replace: true });
    }
  }, []);

  return (
    <>
      <PostState>
        <div className="h-screen w-screen">
          <Routes>
            <Route exact path="/" element={<Start />} />
            <Route exact path="/forgot-password" element={<ForgetPassword />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route
              exact
              path="/home"
              element={localStorage.getItem("authToken") ? <Home /> : <Start />}
            />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/message" element={<Message />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/addPost" element={<AddPost />} />
          </Routes>
        </div>
      </PostState>
    </>
  );
}

export default App;