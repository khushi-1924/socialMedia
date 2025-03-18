import React, { useState } from "react";
import add from "../assets/add.png";

const AddPost = () => {
  const [caption, setCaption] = useState("");
  const [img, setImg] = useState(null);
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // Handle image selection
  const handleImageChange = (e) => {
    setImg(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!img) {
      setMessage("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("img", img);

    try {
      const response = await fetch(
        "http://localhost:3000/api/posts/createPost",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Post created successfully! 🎉");
        setCaption("");
        setImg(null);
        setImagePreview(null);
      } else {
        setMessage(data.error || "Failed to create post. Try again!");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("An error occurred while creating the post.");
    }
  };

  return (
    <div className="w-full h-full bg-slate-900 p-8">
      <div className="w-1/4 mx-auto p-6 rounded-lg outline-2 outline-sky-300 shadow-md">
        

        {message && (
          <div
            className={`mb-4 p-2 ${
              message.includes("success") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}

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
              imagePreview ? "p-0" : ""
            }`}
            style={{
              backgroundImage: imagePreview ? `url(${imagePreview})` : "none",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: imagePreview ? "200px" : "52px", // Set desired height
              width: imagePreview ? "100%" : "auto", // Set desired width (auto or fixed)
            }}
          >
            {/* Show Icon and Text if No Preview */}
            {!imagePreview && (
              <div className="flex items-center">
                <img src={add} className="h-4 w-4 mx-2" />
                <span className="text-white">Upload Image</span>
              </div>
            )}
          </label>
          {/* Caption Input */}
          <textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-white"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
