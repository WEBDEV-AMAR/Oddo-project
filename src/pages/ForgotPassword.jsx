import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import forgotImage from "../assets/images/forgot.png";
import db from "../db/db";

const ForgotPassword = () => {
  const navigate = useNavigate();

  // State
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const user = await db.get(email);
      if (!newPassword) {
        alert("Please enter a new password.");
        return;
      }

      user.password = newPassword;
      await db.put(user);

      alert("Password reset successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error.status === 404) {
        alert("User not found. Please signup first.");
      } else {
        alert("Error resetting password.");
      }
    }
  };

  return (
    <AuthLayout
      image={
        <img
          src={forgotImage}
          alt="Forgot Password"
          className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 object-contain"
        />
      }
    >
      <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-center sm:text-left">
        Forgot Password
      </h2>
      <p className="text-sm text-gray-600 mb-6 text-center sm:text-left">
        Swap. Style. Influence. Join the movement toward sustainable fashion
      </p>

      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded text-sm"
          required
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded text-sm"
          required
        />

        <p className="text-xs text-gray-500 mb-4">
          We will reset your password to the new one entered
        </p>

        <button
          type="submit"
          className="w-full bg-blue-800 text-white py-2 rounded-full text-sm"
        >
          Reset Password
        </button>
      </form>

      <div className="mt-4 space-y-2 text-center text-sm">
        <p>
          Already reset it?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
        <p>
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
