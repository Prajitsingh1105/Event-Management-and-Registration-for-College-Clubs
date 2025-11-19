import React, { useState, useEffect } from "react";
import { fetchClubs, addClub, updateClub, deleteClub } from "../../api";

const ClubsSection = () => {
  const [clubs, setClubs] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    detail: "",
    instagram: "",
    website: "",
    logo: null,
    backgroundImage: null,
  });
  const [editingClubId, setEditingClubId] = useState(null); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadClubs = async () => {
      const data = await fetchClubs();
      setClubs(data);
    };
    loadClubs();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let savedClub;
      if (editingClubId) {
        savedClub = await updateClub(editingClubId, formData);
        setClubs(clubs.map(c => c._id === editingClubId ? savedClub : c));
        setEditingClubId(null);
      } else {
        savedClub = await addClub(formData);
        setClubs([...clubs, savedClub]);
      }
      setFormData({
        name: "",
        detail: "",
        instagram: "",
        website: "",
        logo: null,
        backgroundImage: null,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to save club");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (club) => {
    setEditingClubId(club._id);
    setFormData({
      name: club.name,
      detail: club.detail,
      instagram: club.instagram,
      website: club.website,
      logo: null, 
      backgroundImage: null, 
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteClub(id);
      setClubs(clubs.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete club");
    }
  };

  return (
    <div className="p-6 flex gap-8 bg-gray-900 text-white min-h-screen">
      {/* Clubs List */}
      <div className="w-1/2 bg-gray-800 p-6 rounded-xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Clubs</h2>
        <div className="space-y-4">
          {clubs.map((club) => (
            <div key={club._id} className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">{club.name}</h3>
              <p className="text-sm text-gray-300">{club.detail}</p>
              <p className="text-xs text-gray-400">
                Instagram: {club.instagram} | Website: {club.website}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-blue-500 px-3 py-1 rounded text-sm"
                  onClick={() => handleEdit(club)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 px-3 py-1 rounded text-sm"
                  onClick={() => handleDelete(club._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      

      
      <div className="w-1/2 bg-gray-800 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">
          {editingClubId ? "Update Club" : "Add New Club"}
        </h2>
        <form className="grid grid-cols-1 gap-4" onSubmit={(e) => e.preventDefault()}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="p-3 rounded bg-gray-700 text-white"
          />

          <label>Detail</label>
          <input
            type="text"
            name="detail"
            value={formData.detail}
            onChange={handleInputChange}
            className="p-3 rounded bg-gray-700 text-white"
          />

          <label>Instagram</label>
          <input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleInputChange}
            className="p-3 rounded bg-gray-700 text-white"
          />

          <label>Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="p-3 rounded bg-gray-700 text-white"
          />

          <label>Logo</label>
          <input type="file" name="logo" onChange={handleFileChange} />

          <label>Background Image</label>
          <input type="file" name="backgroundImage" onChange={handleFileChange} />

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-green-500 py-3 rounded font-bold mt-2 hover:bg-green-600"
            disabled={loading}
          >
            {editingClubId ? "Update Club" : "Add Club"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClubsSection;
