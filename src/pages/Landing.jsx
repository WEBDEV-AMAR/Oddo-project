import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="bg-cream min-h-screen text-green-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-cream">
        <h1 className="text-2xl font-bold">ReWear</h1>
        <div className="space-x-6 hidden md:flex">
          <Link to="/browse-items" className="hover:underline">Browse items</Link>
          <Link to="/list-item" className="hover:underline">List an item</Link>
        </div>
        <Link
          to="/login" // ✅ updated route
          className="bg-green-900 text-white px-4 py-2 rounded-full text-sm"
        >
          Login/Signup
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center px-6 py-12 bg-cream">
        <img
          src="https://images.unsplash.com/photo-1602810313345-52d4a416bd29"
          alt="Swap Clothes"
          className="w-full md:w-1/2 rounded-lg object-cover mb-6 md:mb-0"
        />
        <div className="md:ml-12 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">Swap, Redeem, ReWear</h2>
          <p className="text-gray-700 mb-6">
            Join the community to refresh your wardrobe sustainably.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link
              to="/signup" // ✅ Start Swapping goes to signup page
              className="bg-brown-500 text-white px-6 py-2 rounded-full"
            >
              Start Swapping
            </Link>
            <Link
              to="/browse-items" // ✅ Browse Items button route
              className="bg-white border border-gray-400 px-6 py-2 rounded-full"
            >
              Browse Items
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="px-6 py-8">
        <h3 className="text-xl font-bold mb-4">Featured Items</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <img src="https://images.unsplash.com/photo-1618354691328-5e60b81b3d2e" alt="Beige Sweater" className="w-full h-40 object-cover mb-2 rounded" />
            <p>Beige crew sweater</p>
            <p className="text-gray-600 text-sm">300 points</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <img src="https://images.unsplash.com/photo-1580316017863-3e6e25a6b8b3" alt="Bus denim jeans" className="w-full h-40 object-cover mb-2 rounded" />
            <p>Bus denim jeans</p>
            <p className="text-gray-600 text-sm">250 points</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <img src="https://images.unsplash.com/photo-1618354691748-29d19a393d4e" alt="Swap Dress" className="w-full h-40 object-cover mb-2 rounded" />
            <p>Swap or Redeem</p>
            <p className="text-gray-600 text-sm">Swap only</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <img src="https://images.unsplash.com/photo-1542068829-1115f7259450" alt="Corduroy jacket" className="w-full h-40 object-cover mb-2 rounded" />
            <p>Corduroy jacket</p>
            <p className="text-gray-600 text-sm">350 points</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-cream px-6 py-12">
        <h3 className="text-xl font-bold mb-8 text-center">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-3xl mb-2">👕</p>
            <h4 className="font-semibold mb-2">List Your Clothing</h4>
            <p className="text-gray-700 text-sm">Upload your gently used garments</p>
          </div>
          <div>
            <p className="text-3xl mb-2">🔄</p>
            <h4 className="font-semibold mb-2">Swap or Redeem</h4>
            <p className="text-gray-700 text-sm">Exchange items directly or use earned points</p>
          </div>
          <div>
            <p className="text-3xl mb-2">✨</p>
            <h4 className="font-semibold mb-2">ReWear & Refresh</h4>
            <p className="text-gray-700 text-sm">Update your wardrobe with pre-loved fashion</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
