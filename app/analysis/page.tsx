'use client';
import { MyContextProvider } from '../Contexts/ContextProvider';
import React, { useEffect, useState } from 'react';
import { User, SideBar,Chat } from '../components';

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

  const handleChatClick = (chat: Chat) => {
    setSelectedChat(chat);
  };


  return (
    <MyContextProvider>
      <div className="w-full h-screen  flex bg-light-g flex">
        <div className="w-72 border-l drop-shadow-sm h-screen  bg-white">
          <SideBar onSelectChat={handleChatClick} />
        </div>
        <div className="w-2/3 ">
          <div className="w-full h-1/ bg-red-300">header</div>
          <div className="w-full ">
          <Chat chat={selectedChat} />
          </div>
        </div>
      </div>
    </MyContextProvider>
  );
}
