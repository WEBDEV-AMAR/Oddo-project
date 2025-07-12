import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import signupImage from "../assets/images/Signup.png";

const Signup = () => {
  return (
    <AuthLayout image={<img src={signupImage} alt="Signup" className="w-48 h-48 md:w-64 md:h-64 object-contain" />}>
      <h2 className="text-2xl font-semibold mb-1">Login panel</h2>
      <p className="text-sm text-gray-600 mb-6">Swap. Style. Influence. Join the movement toward sustainable fashion.</p>
      <input type="text" placeholder="Full Name" className="w-full p-2 mb-4 border rounded" />
      <input type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" />
      <input type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" />
      <label className="text-sm flex items-center mb-4">
        <input type="checkbox" className="mr-2" /> I have read and agree to the terms and conditions
      </label>
      <button className="w-full bg-blue-800 text-white py-2 rounded-full mb-4">Sign Up</button>
      <p className="text-sm text-center">Already have an account? <Link to="/" className="text-blue-500 hover:underline">Login</Link></p>
    </AuthLayout>
  );
};

export default Signup;
