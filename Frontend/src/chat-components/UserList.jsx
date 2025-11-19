// src/UserList.jsx
import React from "react";

export function UserList({ users }) {
  return (
    <div className="bg-black w-64 p-4  border rounded-lg border-gray-600 shadow-[3px_0_5px_rgba(0,0,0,0.5)]">
      <h2 className="font-bold mb-4 text-white">Active Users</h2>
      <ul className="space-y-2">
        {users.map((user, idx) => (
          <li
            key={idx}
            className="px-2 py-0.5 text-white rounded-md bg-gray-700 border-2 border-gray-700"
          >
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
}
