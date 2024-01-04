import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/ContextProvider";

const Client = () => {
  const { web5, userDid, logout, protocolDefinition } = useContext(AppContext);
  const [clientInfo, setClientInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await web5.dwn.records.query({
          from: userDid,
          message: {
            filter: {
              protocol: protocolDefinition.protocol,
              schema: protocolDefinition.types.client.schema,
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
          setClientInfo(clientData);
          console.log("data : ", clientData);
          return clientData;
        } else {
          console.error("error fetching this profile", response.status);
          return [];
        }
      } catch (error) {
        console.log("Error fetching client data : ", error);
      }
    };

    if (web5 && userDid) {
      fetchData();
    }
  }, [web5, userDid, protocolDefinition]);

  return (
    <>
      <div>Client dashboard</div>
      {/* <div>{userDid}</div> */}
      <div>{clientInfo.name}</div>
      <button type="button" className="border" onClick={logout}>
        logout
      </button>
    </>
  );
};

export default Client;
