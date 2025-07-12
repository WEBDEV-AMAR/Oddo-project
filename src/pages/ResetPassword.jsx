
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import resetImage from "../assets/images/reset.png"; 

const ResetPassword = () => {
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
      <h2 className="text-2xl font-semibold mb-1">Login </h2>
      <p className="text-sm text-gray-600 mb-6">
        Swap. Style. Influence. Join the movement toward sustainable fashion.
      </p>

      <input
        type="password"
        placeholder="New Password"
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full p-2 mb-4 border rounded"
      />

      <button className="w-full bg-blue-800 text-white py-2 rounded-full mb-4">
        Reset Password
      </button>

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
