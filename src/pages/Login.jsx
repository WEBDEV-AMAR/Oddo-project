import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import loginImage from "../assets/images/login.png";
import db from "../db";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await db.get(email);
      if (user.password === password) {
        alert("Login successful!");
        console.log("Logged in user:", user);
        // navigate("/dashboard");
      } else {
        alert("Incorrect password.");
      }
    } catch (error) {
      console.error(error);
      if (error.status === 404) alert("User not found.");
      else alert("Error logging in.");
    }
  };

  return (
    <AuthLayout image={<img src={loginImage} alt="Login" className="w-48 h-48 md:w-64 md:h-64 object-contain" />}>
      <h2 className="text-2xl font-semibold mb-1">Login</h2>
      <p className="text-sm text-gray-600 mb-6">Swap. Style. Influence. Join the movement toward sustainable fashion.</p>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-4 border rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-4 border rounded" required />
        <div className="flex justify-between text-sm mb-4">
          <span></span>
          <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
        </div>
        <button type="submit" className="w-full bg-blue-800 text-white py-2 rounded-full mb-4">Log In</button>
      </form>
      <p className="text-sm text-center">Don’t have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link></p>
    </AuthLayout>
  );
};

export default Login;
