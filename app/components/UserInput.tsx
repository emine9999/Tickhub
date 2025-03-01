import React from 'react'
import { IoSend } from "react-icons/io5";
import { LuBrain } from "react-icons/lu";

const UserInput = () => {
  return (
    
<div className="flex items-center bg-white rounded-full border shadow-sm px-4 py-3 w-9/12">
              <LuBrain     className="w-8 h-11 rounded-full mr-2" />
              <input 
                type="text" 
                placeholder="what's in your mind? ..." 
                className="flex-1 outline-none text-gray-700 py-1"
              />
              <button className="  rounded-full flex items-center justify-center">
                <IoSend size={20} />
              </button>
            </div>


)
}

export default UserInput