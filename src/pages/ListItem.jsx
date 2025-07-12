import { useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "../db";

const ListItem = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [tags, setTags] = useState("");
  const [imageData, setImageData] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageData(reader.result); // ✅ base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !type || !size || !condition || !imageData) {
      setError("Please fill in all required fields.");
      return;
    }

    const item = {
      _id: new Date().toISOString(),
      title,
      description,
      category,
      type,
      size,
      condition,
      tags: tags.split(",").map((tag) => tag.trim()),
      imageData,
      createdAt: new Date().toISOString(),
      availability: "Available",
    };

    try {
      await db.put(item);
      navigate("/browse-items"); // ✅ redirect after listing
    } catch (err) {
      console.error(err);
      setError("Error listing item. Try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-800">List a New Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-semibold">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          {imageData && (
            <img
              src={imageData}
              alt="Preview"
              className="w-40 h-40 object-cover rounded mt-2 mx-auto"
            />
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            placeholder="Item Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            placeholder="Describe your item..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Type</option>
            <option value="Swap">Swap</option>
            <option value="Redeem">Redeem</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Size</label>
          <input
            type="text"
            placeholder="e.g. S, M, L, XL"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Condition</label>
          <input
            type="text"
            placeholder="e.g. New, Like New, Used"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Tags</label>
          <input
            type="text"
            placeholder="Comma separated tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-800 text-white py-2 rounded-full hover:bg-green-900"
        >
          List Item
        </button>
      </form>
    </div>
  );
};

export default ListItem;
