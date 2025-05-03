import React, { useState, useEffect, useContext } from "react";
import userContext from "../contexts/users/UserContext";
import toast from "react-hot-toast";

const ProfilePicture = () => {
  const context = useContext(userContext);
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
    toast.success('profile picture updated successfully!')

    if (!profilePic) {
      setMessage("Please select an image to upload.");
      return;
    }

    updateProfilePic(profilePic);
  };

  return (
    <div className="w-full flex items-center justify-center">
    <div className="w-1/2 mx-auto p-4 bg-gray-800 rounded-md">
      {/* Show profile picture */}
      <img
        src={preview || getProfilePicUrl()}
        alt="Profile"
        className="w-48 h-48 rounded-full mx-auto mb-4 border border-amber-50"
      />
      {/* Upload New Profile Picture */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="fileInput"
          name="img"
          className="hidden"
          required
        />
        <label
          htmlFor="fileInput"
          className={`h-52 flex items-center justify-center w-full p-2 border border-gray-300 rounded cursor-pointer bg-gray-700 hover:bg-gray-600 transition ${
            preview ? "p-0" : ""}`
}
          style={{
            backgroundImage: "none",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "52px", // Set desired height
            width: "auto", // Set desired width (auto or fixed)
          }}
        >
          change profile picture
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition hover:cursor-pointer"
        >
          update profile picture
        </button>
      </form>
      </div>
    </div>
  );
};

export default ProfilePicture;
