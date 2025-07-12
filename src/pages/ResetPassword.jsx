import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import resetImage from "../assets/images/reset.png";
import db from "../db/db";

const ResetPassword = () => {
  const navigate = useNavigate();

  // State
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const user = await db.get(email);
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
          src={resetImage}
          alt="Reset Password"
          className="w-64 h-64 object-contain"
        />
      }
    >
      <h2 className="text-2xl font-semibold mb-1">Reset Password</h2>
      <p className="text-sm text-gray-600 mb-6">
        Swap. Style. Influence. Join the movement toward sustainable fashion.
      </p>

      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-800 text-white py-2 rounded-full mb-4"
        >
          Reset Password
        </button>
      </form>

      <p className="text-sm text-center">
        Remembered your password?{" "}
        <Link to="/" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default ResetPassword;
