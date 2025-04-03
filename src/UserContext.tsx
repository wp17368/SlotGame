import React, { createContext, useContext, useState } from "react";
export interface Products {
  [key: string]: number;
}
interface User {
  name: string;
  credits: number;
  products: Products;
}
const defaultUser: User = {
  name: "Guest",
  credits: 50,
  products: { spin: 3, draw: 2 },
};
interface Buttons {
  startSpin: boolean;
  activateSpin: boolean;
  activateDraw: boolean;
  buyButton: boolean;
}
const defaultButtons: Buttons = {
  startSpin: false,
  activateSpin: true,
  activateDraw: true,
  buyButton: false,
};
interface Shop {
  isShopModalOpen: boolean;
  shoppingCart: { products: Products; total: number };
  pricing: { spin: number; draw: number };
}
const defaultShop: Shop = {
  isShopModalOpen: false,
  shoppingCart: { products: { spin: 0, draw: 0 }, total: 0 },
  pricing: { spin: 50, draw: 20 },
};
interface UserContextType {
  user: User;
  updateUser: (updates: Partial<User>) => void;
  buttons: Buttons;
  updateButtons: (updates: Partial<Buttons>) => void;
  shop: Shop;
  updateShop: (updates: Partial<Shop>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(defaultUser);
  const [buttons, setButtons] = useState(defaultButtons);
  const [shop, setShop] = useState(defaultShop);

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };
  const updateButtons = (updates: Partial<Buttons>) => {
    setButtons((prev) => ({ ...prev, ...updates }));
  };
  const updateShop = (updates: Partial<Shop>) => {
    setShop((prev) => ({ ...prev, ...updates }));
  };
  return (
    <UserContext.Provider
      value={{ user, updateUser, buttons, updateButtons, shop, updateShop }}
    >
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
