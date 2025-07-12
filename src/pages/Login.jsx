import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import loginImage from "../assets/images/login.png";

const Login = () => {
  return (
    <AuthLayout image={<img src={loginImage} alt="Login" className="w-48 h-48 md:w-64 md:h-64 object-contain" />}>
      <h2 className="text-2xl font-semibold mb-1">Login </h2>
      <p className="text-sm text-gray-600 mb-6">Swap. Style. Influence. Join the movement toward sustainable fashion.</p>
      <input type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" />
      <input type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" />
      <div className="flex justify-between text-sm mb-4">
        <span></span>
        <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
      </div>
      <button className="w-full bg-blue-800 text-white py-2 rounded-full mb-4">Log In</button>
      <p className="text-sm text-center">Don’t have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link></p>
    </AuthLayout>
  );
};

export default Login;
