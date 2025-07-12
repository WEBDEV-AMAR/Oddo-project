import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/images/logo.jpg";
import MainImage from "../assets/images/Main.jpg";
import MenImage from "../assets/images/men.jpg";
import WomenImage from "../assets/images/female.jpg";
import KidImage from "../assets/images/kid.jpg";

const Landing = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleListItem = () => {
    if (user) {
      navigate("/list-item");
    } else {
      navigate("/login");
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="bg-cream min-h-screen text-green-900 font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 shadow bg-white">
        <img
          src={logo}
          alt="ReWear Logo"
          className="h-20 w-20 rounded-full cursor-pointer"
          onClick={() => navigate("/")}
        />

        <div className="space-x-6 hidden md:flex">
          <Link to="/browse-items" className="hover:underline text-xl">
            Browse Items
          </Link>
          <button onClick={handleListItem} className="hover:underline text-xl">
            List an Item
          </button>
        </div>

        {user ? (
          <div className="flex items-center space-x-4">
            <span
              className="text-lg font-medium cursor-pointer"
              onClick={handleProfileClick}
            >
              Hi, {user.fullName}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-full text-xl"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-green-800 text-white px-4 py-2 rounded-full text-sm"
          >
            Login / Signup
          </Link>
        )}
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center px-6 py-12 bg-gradient-to-r from-green-50 to-green-100">
        <div className="w-full md:w-3/4 max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={MainImage}
            alt="Swap Event"
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="md:ml-12 text-center md:text-left mt-6 md:mt-0">
          <h2 className="text-4xl font-bold mb-4 text-green-900">
            Swap, Redeem, ReWear
          </h2>
          <p className="text-gray-700 mb-6 max-w-md">
            Join the community to refresh your wardrobe sustainably.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link
              to="/browse-items"
              className="bg-green-800 text-white px-6 py-2 rounded-full hover:bg-green-900"
            >
              Start Swapping
            </Link>
            <Link
              to="/browse-items"
              className="bg-white border border-green-800 text-green-800 px-6 py-2 rounded-full hover:bg-green-100"
            >
              Browse Items
            </Link>
          </div>
        </div>
      </section>

      
    

      {/* Categories Section */}
      <section className="px-6 py-12 bg-green-50">
        <h3 className="text-2xl font-bold mb-10 text-center text-green-800">
          Shop by Category
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { name: "Men", image: MenImage, className: "" },
            { name: "Women", image: WomenImage, className: "mt-[-20px]" },
            { name: "Kids", image: KidImage, className: "mt-[-20px]" },
          ].map((category, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 cursor-pointer ${category.className}`}
              onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-60 object-cover rounded mb-4"
              />
              <h4 className="text-xl font-semibold text-green-900">
                {category.name}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-green-50 px-6 py-12">
        <h3 className="text-2xl font-bold mb-10 text-center text-green-800">
          How It Works
        </h3>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              emoji: "👕",
              title: "List Your Clothing",
              desc: "Upload your gently used garments",
            },
            {
              emoji: "🔄",
              title: "Swap or Redeem",
              desc: "Exchange items directly or use earned points",
            },
            {
              emoji: "✨",
              title: "ReWear & Refresh",
              desc: "Update your wardrobe with pre-loved fashion",
            },
          ].map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <p className="text-4xl mb-4">{step.emoji}</p>
              <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
              <p className="text-gray-700 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;


