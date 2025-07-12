import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import forgotImage from "../assets/images/forgot.png";

const ForgotPassword = () => {
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
      <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-center sm:text-left">Login </h2>
      <p className="text-sm text-gray-600 mb-6 text-center sm:text-left">
        Swap. Style. Influence. Join the movement toward sustainable fashion
      </p>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-4 border border-gray-300 rounded text-sm"
      />

      <p className="text-xs text-gray-500 mb-4">
        We will send a forgot password link to your email
      </p>

      <button className="w-full bg-blue-800 text-white py-2 rounded-full text-sm">
        Forgot Password
      </button>

      <div className="mt-4 space-y-2 text-center text-sm">
        <p>
          Already got the link?{" "}
          <Link to="/reset-password" className="text-blue-500 hover:underline">
            Reset Password
          </Link>
        </p>
        <p>
          I have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
