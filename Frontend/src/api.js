const Base_URL = "http://localhost:3000/api";

export const signup = async (userData) => {
  try {
    const res = await fetch(`${Base_URL}/signup`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await res.json();
  } catch (err) {
    console.log("Signup error:", err);
    return { error: "SignIn failed" };
  }
};


export const login = async (userData) => {
  try {
    const res = await fetch(`${Base_URL}/login`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.log("Login error:", err);
    return { error: "Login failed" };
  }
};

export const fetchCurrentUser = async (userData) => {
  try {
    const res = await fetch(`${Base_URL}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    console.log("fetching",res);
    return await res.json();
    
  } catch (err) {
    console.log("Fetch user error:", err);
    return { error: "Failed to fetch user" };
  }
};

export const adminLogin = async (adminData) => {
  try {
    const res = await fetch(`${Base_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminData),
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.log("Admin login error:", err);
    return { error: "Admin login failed" };
  }
};

export const fetchAdmin = async () => {
  try {
    const res = await fetch(`${Base_URL}/admin/me`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.log("Fetch admin error:", err);
    return { error: "Failed to fetch admin" };
  }
};

export const addUpcomingEvent = async (eventData) => {
  try {
    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("venue", eventData.venue);
    formData.append("organisedBy", eventData.organisedBy);
    if (eventData.image) formData.append("image", eventData.image);

    const res = await fetch(`${Base_URL}/upcomingEvents`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    return await res.json();
  } catch (err) {
    console.log("Add upcoming event error:", err);
    return { error: "Failed to add upcoming event" };
  }
};

export const fetchUpcomingEvents = async () => {
  try {
    const res = await fetch(`${Base_URL}/upcomingEvents`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.log("Fetch upcoming events error:", err);
    return { error: "Failed to fetch upcoming events" };
  }
};

export const addPastEvent = async (eventData) => {
  try {
    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("venue", eventData.venue);
    formData.append("organisedBy", eventData.organisedBy);

    if (eventData.images && eventData.images.length > 0) {
      Array.from(eventData.images).forEach((img) => formData.append("images", img));
    }

    const res = await fetch(`${Base_URL}/pastEvents`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    return await res.json();
  } catch (err) {
    console.log("Add past event error:", err);
    return { error: "Failed to add past event" };
  }
};

export const fetchPastEvents = async () => {
  try {
    const res = await fetch(`${Base_URL}/pastEvents`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.log("Fetch past events error:", err);
    return { error: "Failed to fetch past events" };
  }
};

export const fetchClubs = async () => {
  try {
    const res = await fetch(`${Base_URL}/clubsAdmin`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Fetch clubs error:", err);
    return { error: "Failed to fetch clubs" };
  }
};

export const addClub = async (clubData) => {
  try {
    const formData = new FormData();
    formData.append("name", clubData.name);
    formData.append("detail", clubData.detail);
    formData.append("instagram", clubData.instagram || "");
    formData.append("website", clubData.website || "");
    if (clubData.logo) formData.append("logo", clubData.logo);
    if (clubData.backgroundImage) formData.append("backgroundImage", clubData.backgroundImage);

    const res = await fetch(`${Base_URL}/clubsAdmin`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Add club error:", err);
    return { error: "Failed to add club" };
  }
};

export const updateClub = async (id, clubData) => {
  try {
    const formData = new FormData();
    if (clubData.name) formData.append("name", clubData.name);
    if (clubData.detail) formData.append("detail", clubData.detail);
    if (clubData.instagram) formData.append("instagram", clubData.instagram);
    if (clubData.website) formData.append("website", clubData.website);
    if (clubData.logo) formData.append("logo", clubData.logo);
    if (clubData.backgroundImage) formData.append("backgroundImage", clubData.backgroundImage);

    const res = await fetch(`${Base_URL}/clubsAdmin/${id}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Update club error:", err);
    return { error: "Failed to update club" };
  }
};

export const deleteClub = async (id) => {
  try {
    const res = await fetch(`${Base_URL}/clubsAdmin/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.error("Delete club error:", err);
    return { error: "Failed to delete club" };
  }
};

export const fetchAdminProfile = async () => {
  try {
    const res = await fetch(`${Base_URL}/adminProfile`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (err) {
    console.log("Fetch admin profile error:", err);
    return { error: "Failed to fetch admin profile" };
  }
};

export const updateAdminProfile = async (profileData) => {
  try {
    const res = await fetch(`${Base_URL}/adminProfile`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });
    return await res.json();
  } catch (err) {
    console.log("Update admin profile error:", err);
    return { error: "Failed to update admin profile" };
  }
};

export const fetchPublicClubs = async () => {
  try {
    const res = await fetch(`${Base_URL}/clubsAdmin/public`, {
      method: "GET",
      credentials: "include",
    });

    return await res.json();
  } catch (err) {
    console.error("Fetch public clubs error:", err);
    return { error: "Failed to fetch public clubs" };
  }
};
