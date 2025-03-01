import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./screens/Start";
import ForgetPassword from "./screens/ForgetPassword";
import Signup from "./screens/Signup";
import Home from "./screens/Home";

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
        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
