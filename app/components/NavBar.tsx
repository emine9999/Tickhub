import React from 'react'
import { FaRegUser } from "react-icons/fa";
import { LuBellRing } from "react-icons/lu";
import { MdOutlineLightMode } from "react-icons/md";

const NavBar = () => {
  return (
        <div className=' px-2 py-1 flex justify-evenly gap-5 items-center rounded-full sm:shadow-sm sm:shadow-gray-400  w-48'>
            
             <LuBellRing size={24} className='cursor-pointer'/>
             <MdOutlineLightMode size={24} className='cursor-pointer'/>
<div className='w-10 h-10 rounded-full bg-blue-200 flex justify-center items-center cursor-pointer'><FaRegUser size={20}/>
</div>
       </div>
    
  )
}

export default NavBar