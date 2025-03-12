import React, { useState } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";


const Home = () => {
  return (
    <div className="bg-slate-900 h-full w-full overflow-x-hidden">
      <Navbar />
      <Card />
    </div>
  );
};

export default Home;
