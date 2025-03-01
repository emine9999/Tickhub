'use client';

import React, { useEffect, useState } from 'react';
import { useMyContext } from '../Contexts/ContextProvider';
import { LiaRobotSolid } from "react-icons/lia";
import { FaRegUser } from 'react-icons/fa';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import { BsChatLeftDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

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

interface SideBarProps {
  onSelectChat: (chat: Chat) => void;
}

const SideBar: React.FC<SideBarProps> = ({ onSelectChat }) => {
  const { state } = useMyContext();
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [todayChats, setTodayChats] = useState<Chat[]>([]);
  const [last7DaysChats, setLast7DaysChats] = useState<Chat[]>([]);

  useEffect(() => {
    fetch('/data/data.json')
      .then((response) => response.json())
      .then((data: Chat[]) => {
        setChatList(data);
        filterChats(data);
      })
      .catch(error => {
        console.error("Error loading chat data:", error);
        // Fallback data for demo purposes
        const fallbackData = [
          { id: 1, title: "Problème de connexion ...", messages: [] },
          { id: 2, title: "Problème d'accès utilisate..", messages: [] },
          { id: 3, title: "Échec de sauvegarde des...", messages: [] },
          { id: 4, title: "Problème de configuration", messages: [] }
        ];
        setChatList(fallbackData);
        setTodayChats(fallbackData.slice(0, 2));
        setLast7DaysChats(fallbackData.slice(2, 4));
      });
  }, []);

  const filterChats = (chats: Chat[]) => {
    const today = new Date();
    const todayStart = new Date(today.setHours(0, 0, 0, 0)); // Start of today
    const sevenDaysAgo = new Date(todayStart);
    sevenDaysAgo.setDate(todayStart.getDate() - 7); // Start of 7 days ago

    const todayFiltered = chats.filter((chat) =>
      chat.messages.some((msg) => new Date(msg.timestamp) >= todayStart)
    );

    const last7DaysFiltered = chats.filter((chat) =>
      chat.messages.some((msg) => {
        const msgDate = new Date(msg.timestamp);
        return msgDate >= sevenDaysAgo && msgDate < todayStart;
      })
    );

    setTodayChats(todayFiltered);
    setLast7DaysChats(last7DaysFiltered);
  };

  return (
    <>
      {state && (
        <div className="w-full h-full bg-custom-g p-4 md:p-5 flex flex-col ">
          <div className="border-b pb-3 ">
            <span className="font-extrabold text-3xl md:text-4xl">TICK</span>
            <span className="font-normal">hub</span>
          </div>
          
          <div className="border-b py-4 flex items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center ">
            <LiaRobotSolid 
            size={45}/> 
            </div>
            <button className="justify-center py-2 px-6 bg-cust-blue text-white rounded-md hover:bg-blue-800 transition-colors text-sm  shadow-lg">
              New Chat 

            </button>
          </div>
          
          <div className="border-b py-3 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Your Conversations
            </span>
            <button className="text-blue-600 text-sm">Clear All</button>
          </div>

          {/* Today Chats */}
          <div className="overflow-y-auto flex-grow">
            <ul>
              {todayChats.map((chat) => (
                <li
                  key={chat.id}
                  onClick={() => onSelectChat(chat)}
                  className="py-3 cursor-pointer flex items-center hover:bg-gray-100 px-2"
                >
                  
                  <span className="text-sm truncate">{chat.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Last 7 Days Chats */}
          <div className="border-t py-2">
            <h3 className="font-medium text-sm py-2">Last 7 Days</h3>
            <ul className="overflow-y-auto max-h-40">
              {last7DaysChats.map((chat) => (
                <li
                  key={chat.id}
                  onClick={() => onSelectChat(chat)}
                  className="py-3 cursor-pointer flex items-center hover:bg-gray-100 px-2"
                >
                  <div className="w-6 h-6 mr-2 flex justify-center items-center lg:text-xl">
                  <BsChatLeftDots />

                  </div>
                  <span className="text-sm truncate text-gray-800 font-semibold lg:text-lg">{chat.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto border-t pt-3">
            <div className="p-3 flex items-center hover:bg-gray-100 cursor-pointer rounded">
              <div className="w-6 h-6 mr-2">
                <FaRegUser size={18} />
              </div>
              <span className="text-sm">Admin Panel</span>
            </div>
            <div className="p-3 flex items-center hover:bg-gray-100 cursor-pointer rounded">
              <div className="w-6 h-6 mr-2">
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 22V12h6v10" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <span className="text-sm">Home</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;