import React, { useState, useEffect, useContext } from "react";
import userContext from "../contexts/users/UserContext";

const ProfilePicture = () => {
  const context = useContext(userContext)
  const { user, updateProfilePic, getProfilePicUrl } = context;
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState("");

  // Handle profile pic change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // reset form
  const resetForm = () => {
    setProfilePic(null);
    setPreview(null);
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profilePic) {
      setMessage("Please select an image to upload.");
      return;
    }

    updateProfilePic(profilePic, resetForm)
  };

  return (
    <div className="w-full mx-auto p-4 bg-gray-800 rounded-md">
      <h2 className="text-xl text-white mb-4">Profile</h2>
      {/* Show profile picture */}
      <img
        src={preview || getProfilePicUrl()}
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      {/* Upload New Profile Picture */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-white"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Upload Profile Picture
        </button>
      </form>
      <p className="text-white mt-4">Welcome, {user?.name || "User"}!</p>
    </div>
  );
};

export default ProfilePicture;