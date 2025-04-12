import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import userImg from "../../assets/user.png"; // Import default image

const UserState = (props) => {
  const host = "http://localhost:3000";
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get User Data (Fetch Profile)
  const getUserProfile = async () => {
    try {
      const response = await fetch(`${host}/api/auth/getUser`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("authToken"),
        },
      });
      const data = await response.json();
      if (response.ok) {
        // Set user and profile data
        setUser(data.user);
      } else {
        console.error("Failed to fetch user:", data.error);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const [selectedFont, setSelectedFont] = useState(user?.font || localStorage.getItem("selectedFont"));
  const [selectedColor, setSelectedColor] = useState(
    user?.backgroundColor || localStorage.getItem("selectedColor")
  );
  const [selectedText, setSelectedText] = useState(
    user?.text || localStorage.getItem("selectedText")
  );

  // Upload/Update Profile Picture
  const updateProfilePic = async (profilePic, resetForm) => {
    const formData = new FormData();
    formData.append("profilePic", profilePic);

    try {
      const response = await fetch(`${host}/api/auth/updateProfilePic`, {
        method: "PUT",
        headers: {
          "auth-token": localStorage.getItem("authToken"),
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        // Update user state with new profilePic
        setUser(data.user);
        console.log("Profile picture updated successfully!");
        resetForm(); // Reset form if required
      } else {
        console.error("Failed to update profile picture:", data.error);
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  // Get Profile Pic URL
  const getProfilePicUrl = () => {
    if (user?.profilePic) {
      return user.profilePic; // Use base64 string coming from the backend
    }
    // Return default profile picture if no profile picture is set
    return userImg; // Default image from assets
  };

  const savePreferences = async (font, backgroundColor, text) => {
    const response = await fetch(`${host}/api/auth/updatePreferences`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
      body: JSON.stringify({ font, backgroundColor, text }),
    });

    const data = await response.json();
    if (response.ok) {
      // Update user context
      setUser(data.user);
    } else {
      console.error(data.error);
    }
  };

  // Load user data on initial load
  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        getUserProfile,
        updateProfilePic,
        getProfilePicUrl,
        selectedFont,
        selectedColor,
        selectedText,
        setSelectedFont,
        setSelectedColor,
        setSelectedText,
        savePreferences,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
