import { Web5 } from "@web5/api/browser";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { publicDid } from "../utils/constant";

const AppContext = createContext();

const getLocalStorageItem = (key) => {
  return localStorage.getItem(key) || null;
};

const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, value);
};

const ContextProvider = (props) => {
  const [web5, setWeb5] = useState(null);
  const [did, setDid] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [authType, setAuthType] = useState(null);
  const [userType, setUserType] = useState(() =>
    getLocalStorageItem("userType")
  );
  // Stores
  const [clientInfo, setClientInfo] = useState([]);
  const [organizationInfo, setOrganizationInfo] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [psychologistList, setPsychologistList] = useState([]);
  const [meetings, setMeetings] = useState([]);

  const [pageView, setPageView] = useState(() =>
    getLocalStorageItem("pageView")
  );
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedDid, setSelectedDid] = useState(null);
  // Account Types
  const [client, setClient] = useState(() => getLocalStorageItem("client"));
  const [psychologist, setPsychologist] = useState(() =>
    getLocalStorageItem("psychologist")
  );
  const [organization, setOrganization] = useState(() =>
    getLocalStorageItem("organization")
  );

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
    const connectToWeb5 = async () => {
      try {
        const { web5, did } = await Web5.connect();
        setWeb5((prevWeb5) => (prevWeb5 === web5 ? prevWeb5 : web5));
        setDid((prevDid) => (prevDid === did ? prevDid : did));
      } catch (error) {
        console.error("Error connecting to Web5 : ", error);
      }
    };
    connectToWeb5();
  }, []);

  useEffect(() => {
    const installProtocol = async () => {
      try {
        const { protocol, status } = await web5.dwn.protocols.configure({
          message: {
            definition: protocolDefinition,
          },
        });
        await protocol.send(did);
        if (status.code === 202 && status.details === "Accepted") {
          console.log("Welcome to decent-connect");
        }
      } catch (error) {
        console.error("Error installing protocol:", error);
      }
    };

    const fetchOrganizations = async () => {
      try {
        const response = await web5.dwn.records.query({
          from: publicDid,
          message: {
            filter: {
              protocol: protocolDefinition.protocol,
              schema: protocolDefinition.types.organizationProfile.schema,
            },
          },
        });

        if (response.status.code === 200) {
          const dataPromises = response.records.map(async (record) => {
            const dataPromise = record.data.json();
            return {
              data: await dataPromise,
              recordId: record.id,
            };
          });

          const dataResults = await Promise.allSettled(dataPromises);

          const fulfilledData = dataResults
            .filter((result) => result.status === "fulfilled")
            .map((result) => result.value.data);

          console.log("full filed", fulfilledData);

          if (fulfilledData.length > 0) {
            setOrganizationList(fulfilledData);
          } else {
            console.error("No client data fulfilled");
          }
        }
      } catch (error) {
        console.error("Error fetching organizations", error);
      }
    };

    const fetchPsychologist = async () => {
      try {
        const response = await web5.dwn.records.query({
          from: publicDid,
          message: {
            filter: {
              protocol: protocolDefinition.protocol,
              schema: protocolDefinition.types.psychologistProfile.schema,
            },
          },
        });

        if (response.status.code === 200) {
          const dataPromises = response.records.map(async (record) => {
            const dataPromise = record.data.json();
            return {
              data: await dataPromise,
              recordId: record.id,
            };
          });

          const dataResults = await Promise.allSettled(dataPromises);

          const fulfilledData = dataResults
            .filter((result) => result.status === "fulfilled")
            .map((result) => result.value.data);

          console.log("full filed", fulfilledData);

          if (fulfilledData.length > 0) {
            setPsychologistList(fulfilledData);
          } else {
            console.error("No client data fulfilled");
          }
        }
      } catch (error) {
        console.error("Error fetching organizations", error);
      }
    };

    const mounter = async () => {
      await installProtocol();
      await fetchOrganizations();
      await fetchPsychologist();
    };

    if (web5 && did) {
      mounter();
    }
  }, [web5, did, protocolDefinition]);

  const toggleAuthType = (value) => {
    setAuthType(value);
  };

  const toggleModalContent = (value) => {
    setModalContent(value);
  };

  const toggleUserType = (value) => {
    setLocalStorageItem("userType", value);
    setUserType(value);
  };

  const togglePageView = (value) => {
    setLocalStorageItem("pageView", value);
    setPageView(value);
  };

  const toggleClient = (value) => {
    setLocalStorageItem("client", value);
    setClient(value);
  };

  const togglePsy = (value) => {
    setLocalStorageItem("psychologist", value);
    setPsychologist(value);
  };

  const toggleOrganization = (value) => {
    setLocalStorageItem("organization", value);
    setOrganization(value);
  };

  const logout = () => {
    setLocalStorageItem("userType", null);
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
    organizationInfo,
    setOrganizationInfo,
    setClientInfo,
    setSelectedDid,
    setCustomModalOpen,
    setModalOpen,
    toggleModalContent,
    toggleAuthType,
    toggleUserType,
    toggleClient,
    togglePsy,
    toggleOrganization,
    togglePageView,
    logout,
    findOrganizationByRecordId,
    findPsyByDid,
  };
  return (
    // eslint-disable-next-line react/prop-types
    <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default ContextProvider;
