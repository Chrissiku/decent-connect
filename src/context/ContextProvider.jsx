/* eslint-disable react/prop-types */
import { Web5 } from "@web5/api/browser";
import { createContext, useEffect, useMemo, useState } from "react";
import { publicDid } from "../utils/constant";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [web5, setWeb5] = useState(null);
  const [did, setDid] = useState(null);
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
        setDid(did);
      } catch (error) {
        console.error("Error connecting to Web5 : ", error);
      }
    };
    connectToWeb5();
  }, []);

  // Protocol definition
  const protocolDefinition = useMemo(() => {
    const schema = {
      context: "https://schema.org/",
      type: "decentConnect",
      get uri() {
        return this.context + this.type;
      },
    };

    return {
      protocol: import.meta.env.VITE_PROTOCOL_URL,
      published: true,
      types: {
        clientProfile: {
          schema: schema.uri + "/clientProfile",
          dataFormats: ["application/json"],
        },
      },
      structure: {
        clientProfile: {
          $actions: [
            { who: "anyone", can: "write" },
            { who: "recipient", of: "clientProfile", can: "read" },
            { who: "author", of: "clientProfile", can: "read" },
          ],
        },
      },
    };

    // return {
    //   protocol: import.meta.env.VITE_PROTOCOL_URL,
    //   published: true,
    //   types: {
    //     clientProfile: {
    //       schema: `${schema.uri}/clientProfile`,
    //       dataFormats: ["application/json"],
    //     },
    //   },
    //   structure: {
    //     clientProfile: {
    //       $actions: [
    //         { who: "anyone", can: "write" },
    //         { who: "recipient", of: "clientProfile", can: "read" },
    //         { who: "author", of: "clientProfile", can: "read" },
    //       ],
    //     },
    //   },
    // };
  }, []);

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

    if (web5 && did) {
      installProtocol();
    }
  }, [web5, did, protocolDefinition]);

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
    did,
    publicDid,
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
