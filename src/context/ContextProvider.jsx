/* eslint-disable react/prop-types */
import { Web5 } from "@web5/api/browser";
import { createContext, useEffect, useMemo, useState } from "react";
import { publicDid } from "../utils/constant";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [web5, setWeb5] = useState(null);
  const [userDid, setUserDid] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [authType, setAuthType] = useState(null);
  const [userType, setUserType] = useState(() => {
    return localStorage.getItem("userType") || null;
  });

  // connect to Web5 on mount
  useEffect(() => {
    const connectToWeb5 = async () => {
      try {
        const { web5, did } = await Web5.connect();
        setWeb5(web5);
        setUserDid(did);
        console.log(did);
      } catch (error) {
        console.error("Error connect to Web5 : ", error);
      }
    };
    connectToWeb5();
  }, []);

  // Protocol definition
  const protocolDefinition = useMemo(() => {
    const schema = {
      context: "https://schema.org/",
      type: "Person",
      get uri() {
        return this.context + this.type;
      },
    };

    return {
      protocol: import.meta.env.VITE_PROTOCOL_URL,
      published: true,

      types: {
        client: {
          schema: `${schema.uri}/client`,
          dataFormats: ["application/json"],
        },
      },

      structure: {
        client: {
          $actions: [
            { who: "anyone", can: "write" },
            { who: "recipient", of: "client", can: "read" },
          ],
        },
      },
    };
  }, []);

  // add new action when connected to Web5
  useEffect(() => {
    //install protocol

    const installProtocol = async () => {
      try {
        console.log("Installing protocol ...");
        const { protocol, status } = await web5.dwn.protocols.configure({
          message: {
            definition: protocolDefinition,
          },
        });
        await protocol.send;
        console.log("... Protocol installed ", status);
      } catch (error) {
        console.error("Error installing protocol : ", error);
      }
    };

    if (web5 && userDid) {
      installProtocol();
    }
  }, [web5, userDid, protocolDefinition]);

  const [client, setClient] = useState(() => {
    return localStorage.getItem("client") || null;
  });

  const [psychologist, setPsychologist] = useState(() => {
    return localStorage.getItem("psychologist") || null;
  });

  const [organization, setOrganization] = useState(() => {
    return localStorage.getItem("organization") || null;
  });

  const toggleAuthType = (value) => {
    setAuthType(value);
  };

  const toggleUserType = (value) => {
    localStorage.setItem("userType", value);
    setUserType(value);
  };

  const toggleClient = (value) => {
    localStorage.setItem("client", value);
    setClient(value);
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
    setAuthType(null);
    setUserType(null);
  };

  const values = {
    modalOpen,
    authType,
    userType,
    client,
    psychologist,
    organization,
    protocolDefinition,
    web5,
    userDid,
    setModalOpen,
    toggleAuthType,
    toggleUserType,
    toggleClient,
    togglePsy,
    toggleOrganization,
    logout,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default ContextProvider;
