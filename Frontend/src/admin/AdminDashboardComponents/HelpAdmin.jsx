import React, { useState } from "react";

const ClubsSection = () => {
  const [clubs, setClubs] = useState([
    {
      id: 1,
      name: "Coding Club",
      description: "Innovating and building projects together.",
      logo: null,
      background: null,
      instagram: "https://instagram.com/codingclub",
      website: "https://codingclub.com",
    },
    {
      id: 2,
      name: "Art & Design Club",
      description: "Creativity unleashed through art and design.",
      logo: null,
      background: null,
      instagram: "https://instagram.com/artdesignclub",
      website: "https://artdesignclub.com",
    },
  ]);

  const [newClub, setNewClub] = useState({
    name: "",
    description: "",
    logo: null,
    background: null,
    instagram: "",
    website: "",
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setNewClub({ ...newClub, [name]: files[0] }); 
    } else {
      setNewClub({ ...newClub, [name]: value });
    }
  };

  const handleAddClub = () => {
    const id = Date.now();
    setClubs([...clubs, { id, ...newClub }]);
    setNewClub({
      name: "",
      description: "",
      logo: null,
      background: null,
      instagram: "",
      website: "",
    });
  };

  const deleteClub = (id) => {
    setClubs(clubs.filter((club) => club.id !== id));
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white flex gap-8">
      {/* Clubs List */}
      <div className="w-1/2 bg-gray-800 p-6 rounded-xl overflow-y-auto max-h-[80vh]">
        <h2 className="text-2xl font-bold mb-4">Clubs</h2>
        <div className="space-y-4">
          {clubs.map((club) => (
            <div key={club.id} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center gap-4">
                {club.logo && (
                  <img
                    src={URL.createObjectURL(club.logo)}
                    alt="logo"
                    className="w-12 h-12 object-cover rounded-full"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold">{club.name}</h3>
                  <p className="text-sm text-gray-300">{club.description}</p>
                  <p className="text-xs text-gray-400">
                    Instagram: <a href={club.instagram} target="_blank" rel="noopener noreferrer" className="underline text-blue-400">{club.instagram}</a>
                  </p>
                  <p className="text-xs text-gray-400">
                    Website: <a href={club.website} target="_blank" rel="noopener noreferrer" className="underline text-blue-400">{club.website}</a>
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="bg-blue-500 px-3 py-1 rounded text-sm">Update</button>
                <button
                  onClick={() => deleteClub(club.id)}
                  className="bg-red-500 px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Club Form */}
      <div className="w-1/2 bg-gray-800 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Add New Club</h2>
        <form className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Club Name"
            value={newClub.name}
            onChange={handleInputChange}
            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="One-line Description"
            value={newClub.description}
            onChange={handleInputChange}
            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400"
            required
          />
          <div className="flex gap-4">
            <input
              type="file"
              name="logo"
              onChange={handleInputChange}
              accept="image/*"
              className="block w-1/2 text-sm text-gray-300 cursor-pointer bg-gray-700 p-3 rounded"
            />
            <input
              type="file"
              name="background"
              onChange={handleInputChange}
              accept="image/*"
              className="block w-1/2 text-sm text-gray-300 cursor-pointer bg-gray-700 p-3 rounded"
            />
          </div>
          <input
            type="url"
            name="instagram"
            placeholder="Instagram Link"
            value={newClub.instagram}
            onChange={handleInputChange}
            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="url"
            name="website"
            placeholder="Website Link"
            value={newClub.website}
            onChange={handleInputChange}
            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <button
            type="button"
            onClick={handleAddClub}
            className="bg-green-500 py-3 rounded font-bold hover:bg-green-600"
          >
            Add Club
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClubsSection;
