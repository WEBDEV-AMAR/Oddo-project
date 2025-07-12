import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
        <h1
          className="text-3xl font-extrabold text-green-800 cursor-pointer"
          onClick={() => navigate("/")}
        >
          ReWear
        </h1>
        <div className="space-x-6 hidden md:flex">
          <Link to="/browse-items" className="hover:underline">
            Browse Items
          </Link>
          <button onClick={handleListItem} className="hover:underline">
            List an Item
          </button>
        </div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span
              className="text-sm cursor-pointer"
              onClick={handleProfileClick}
            >
              Hi, {user.fullName}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-full text-xs"
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
        <img
          src="https://images.unsplash.com/photo-1602810313345-52d4a416bd29"
          alt="Swap Clothes"
          className="w-full md:w-1/2 rounded-lg object-cover mb-6 md:mb-0 shadow-lg"
        />
        <div className="md:ml-12 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4 text-green-900">
            Swap, Redeem, ReWear
          </h2>
          <p className="text-gray-700 mb-6 max-w-md">
            Join the community to refresh your wardrobe sustainably.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <button
              onClick={handleListItem}
              className="bg-green-800 text-white px-6 py-2 rounded-full hover:bg-green-900"
            >
              Start Swapping
            </button>
            <Link
              to="/browse-items"
              className="bg-white border border-green-800 text-green-800 px-6 py-2 rounded-full hover:bg-green-100"
            >
              Browse Items
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="px-6 py-12">
        <h3 className="text-2xl font-bold mb-8 text-center text-green-800">
          Featured Items
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              src: "https://images.unsplash.com/photo-1618354691328-5e60b81b3d2e",
              name: "Beige crew sweater",
              points: 300,
            },
            {
              src: "https://images.unsplash.com/photo-1580316017863-3e6e25a6b8b3",
              name: "Bus denim jeans",
              points: 250,
            },
            {
              src: "https://images.unsplash.com/photo-1618354691748-29d19a393d4e",
              name: "Swap Dress",
              points: "Swap only",
            },
            {
              src: "https://images.unsplash.com/photo-1542068829-1115f7259450",
              name: "Corduroy jacket",
              points: 350,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow hover:shadow-md transition p-4 text-center"
            >
              <img
                src={item.src}
                alt={item.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.points} points</p>
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
