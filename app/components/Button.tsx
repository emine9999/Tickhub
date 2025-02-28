import React from 'react';
import { useMyContext } from '../Contexts/ContextProvider';

const Button = () => {
  const { state, setState } = useMyContext();
const handleClick = () =>{
   setState(!state)
} 
  return (
    <div>
      <span className="text-black">Context value: {state ? 'true' : 'false'}</span>
      <button
        className="bg-red-500 hover:bg-red-300 border p-2 rounded-xl"
        onClick={handleClick}
      >
        hide sidebar
      </button>
    </div>
  );
};

export default Button;
