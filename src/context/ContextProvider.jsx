/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [userType, setUserType] = useState(() => {
    return localStorage.getItem("userType") || null;
  });

  const [patient, setPatient] = useState(() => {
    return localStorage.getItem("patient") || null;
  });

  const [psychologist, setPsychologist] = useState(() => {
    return localStorage.getItem("psychologist") || null;
  });

  const [organization, setOrganization] = useState(() => {
    return localStorage.getItem("organization") || null;
  });

  const toggleUserType = (value) => {
    localStorage.setItem("userType", value);
    setUserType(value);
  };

  const togglePatient = (value) => {
    localStorage.setItem("patient", value);
    setPatient(value);
  };

  const togglePsy = (value) => {
    localStorage.setItem("psychologist", value);
    setPsychologist(value);
  };

  const toggleOrganization = (value) => {
    localStorage.setItem("organization", value);
    setOrganization(value);
  };

  const logout = () => {
    localStorage.setItem("userType", null);
    setUserType(null);
  };

  const values = {
    userType,
    patient,
    psychologist,
    organization,
    toggleUserType,
    togglePatient,
    togglePsy,
    toggleOrganization,
    logout,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default ContextProvider;
