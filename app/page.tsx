'use client';
import SideBar from './components/SideBar';
import Button from './components/Button';
import { MyContextProvider } from './Contexts/ContextProvider';

export default function Home() {
  
  return (
    <MyContextProvider>
      <div className="w-full h-screen p-2 flex  ">
       heyy
      </div>
    </MyContextProvider>
  );
}
