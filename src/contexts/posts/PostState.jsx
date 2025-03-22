import React, { useState } from "react";
import PostContext from "./PostContext";

const PostState = (props) => {
  const host = "http://localhost:3000";

  const postsInitial = [];
  const [posts, setPosts] = useState(postsInitial);
  const [message, setMessage] = useState("");

  // Function to get all posts
  const getPosts = async () => {
    // API call
    try {
      // API call
      const response = await fetch(`${host}/api/posts/getPosts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
  
      const json = await response.json();
  
      // No need to convert to base64, use directly
      console.log(json); // Check if posts are coming properly
      setPosts(json); // Set posts directly
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  // Function to add a post
  const addPost = async (caption, img, resetForm) => {
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("img", img);
    // API call
    try {
      const response = await fetch(`${host}/api/posts/createPost`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("authToken"),
        },
        body: formData,
      });

      // Logic to add post
      const data = await response.json();
      if (response.ok) {
        setMessage("Post created successfully! 🎉");

        // Reset form after successful post
        resetForm();

        // Add new post to the existing list (optional)
        setPosts((prevPosts) => [data.post, ...prevPosts]);
      } else {
        setMessage(data.error || "Failed to create post. Try again!");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("An error occurred while creating the post.");
    }
  };

  //Function to delete a post
  const deletePost = async (id) => {
    // API call
    const response = await fetch(`${host}/api/posts/deletePost/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    });
    const json = response.json();
    console.log(json);

    console.log("deleting the post with id " + id);
    const newPosts = posts.filter((post) => {
      return post._id !== id;
    });
    setNotes(newPosts);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        addPost,
        deletePost,
        getPosts,
        message,
        setMessage,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
