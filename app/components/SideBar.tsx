'use client';

import React, { useEffect, useState } from 'react';
import { useMyContext } from '../Contexts/ContextProvider';
import { LuBot } from 'react-icons/lu';
import { FaRegUser } from 'react-icons/fa';
import { IoHomeOutline, IoChatboxEllipsesOutline } from 'react-icons/io5';

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  timestamp: string;
}

interface Chat {
  title: string;
  messages: ChatMessage[];
}
interface SideBarProps {
  onSelectChat: (chat: Chat) => void; // Function to handle chat selection
}

const SideBar: React.FC<SideBarProps> = ({ onSelectChat }) => {
  const { state } = useMyContext();
  const [chatList, setChatList] = useState<Chat[]>([]);

  useEffect(() => {
    fetch('/data/data.json')
      .then((response) => response.json())
      .then((data: Chat[]) => setChatList(data));
  }, []);

  // to filter using Date 
  const now = new Date();
  const last7Days = chatList.filter(message => {
    const messageDate = new Date(message.timestamp);
    return (now.getTime() - messageDate.getTime()) / (1000 * 3600 * 24) <= 7;
  });

  return (
    <>
      {state && (
        <div className="w-full border-r h-screen bg-white p-5 grid grid-row-16">
          <div className="border-b row-span-1 ">
            <span className="font-bold text-3xl">TICK</span>hub
          </div>
          <div className="border-b row-span-2 flex justify-center items-center gap-4">
            <LuBot className="text-5xl" />
            <button className="px-3 bg-blue-500 rounded-lg hover:bg-blue-800 text-white">
              New Chat
            </button>
          </div>
          <div className="border-b row-span-2 flex justify-between items-center">
            <span className="font-extra-light text-sm text-gray-300">
              Your Conversations
            </span>
            <p className="font-semi-bold text-violet-700 cursor-pointer">
              Clear All
            </p>
          </div>

          <div className="border-b row-span-5 bg-blue-700 max-h-60 overflow-auto ">
            <h1 className="font-semi-bold text-sm ">Today</h1>
            
            <ul>
              {chatList.map((chat) => (
                <li
                  key={chat.id}
                  onClick={() => onSelectChat(chat)}
                  className="mt-3 cursor-pointer flex justify-start gap-2 items-center"
                >
                  <IoChatboxEllipsesOutline className="text-xl" />
                  <strong>{chat.title}</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-b row-span-5 bg-blue-300">
          <h3>Last 7 Days</h3>
        {last7Days.length > 0 ? (
          last7Days.map((chat) => (
            <div key={chat.id} style={{ marginBottom: '10px' }}>
               {chat.title} 
            </div>
          ))
        ) : (
          <p>No messages in the last 7 days.</p>
        )}
          </div>

          <div className="border-b row-span-1  flex justify-center items-center">
            <div className="bg-gray-200 rounded-full flex items-center w-1/2 justify-center gap-4">
              <FaRegUser /> <p>admin</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
