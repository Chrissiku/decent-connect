/* eslint-disable react/prop-types */
import { createContext } from "react";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const test = "hello this is a context";
  const value = { test };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default ContextProvider;
