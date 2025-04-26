import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import userImg from "../../assets/user.png"; // Import default image

const UserState = (props) => {
  const host = "http://localhost:3000";
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [targetUser, setTargetUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

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

  // Upload/Update Profile Picture
  const updateProfilePic = async (profilePic) => {
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
        // resetForm(); // Reset form if required
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

  // Get target user Profile Pic URL
  const getTargetUserProfilePicUrl = () => {
    if (targetUser?.profilePic) {
      return targetUser.profilePic; // Use base64 string coming from the backend
    }
    // Return default profile picture if no profile picture is set
    return userImg; // Default image from assets
  };

  // Handling the follow and unfollow logic
  const handleFollowToggle = async (userId) => {
    try {
      const endpoint = isFollowing
        ? `${host}/api/auth/unfollow/${userId}`
        : `${host}/api/auth/follow/${userId}`;

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      });

      const data = await response.json();
      setIsFollowing(!isFollowing);
      if (response.ok) {
        console.log("response: ", data);
      } else {
        console.error(
          "Failed to toggle follow:",
          data?.msg || data?.error || data
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Save card preferences
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

  // Fetch users on search
  const fetchUsers = async (query) => {
    setLoading(true);
    try {
      const res = await fetch(`${host}/api/auth/searchUsers?query=${query}`);
      const data = await res.json();
      setResults(data.users);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all users
  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${host}/api/auth/getAllUsers`); 
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const [selectedFont, setSelectedFont] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedText, setSelectedText] = useState("");

  // Load user data on initial load
  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    fetchAllUsers();
  }, [])

  useEffect(() => {
    setSelectedFont(user?.font || localStorage.getItem("selectedFont"));
    setSelectedColor(
      user?.backgroundColor || localStorage.getItem("selectedColor")
    );
    setSelectedText(user?.text || localStorage.getItem("selectedText"));
  }, [user]);

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
        targetUser,
        setTargetUser,
        handleFollowToggle,
        isFollowing,
        setIsFollowing,
        results,
        setResults,
        fetchUsers,
        getTargetUserProfilePicUrl,
        users,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
