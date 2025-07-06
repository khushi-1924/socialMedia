import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const host = 'https://picta-backend.onrender.com/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${host}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/afterMailSent");
      } else {
        setMessage(data.error || "Something went wrong.");
        toast.error("Something went wrong. Please try again.");
      }
      setMessage("");
      setEmail("");
    } catch (error) {
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="py-6 px-10 bg-blue-300 rounded-2xl shadow-md w-full max-w-md">
        <h3 className="text-xl font-bold mb-4 text-center">enter email to send reset link</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full p-2 mb-4 border rounded-3xl px-4 placeholder:text-gray-700 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-gray-900 text-white p-2 py-3 rounded-xl hover:bg-gray-700"
          >
            Send Reset Link
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
