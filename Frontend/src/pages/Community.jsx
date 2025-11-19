import React, { useState,useEffect } from 'react'
import Navbar from './NavBar'
import Chat from '../chat-components/Chat';
import { fetchCurrentUser } from '../api';
import Footer from './Footer';

function Community() {
  const [username, setUsername] = useState(``);
  useEffect(() => {
    const getUser = async () => {
      const data = await fetchCurrentUser();
      if (data.username) setUsername(data.username);
    };
    getUser();
  }, []);
  return (
    <div className="min-h-screen w-full relative">
      
      <div className="absolute inset-0 z-0 bg-black" />


      <Navbar />

      
      <div className="relative z-10 flex items-center justify-center h-screen text-white  flex-col">
        <h1 className="text-center text-4xl font-bold text-white py-6">
          Community Chat
        </h1>

        <div className="flex-1">
          <Chat username={username}/>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Community
