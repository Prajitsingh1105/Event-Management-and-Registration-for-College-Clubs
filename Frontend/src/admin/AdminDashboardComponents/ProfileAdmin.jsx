import React, { useState, useEffect } from "react";
import { fetchAdminProfile, updateAdminProfile } from "../../api.js";

const ProfileSection = ({ isOpen, onClose }) => {
  const [profile, setProfile] = useState({
    collegeName: "",
    location: "",
    emails: { general: "", clubs: "", teacher: "" },
    phoneNumbers: { helpdesk: "", emergency: "" },
    helpCenterLink: "",
    socialMedia: { instagram: "", facebook: "", twitter: "" },
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const loadProfile = async () => {
        const data = await fetchAdminProfile();
        if (!data.error) {
          setProfile({
            collegeName: data.collegeName || "",
            location: data.location || "",
            emails: {
              general: data.emails?.general || "",
              clubs: data.emails?.clubs || "",
              teacher: data.emails?.teacher || "",
            },
            phoneNumbers: {
              helpdesk: data.phoneNumbers?.helpdesk || "",
              emergency: data.phoneNumbers?.emergency || "",
            },
            helpCenterLink: data.helpCenterLink || "",
            socialMedia: {
              instagram: data.socialMedia?.instagram || "",
              facebook: data.socialMedia?.facebook || "",
              twitter: data.socialMedia?.twitter || "",
            },
          });
        }
      };
      loadProfile();
    }
  }, [isOpen]);

  const handleChange = (field, value, nestedField) => {
    if (nestedField) {
      setProfile({ ...profile, [nestedField]: { ...profile[nestedField], [field]: value } });
    } else {
      setProfile({ ...profile, [field]: value });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const res = await updateAdminProfile(profile);
    if (!res.error) {
      alert("Profile updated successfully");
      setEditing(false);
    } else {
      alert("Failed to update profile");
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10 z-50 overflow-auto">
      <div className="bg-gray-900 text-white p-6 rounded-xl w-11/12 max-w-3xl relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>

        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white font-bold"
        >
          X
        </button>

        
        <div className="space-y-4">
          <div>
            <label className="block mb-1">College Name</label>
            <input
              type="text"
              value={profile.collegeName}
              disabled={!editing}
              onChange={(e) => handleChange("collegeName", e.target.value)}
              className="p-2 rounded w-full bg-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1">Location</label>
            <input
              type="text"
              value={profile.location}
              disabled={!editing}
              onChange={(e) => handleChange("location", e.target.value)}
              className="p-2 rounded w-full bg-gray-700"
            />
          </div>

          <h3 className="text-xl font-semibold">Emails</h3>
          <div>
            <label className="block mb-1">General Email</label>
            <input
              type="email"
              value={profile.emails.general}
              disabled={!editing}
              onChange={(e) => handleChange("general", e.target.value, "emails")}
              className="p-2 rounded w-full bg-gray-700"
            />
          </div>
          <div>
            <label className="block mb-1">Clubs Email</label>
            <input
              type="email"
              value={profile.emails.clubs}
              disabled={!editing}
              onChange={(e) => handleChange("clubs", e.target.value, "emails")}
              className="p-2 rounded w-full bg-gray-700"
            />
          </div>
          <div>
            <label className="block mb-1">Teacher Email</label>
            <input
              type="email"
              value={profile.emails.teacher}
              disabled={!editing}
              onChange={(e) => handleChange("teacher", e.target.value, "emails")}
              className="p-2 rounded w-full bg-gray-700"
            />
          </div>

          <h3 className="text-xl font-semibold">Phone Numbers</h3>
          <div>
            <label className="block mb-1">Helpdesk</label>
            <input
              type="text"
              value={profile.phoneNumbers.helpdesk}
              disabled={!editing}
              onChange={(e) => handleChange("helpdesk", e.target.value, "phoneNumbers")}
              className="p-2 rounded w-full bg-gray-700"
            />
          </div>
          <div>
            <label className="block mb-1">Emergency</label>
            <input
              type="text"
              value={profile.phoneNumbers.emergency}
              disabled={!editing}
              onChange={(e) => handleChange("emergency", e.target.value, "phoneNumbers")}
              className="p-2 rounded w-full bg-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1">Help Center Link</label>
            <input
              type="text"
              value={profile.helpCenterLink}
              disabled={!editing}
              onChange={(e) => handleChange("helpCenterLink", e.target.value)}
              className="p-2 rounded w-full bg-gray-700"
            />
          </div>

          <h3 className="text-xl font-semibold">Social Media</h3>
          <div>
            <label className="block mb-1">Instagram</label>
            <input
              type="text"
              value={profile.socialMedia.instagram}
              disabled={!editing}
              onChange={(e) => handleChange("instagram", e.target.value, "socialMedia")}
              className="p-2 rounded w-full bg-gray-700"
            />
          </div>
          <div>
            <label className="block mb-1">Facebook</label>
            <input
              type="text"
              value={profile.socialMedia.facebook}
              disabled={!editing}
              onChange={(e) => handleChange("facebook", e.target.value, "socialMedia")}
              className="p-2 rounded w-full bg-gray-700"
            />
          </div>
          <div>
            <label className="block mb-1">Twitter</label>
            <input
              type="text"
              value={profile.socialMedia.twitter}
              disabled={!editing}
              onChange={(e) => handleChange("twitter", e.target.value, "socialMedia")}
              className="p-2 rounded w-full bg-gray-700"
            />
          </div>
        </div>

        
        <div className="mt-4 flex gap-2 justify-end">
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 font-bold"
            >
              Edit
            </button>
          )}
          {editing && (
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-green-500 py-2 px-4 rounded hover:bg-green-600 font-bold"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-red-500 py-2 px-4 rounded hover:bg-red-600 font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
