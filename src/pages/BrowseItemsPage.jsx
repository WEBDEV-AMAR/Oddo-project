import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';

const BrowseItemsPage = () => {
  const navigate = useNavigate();

  // User state for logged-in user info
  const [user, setUser] = useState(null);

  // Items to display
  const [items, setItems] = useState([]);

  // Filters for category, size, type
  const [filters, setFilters] = useState({ category: '', size: '', type: '' });

  // Sorting option
  const [sortOption, setSortOption] = useState('');

  // Search input text
  const [searchQuery, setSearchQuery] = useState('');

  // Selected item for modal details
  const [selectedItem, setSelectedItem] = useState(null);

  // On component mount, get user from localStorage and set dummy items
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedUser || null);

    // Dummy items data
    const dummyItems = [
      {
        _id: '1',
        title: 'Vintage Denim Jacket',
        imageURL: 'https://source.unsplash.com/400x400/?jacket,denim',
        category: 'Jackets',
        size: 'M',
        type: 'swap',
        condition: 'Good',
        points: 40,
        description: 'Classic blue denim jacket in good condition.',
        createdAt: new Date().toISOString(),
        tags: ['denim', 'blue', 'jacket'],
      },
      {
        _id: '2',
        title: 'Striped Crop Top',
        imageURL: 'https://source.unsplash.com/400x400/?top,women',
        category: 'Tops',
        size: 'S',
        type: 'redeem',
        condition: 'Like New',
        points: 25,
        description: 'Trendy crop top with stripes, barely worn.',
        createdAt: new Date().toISOString(),
        tags: ['striped', 'summer', 'top'],
      },
      {
        _id: '3',
        title: 'Black Skinny Jeans',
        imageURL: 'https://source.unsplash.com/400x400/?jeans,black',
        category: 'Jeans',
        size: 'L',
        type: 'swap',
        condition: 'Used',
        points: 30,
        description: 'Comfy black jeans with a snug fit.',
        createdAt: new Date().toISOString(),
        tags: ['jeans', 'black', 'skinny'],
      },
      {
        _id: '4',
        title: 'Floral Summer Dress',
        imageURL: 'https://source.unsplash.com/400x400/?dress,floral',
        category: 'Tops',
        size: 'M',
        type: 'redeem',
        condition: 'New',
        points: 50,
        description: 'Lightweight floral dress, perfect for summer.',
        createdAt: new Date().toISOString(),
        tags: ['dress', 'floral', 'summer'],
      },
    ];

    setItems(dummyItems);
  }, []);

  // Update filters state on change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Update sort option state
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Check if any filter or search is active to show the heading
  const isFilterActive = () => {
    return (
      searchQuery.trim() !== '' ||
      filters.category !== '' ||
      filters.size !== '' ||
      filters.type !== ''
    );
  };

  // Apply filtering, searching and sorting on items
  const filteredItems = items
    // Filter by category, size, type
    .filter(
      (item) =>
        (!filters.category || item.category === filters.category) &&
        (!filters.size || item.size === filters.size) &&
        (!filters.type || item.type === filters.type)
    )
    // Search by title or tags
    .filter((item) => {
      const lowerSearch = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(lowerSearch) ||
        item.tags.some((tag) => tag.toLowerCase().includes(lowerSearch))
      );
    })
    // Sort items based on sortOption
    .sort((a, b) => {
      if (sortOption === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOption === 'lowToHigh') return a.points - b.points;
      if (sortOption === 'highToLow') return b.points - a.points;
      return 0;
    });

  // Handle redeem or swap button click
  const handleActionClick = (action, item) => {
    if (!user) {
      alert('Please log in to proceed.');
      navigate('/login');
      return;
    }

    if (action === 'redeem') {
      if (user.points < item.points) {
        alert("You don't have enough points to redeem this item.");
      } else {
        alert('Redeemed successfully!');
        // Deduct points
        const updatedUser = { ...user, points: user.points - item.points };
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Save updated user to localStorage
        setUser(updatedUser); // Update user state
      }
    }

    if (action === 'swap') {
      alert('Swap request sent!');
      navigate('/profile');
    }
  };

  return (
    <div className="bg-cream min-h-screen text-green-900 px-6 py-6">
      {/* Navbar */}
      <nav className="bg-white shadow sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <img
          src={logo}
          alt="ReWear Logo"
          className="h-30 w-20 rounded-full cursor-pointer"
          onClick={() => navigate('/')}
        />
        <div className="hidden md:flex gap-6">
          <span
            className="text-green-800 text-lg hover:underline cursor-pointer"
            onClick={() => navigate('/')}
          >
            Home
          </span>
          <span
            className="text-green-800 text-lg hover:underline cursor-pointer"
            onClick={() => navigate('/list-item')}
          >
            List an Item
          </span>
        </div>

        {user ? (
          <div className="relative">
            <button
              onClick={() => navigate('/profile')}
              title="Go to Profile"
              className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-lg hover:bg-green-800"
            >
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-green-900 text-white px-4 py-2 rounded-full text-sm hover:bg-green-800"
          >
            Login/Signup
          </button>
        )}
      </nav>

      {/* Main Heading */}
      <h1 className="text-3xl font-bold mt-6 mb-2 text-green-900">Browse Items</h1>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-2">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-64"
        />

        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded-md w-full md:w-auto"
        >
          <option value="">All Categories</option>
          <option value="Tops">Tops</option>
          <option value="Jeans">Jeans</option>
          <option value="Jackets">Jackets</option>
        </select>

        <select
          name="size"
          value={filters.size}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded-md w-full md:w-auto"
        >
          <option value="">All Sizes</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>

        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded-md w-full md:w-auto"
        >
          <option value="">All Types</option>
          <option value="swap">Swap</option>
          <option value="redeem">Redeem</option>
        </select>

        <select
          value={sortOption}
          onChange={handleSortChange}
          className="border px-3 py-2 rounded-md w-full md:w-auto"
        >
          <option value="">Sort by</option>
          <option value="recent">Recently Added</option>
          <option value="lowToHigh">Points: Low to High</option>
          <option value="highToLow">Points: High to Low</option>
        </select>
      </div>

      {/* Browsed Items heading if any filter or search active */}
      {isFilterActive() && (
        <h2 className="text-xl font-semibold mb-4 text-green-900">Browsed Items</h2>
      )}

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow hover:shadow-md transition duration-200 p-4 text-center flex flex-col"
            >
              <img
                src={item.imageURL}
                alt={item.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.category}</p>
              <p className="font-medium my-1">{item.points} pts</p>
              <button
                onClick={() => setSelectedItem(item)}
                className="mt-auto bg-green-900 text-white px-4 py-1 rounded-full text-sm hover:bg-green-800"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No items found.</p>
        )}
      </div>

      {/* Item Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>
            <img
              src={selectedItem.imageURL}
              alt={selectedItem.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
            <p className="text-gray-700 mb-3">{selectedItem.description}</p>
            <p className="text-sm mb-1">
              <strong>Size:</strong> {selectedItem.size}
            </p>
            <p className="text-sm mb-1">
              <strong>Condition:</strong> {selectedItem.condition}
            </p>
            <p className="text-sm mb-4">
              <strong>Points:</strong> {selectedItem.points}
            </p>
            <div className="flex gap-3 flex-wrap justify-end">
              <button
                onClick={() => handleActionClick('swap', selectedItem)}
                className="bg-yellow-600 text-white px-4 py-1 rounded hover:bg-yellow-700"
              >
                Request Swap
              </button>
              <button
                onClick={() => handleActionClick('redeem', selectedItem)}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Redeem via Points
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseItemsPage;
