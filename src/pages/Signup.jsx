import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import signupImage from "../assets/images/Signup.png";
import db from "../db";

const Signup = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!agree) {
      alert("Please agree to terms and conditions");
      return;
    }

    try {
      const user = {
        _id: email,
        fullName,
        email,
        password // ⚠️ Plaintext for learning; hash in production
      };
      await db.put(user);
      alert("Signup successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error.status === 409) alert("User already exists.");
      else alert("Error registering user.");
    }
  };

  return (
    <AuthLayout image={<img src={signupImage} alt="Signup" className="w-48 h-48 md:w-64 md:h-64 object-contain" />}>
      <h2 className="text-2xl font-semibold mb-1">Signup Panel</h2>
      <p className="text-sm text-gray-600 mb-6">Swap. Style. Influence. Join the movement toward sustainable fashion.</p>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-2 mb-4 border rounded" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-4 border rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-4 border rounded" required />
        <label className="text-sm flex items-center mb-4">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mr-2" /> I have read and agree to the terms and conditions
        </label>
        <button type="submit" className="w-full bg-blue-800 text-white py-2 rounded-full mb-4">Sign Up</button>
      </form>
      <p className="text-sm text-center">Already have an account? <Link to="/" className="text-blue-500 hover:underline">Login</Link></p>
    </AuthLayout>
  );
};

export default Signup;
