/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [userType, setUserType] = useState(() => {
    return localStorage.getItem("userType") || null;
  });

  const toggleUserType = (typeName) => {
    localStorage.setItem("userType", typeName);
    setUserType(typeName);
  };

  const getUserType = () => {
    return localStorage.getItem("userType");
  };

  const values = { userType, toggleUserType, getUserType };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default ContextProvider;
