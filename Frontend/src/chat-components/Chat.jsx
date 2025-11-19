// src/chat-components/Chat.jsx
import React, { useEffect, useState, useRef } from "react";
import { socket } from "../socket";
import EmojiPicker from "emoji-picker-react";

export default function Chat({ username }) {
  const [message, setMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const emojiRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Socket connection
  useEffect(() => {
    if (!username) return;

    socket.connect();
    socket.emit("join", username);

    socket.on("init", ({ messages, users }) => {
      setMessages(messages);
      setUsers(users);
    });

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("activeUsers", setUsers);

    return () => {
      socket.off("init");
      socket.off("message");
      socket.off("activeUsers");
      socket.disconnect();
    };
  }, [username]);

  // Auto-scroll to latest message
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Emoji picker click outside
  const handleClickOutsideEmoji = (e) => {
    if (emojiRef.current && !emojiRef.current.contains(e.target)) {
      setShowEmojis(false);
    }
  };

  useEffect(() => {
    if (showEmojis) {
      document.addEventListener("mousedown", handleClickOutsideEmoji);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideEmoji);
    }
    return () => document.removeEventListener("mousedown", handleClickOutsideEmoji);
  }, [showEmojis]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { text: message });
      setMessage("");
    }
  };

  const appendEmojiToMessage = (emojiObj) => {
    setMessage((prev) => prev + emojiObj.emoji);
  };

  return (
    <div className="flex h-[800px] w-[1000px] bg-black p-2">
      {/* Users Sidebar */}
      <div className="w-52 bg-gray-900 rounded-xl p-3 text-white">
        <h2 className="font-bold mb-3">Users Online</h2>
        <ul className="space-y-2">
          {users.map((u, i) => (
            <li key={i} className="text-sm">
              {u}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1 bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-lg overflow-hidden ml-2">
        {/* Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide"
        >
          {messages.map((msg, index) => {
            if (msg.type === "system") {
              return (
                <div key={index} className="text-center text-gray-400 italic text-sm">
                  {msg.text}
                </div>
              );
            }
            const isMe = msg.user === username;
            return (
              <div
                key={index}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs sm:max-w-md p-3 rounded-xl relative shadow-md ${
                    isMe ? "bg-pink-500 text-white" : "bg-gray-700 text-white"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-black font-bold text-xs">
                      {msg.user.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-sm">{msg.user}</span>
                  </div>
                  <div className="text-sm">{msg.text}</div>
                  <div className="absolute bottom-1 right-2 text-[10px] text-gray-300">
                    {new Date(msg.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="relative flex items-center gap-3 p-3 bg-gray-800 border-t border-pink-500/20">
          {/* Emoji Button */}
          <button
            className="w-10 h-10 bg-gray-900 hover:bg-gray-700 rounded-full flex justify-center items-center shadow-md"
            onClick={() => setShowEmojis((prev) => !prev)}
            aria-label="Toggle Emoji Picker"
          >
            <span className="text-xl">😊</span>
          </button>

          {/* Emoji Picker */}
          {showEmojis && (
            <div
              ref={emojiRef}
              className="absolute bottom-16 left-4 z-50 bg-gray-900 rounded-lg shadow-lg overflow-hidden"
            >
              <EmojiPicker
                onEmojiClick={appendEmojiToMessage}
                theme="dark"
                lazyLoadEmojis
              />
            </div>
          )}

          {/* Input Field */}
          <input
            className="flex-1 p-3 rounded-full bg-gray-900 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-500 transition"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Type your message..."
          />

          {/* Send Button */}
          <button
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              message.trim()
                ? "bg-gradient-to-r from-pink-500 to-yellow-400 text-white"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
            onClick={sendMessage}
            disabled={!message.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
