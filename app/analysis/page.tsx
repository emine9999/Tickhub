'use client';
import { MyContextProvider } from '../Contexts/ContextProvider';
import React, { useEffect, useState } from 'react';
import { User, SideBar, Chat, NavBar, UserInput, ReqInput } from '../components';
import { BsStars } from "react-icons/bs";
import { FaRegUser } from 'react-icons/fa';
import { HiMenu, HiX } from "react-icons/hi";

export default function Analysis() {
  interface ChatMessage {
    id: number;
    user: string;
    message: string;
    timestamp: string;
  }
  
  interface Chat {
    id: number;
    title: string;
    messages: ChatMessage[];
  }

  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleChatClick = (chat: Chat) => {
    setSelectedChat(chat);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  // Handle responsive sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar on window resize (if in desktop view)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <MyContextProvider>
      <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Mobile menu button - only visible on small screens */}
        <button 
          className="lg:hidden fixed top-4 right-4 z-50 bg-white rounded-full p-2 shadow-md"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
        
        {/* Sidebar */}
        <div 
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } transform transition-transform duration-300 ease-in-out fixed lg:relative lg:block z-40 w-full sm:w-80 lg:w-1/4 xl:w-1/5 h-screen  shadow-gray-400 shadow-sm  overflow-y-auto`}
        >
          <SideBar onSelectChat={handleChatClick} />
        </div>
        
        {/* Main content */}
        <div className="flex-1 h-screen bg-light-w flex flex-col">
          {/* Navbar */}
          <div className="w-full h-16 md:h-20  flex justify-start  sm:justify-between items-end px-4 md:px-8 lg:px-12">
            <h1 className="font-bold text-2xl md:text-3xl hidden sm:block ">Chat UI</h1>
            <NavBar />
          </div>
          
          {/* Chat area */}
          <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 overflow-hidden">
            <div className="flex-1 flex items-start gap-4 md:gap-7 overflow-y-auto">
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full flex items-center justify-center mt-1">
                <BsStars className="text-gray-600" size={20} />
              </div>
              <div className="flex-1 max-w-full overflow-x-hidden">
                <Chat chat={selectedChat} />
              </div>
            </div>
            
            {/* Input area */}
            <div className="mt-4 md:mt-6 flex justify-center w-full">
              <UserInput />
            </div>
          </div>
        </div>
      </div>
    </MyContextProvider>
  );
}