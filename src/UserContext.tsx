import React, { createContext, useContext, useState } from "react";
interface User {
  name: string;
  credits: number;
  bonusSpins: number;
  bonusDraws: number;
}
interface Buttons {
  startSpin: boolean;
  activateSpin: boolean;
  activateDraw: boolean;
  buyButton: boolean;
}
interface UserContextType {
  user: User;
  updateUser: (updates: Partial<User>) => void;
  buttons: Buttons;
  updateButtons: (updates: Partial<Buttons>) => void;
}
const defaultUser: User = {
  name: "Guest",
  credits: 50,
  bonusSpins: 3,
  bonusDraws: 2,
};
const defaultButtons: Buttons = {
  startSpin: false,
  activateSpin: true,
  activateDraw: true,
  buyButton: false,
};
const UserContext = createContext<UserContextType | undefined>(undefined);
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(defaultUser);
  const [buttons, setButtons] = useState(defaultButtons);

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };
  const updateButtons = (updates: Partial<Buttons>) => {
    setButtons((prev) => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser, buttons, updateButtons }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
