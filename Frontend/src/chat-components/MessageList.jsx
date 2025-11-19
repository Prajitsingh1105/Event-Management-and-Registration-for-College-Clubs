// src/MessageList.jsx
import React from "react";
import moment from "moment";

export function MessageList({ messages }) {
  return (
    <div className="space-y-6">
      {messages.map((msg) => {
        if (msg.type === "system") {
          return (
            <div key={msg.id} className="text-center text-gray-400 text-sm italic">
              {msg.text}
            </div>
          );
        }

        return (
          <div key={msg.id} className="flex items-start space-x-3">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-bold">
                {msg.user.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Message Content */}
            <div className="max-w-[75%]">
              {/* Sender name */}
              <div className="text-sm font-semibold text-pink-300">
                {msg.user}
              </div>

              {/* Message bubble */}
              <div className="px-4 py-3 mt-1 rounded-lg bg-gray-800 text-gray-100">
                {msg.text}
              </div>

              {/* Timestamp */}
              <div className="text-xs text-gray-500 mt-1 text-right">
                {moment(msg.time).format("hh:mm A")}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
