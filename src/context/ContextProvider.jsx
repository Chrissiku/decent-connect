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
  const [clientInfo, setClientInfo] = useState([]);
  const [psychologistInfo, setPsychologistInfo] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [psychologistList, setPsychologistList] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [pageView, setPageView] = useState(() => {
    return localStorage.getItem("pageView") || null;
  });
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedDid, setSelectedDid] = useState(null);
  const [client, setClient] = useState(() => {
    return localStorage.getItem("client") || null;
  });

  const [psychologist, setPsychologist] = useState(() => {
    return localStorage.getItem("psychologist") || null;
  });

  const [organization, setOrganization] = useState(() => {
    return localStorage.getItem("organization") || null;
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
        organizationProfile: {
          schema: schema.uri + "/organizationProfile",
          dataFormats: ["application/json"],
        },
        psychologistProfile: {
          schema: schema.uri + "/psychologistProfile",
          dataFormats: ["application/json"],
        },
        meetings: {
          schema: schema.uri + "/meetings",
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
        organizationProfile: {
          $actions: [
            { who: "anyone", can: "write" },
            { who: "anyone", can: "read" },
          ],
        },
        psychologistProfile: {
          $actions: [
            { who: "anyone", can: "write" },
            { who: "anyone", can: "read" },
          ],
        },
        meetings: {
          $actions: [
            { who: "anyone", can: "write" },
            { who: "recipient", of: "meetings", can: "read" },
            { who: "author", of: "meetings", can: "read" },
          ],
        },
      },
    };
  }, []);

  useEffect(() => {
    //install protocol
    const installProtocol = async () => {
      try {
        // console.log("Installing protocol ...");
        const { protocol, status } = await web5.dwn.protocols.configure({
          message: {
            definition: protocolDefinition,
          },
        });
        await protocol.send(did);
        if ((status.code === 202) & (status.details === "Accepted")) {
          console.log("... Welcome to decent connect ");
        }
      } catch (error) {
        console.error("Error installing protocol : ", error);
      }
    };

    // Fetch all organizations
    const fetchOrganizations = async () => {
      try {
        const response = await web5.dwn.records.query({
          // from: did,
          message: {
            filter: {
              protocol: protocolDefinition.protocol,
              schema: protocolDefinition.types.organizationProfile.schema,
            },
          },
        });

        if (response.status.code == 200) {
          const result = await Promise.all(
            response.records.map(async (record) => {
              if (record && record.data) {
                const { data } = record;
                const textData = await data.json();
                return textData;
              }
              return null;
            })
          );

          const filteredResult = result.filter((item) => item !== null);

          setOrganizationList(filteredResult);
          return filteredResult;
        }
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    };

    // Fetch All Psychologists

    const fetchPsychologists = async () => {
      try {
        const response = await web5.dwn.records.query({
          // from: did,
          message: {
            filter: {
              protocol: protocolDefinition.protocol,
              schema: protocolDefinition.types.psychologistProfile.schema,
            },
          },
        });

        if (response.status.code == 200) {
          const result = await Promise.all(
            response.records.map(async (record) => {
              const { data } = record;
              const textData = await data.json();
              return textData;
            })
          );

          setPsychologistList(result);
          return result;
        }
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    };

    // Fetch All meeting
    const fetchMeetings = async () => {
      try {
        const response = await web5.dwn.records.query({
          // from: did,
          message: {
            filter: {
              protocol: protocolDefinition.protocol,
              schema: protocolDefinition.types.meetings.schema,
            },
          },
        });

        if (response.status.code == 200) {
          const result = await Promise.all(
            response.records.map(async (record) => {
              const { data } = record;
              const textData = await data.json();
              return textData;
            })
          );

          setMeetings(result);
          return result;
        }
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    };

    if (web5 && did) {
      installProtocol();
      fetchOrganizations();
      fetchPsychologists();
      fetchMeetings();
    }
  }, [web5, did, protocolDefinition]);

  const toggleAuthType = (value) => {
    setAuthType(value);
  };

  const toggleModalContent = (value) => {
    setModalContent(value);
  };

  const toggleUserType = (value) => {
    localStorage.setItem("userType", value);
    setUserType(value);
  };

  const togglePageView = (value) => {
    localStorage.setItem("pageView", value);
    setPageView(value);
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
    togglePageView("home");
  };

  const findOrganizationByRecordId = (recordIdToFind) => {
    if (Object.keys(organizationList).length === 0) {
      return [];
    }
    const org = organizationList?.find(
      (org) => org?.recordId === recordIdToFind
    );
    return org;
  };

  const findPsyByDid = (recordIdToFind) => {
    if (Object.keys(psychologistList).length === 0) {
      return [];
    }
    const psy = psychologistList?.find((psy) => psy?.did === recordIdToFind);
    return psy;
  };

  // console.log("Meeting : ", meetings);

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
    organizationList,
    psychologistList,
    pageView,
    customModalOpen,
    modalContent,
    selectedDid,
    meetings,
    clientInfo,
    setClientInfo,
    setSelectedDid,
    setCustomModalOpen,
    toggleModalContent,
    setModalOpen,
    toggleAuthType,
    toggleUserType,
    toggleClient,
    togglePsy,
    toggleOrganization,
    logout,
    findOrganizationByRecordId,
    findPsyByDid,
    togglePageView,
    psychologistInfo,
    setPsychologistInfo,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default ContextProvider;
