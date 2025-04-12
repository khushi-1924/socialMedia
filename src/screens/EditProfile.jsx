import React, { useState } from "react";
import ProfilePicture from "./ProfilePicture";
import EditCard from "../components/EditCard";

const EditProfile = () => {
  
  return (
    <div className="min-h-full w-full bg-slate-900 flex flex-col items-center justify-center">
      <div className="w-full mb-5">
      <EditCard />
      </div>

      <div>
        <ProfilePicture />
      </div>
    </div>
  );
};

export default EditProfile;
