import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';

const BrowseItemsPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({ category: '', size: '', type: '' });
  const [sortOption, setSortOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Check logged in user from localStorage
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser) {
      setUser(loggedUser);
    } else {
      setUser(null);
    }

    // Dummy data
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const isFilterActive = () => {
    return (
      searchQuery.trim() !== '' ||
      filters.category !== '' ||
      filters.size !== '' ||
      filters.type !== ''
    );
  };

  const filteredItems = items
    .filter(item =>
      (!filters.category || item.category === filters.category) &&
      (!filters.size || item.size === filters.size) &&
      (!filters.type || item.type === filters.type)
    )
    .filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortOption === 'recent') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOption === 'lowToHigh') return a.points - b.points;
      if (sortOption === 'highToLow') return b.points - a.points;
      return 0;
    });

  return (
    <div className="bg-cream min-h-screen text-green-900 px-6 py-6">
      {/* Navbar */}
      <nav className="bg-white shadow sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <img
          src={logo}
          alt="ReWear Logo"
          className="h-30 w-20 rounded-full cursor-pointer"
          onClick={() => navigate("/")}></img>

        <div className="hidden md:flex gap-6">
          <span className="text-green-800 text-lg hover:underline cursor-pointer" onClick={() => navigate('/')}>Home</span>
          <span className="text-green-800 text-lg hover:underline cursor-pointer" onClick={() => navigate('/list-item')}>List an Item</span>
        </div>

        {user ? (
          // Show profile icon if logged in
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

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-2">
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-64"
        />
        <select name="category" onChange={handleFilterChange} className="border px-3 py-2 rounded-md w-full md:w-auto" value={filters.category}>
          <option value="">All Categories</option>
          <option value="Tops">Tops</option>
          <option value="Jeans">Jeans</option>
          <option value="Jackets">Jackets</option>
        </select>
        <select name="size" onChange={handleFilterChange} className="border px-3 py-2 rounded-md w-full md:w-auto" value={filters.size}>
          <option value="">All Sizes</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
        <select name="type" onChange={handleFilterChange} className="border px-3 py-2 rounded-md w-full md:w-auto" value={filters.type}>
          <option value="">All Types</option>
          <option value="swap">Swap</option>
          <option value="redeem">Redeem</option>
        </select>
        <select onChange={handleSortChange} className="border px-3 py-2 rounded-md w-full md:w-auto" value={sortOption}>
          <option value="">Sort by</option>
          <option value="recent">Recently Added</option>
          <option value="lowToHigh">Points: Low to High</option>
          <option value="highToLow">Points: High to Low</option>
        </select>
      </div>

      {/* Browsed Items heading always visible */}
      {isFilterActive() && (
  <h2 className="text-xl font-semibold mb-4 text-green-900">Browsed Items</h2>
)}

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
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
            <p className="text-sm mb-1"><strong>Size:</strong> {selectedItem.size}</p>
            <p className="text-sm mb-1"><strong>Condition:</strong> {selectedItem.condition}</p>
            <p className="text-sm mb-4"><strong>Points:</strong> {selectedItem.points}</p>
            <div className="flex gap-3 flex-wrap justify-end">
              <button
                onClick={() => alert('Swap Requested!')}
                className="bg-yellow-600 text-white px-4 py-1 rounded hover:bg-yellow-700"
              >
                Request Swap
              </button>
              <button
                onClick={() => alert('Redeemed!')}
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
