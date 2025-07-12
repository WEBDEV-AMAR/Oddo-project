import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "../db";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    
    bio: "",
    address: "",
    phone: "",
  });
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) {
      setUser(loggedUser);
      setFormData({
        fullName: loggedUser.fullName || "",
        password: loggedUser.password || "",
        bio: loggedUser.bio || "",
        address: loggedUser.address || "",
        phone: loggedUser.phone || "",
      });
      if (loggedUser.profileImage) setProfileImage(loggedUser.profileImage);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      setProfileImage(reader.result);
      await saveToDb({ profileImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const saveToDb = async (updates) => {
    try {
      const existingUser = await db.get(user.email);
      const updatedUser = {
        ...existingUser,
        ...updates,
      };
      await db.put(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleSave = async () => {
    await saveToDb(formData);
    setEditing(false);
  };

  if (!user) return null;

  return (
    <div className="bg-green-50 min-h-screen py-10 px-4 md:px-10 text-green-900">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-extrabold mb-6 text-center">My Profile</h2>

        <div className="flex flex-col items-center mb-6">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover mb-3 border-4 border-green-300"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center mb-3">
              <span className="text-gray-600">No Image</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm"
          />
        </div>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            {editing ? (
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            ) : (
              <p>{user.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <p>{user.email}</p>
          </div>

        
          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            {editing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            ) : (
              <p>{user.bio || "No bio added"}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            {editing ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            ) : (
              <p>{user.address || "No address added"}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            {editing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            ) : (
              <p>{user.phone || "No phone added"}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-full hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-800"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
