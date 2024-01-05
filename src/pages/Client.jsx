import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/ContextProvider";

const Client = () => {
  const { web5, did, logout, protocolDefinition } = useContext(AppContext);
  const [clientInfo, setClientInfo] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await web5.dwn.records.query({
    //       from: userDid,
    //       message: {
    //         filter: {
    //           protocol: protocolDefinition.protocol,
    //           schema: protocolDefinition.types.client.schema,
    //         },
    //       },
    //     });

    //     if (response.status.code === 200) {
    //       const clientData = await Promise.all(
    //         response.records.map(async (record) => {
    //           const data = await record.data.json();
    //           return {
    //             ...data,
    //             recordId: record.id,
    //           };
    //         })
    //       );
    //       setClientInfo(clientData.records);
    //       console.log("data : ", clientData);
    //       return clientData;
    //     } else {
    //       console.error("error fetching this profile", response.status);
    //       return [];
    //     }
    //   } catch (error) {
    //     console.log("Error fetching client data : ", error);
    //   }
    // };

    const fetchData = async () => {
      try {
        // console.log("Fetching patient Profile");
        const response = await web5.dwn.records.query({
          from: did,
          message: {
            filter: {
              protocol: protocolDefinition.protocol,
              schema: protocolDefinition.types.client.schema,
            },
          },
        });

        if (response.status.code === 200) {
          const patientProfile = await Promise.all(
            response.records.map(async (record) => {
              const data = await record.data.json();
              return {
                ...data,
                recordId: record.id,
              };
            })
          );
          // setPatientData(patientProfile[patientProfile.length - 1]);
          console.log(patientProfile);
          return patientProfile;
        } else {
          console.error("error fetching this profile", response.status);
          return [];
        }
      } catch (error) {
        console.error("error fetching patient profile :", error);
      }
    };

    if (web5 && did) {
      // fetchData();
      fetchData();
    }
  }, [web5, did, protocolDefinition]);

  return (
    <>
      <div>Client dashboard</div>
      {/* <div>{userDid}</div> */}
      {/* <div>{clientInfo.name}</div> */}
      <button type="button" className="border" onClick={logout}>
        logout
      </button>
    </>
  );
};

export default Client;
