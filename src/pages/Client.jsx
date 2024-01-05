import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/ContextProvider";

const Client = () => {
  const { web5, did, logout, protocolDefinition } = useContext(AppContext);
  const [clientInfo, setClientInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await web5.dwn.records.query({
          from: did,
          message: {
            filter: {
              protocol: protocolDefinition.protocol,
              schema: protocolDefinition.types.clientProfile.schema,
            },
          },
        });

        if (response.status.code === 200) {
          const clientData = await Promise.all(
            response.records.map(async (record) => {
              const data = await record.data.json();
              return {
                ...data,
                recordId: record.id,
              };
            })
          );
          setClientInfo(clientData[clientData.length - 1]);
          return clientData;
        } else {
          console.error("error fetching this profile", response.status);
          return [];
        }
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    };
    if (web5 && did) {
      fetchData();
    }
  }, [web5, did, protocolDefinition]);

  return (
    <>
      <div>Client dashboard</div>
      <div>{clientInfo.id}</div>
      <div>{clientInfo.name}</div>
      <div>{clientInfo.dob}</div>
      <div>{clientInfo.gender}</div>
      <img
        className="h-10 w-10"
        src={clientInfo.picture}
        alt={clientInfo.name}
      />

      <button type="button" className="border" onClick={logout}>
        logout
      </button>
    </>
  );
};

export default Client;
