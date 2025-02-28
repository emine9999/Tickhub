// app/contexts/ContextProvider.tsx
'use client';

import { createContext, useState, ReactNode ,useContext} from 'react';

interface MyContextType {
  state: boolean;
  setState: (value: boolean) => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState(true);

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);

export default MyContext;
