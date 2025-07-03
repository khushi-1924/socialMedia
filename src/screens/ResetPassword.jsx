import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const host = "http://localhost:3000";
  const { id, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confPassword) {
      setPasswordError("Passwords do not match");
      toast.error("Passwords do not match");
      return; // stop the submit
    }
    try {
      const res = await fetch(
        `${host}/api/auth/reset-password/${id}/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("Password reset successfully! You can now log in.");
        toast.success("Password reset successfully! You can now log in.");
        navigate("/");
      } else {
        setMessage(data.error || "Something went wrong.");
        toast.error("Something went wrong. Please try again.");
      }
      setMessage("");
      setPassword("");
      setConfPassword("");
    } catch (error) {
      setMessage("An error occurred.");
      console.log(error);
    }
  };

  const validatePasswords = (newPassword, newConfPassword) => {
    if (newPassword && newConfPassword && newPassword !== newConfPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="py-6 px-10 bg-blue-300 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">change password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            required
            placeholder="Enter new password"
            className="w-full p-2 mb-2 rounded-3xl px-4 border placeholder:text-gray-700 outline-none"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePasswords(value, confPassword);
            }}
          />
          <input
            type="text"
            required
            placeholder="Confirm new password"
            className="w-full p-2 mb-2 rounded-3xl px-4 border placeholder:text-gray-700 outline-none"
            value={confPassword}
            onChange={(e) => {
              setConfPassword(e.target.value);
              validatePasswords(password, e.target.value);
            }}
          />
          {passwordError && (
            <p className="text-red-600 text-sm mb-4 text-center">{passwordError}</p>
          )}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white p-2 py-3 rounded-xl mt-1 hover:bg-gray-700"
          >
            Update Password
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
