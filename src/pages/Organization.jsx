import { useContext, useState } from "react";
import { AppContext } from "../context/ContextProvider";

const Organization = () => {
  const { web5, did, logout, protocolDefinition } = useContext(AppContext);
  const [organizationInfo, setOrganizationInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useState(() => {
    const fetchData = async () => {
      try {
        const response = await web5.dwn.records.query({
          from: did,
          message: {
            filter: {
              protocol: protocolDefinition.protocol,
              schema: protocolDefinition.types.organizationProfile.schema,
            },
          },
        });
        console.log("fetching", response);

        const receivedDings = await Promise.all(
          response.records.map(async (record) => {
            const { data } = record;
            const textData = await data.json();
            return textData;
          })
        );

        console.log(receivedDings);

        // if (response.status.code === 200) {
        //   const clientData = await Promise.all(
        //     response.records.map(async (record) => {
        //       const data = await record.data.json();
        //       return {
        //         ...data,
        //         recordId: record.id,
        //       };
        //     })
        //   );
        // setOrganizationInfo(clientData[clientData.length - 1]);
        // setLoading(false);
        // return clientData;
        // } else {
        //   console.error("error fetching this profile", response.status);
        //   return [];
        // }
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    };

    if (web5 && did) {
      fetchData();
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  }, [web5, did, protocolDefinition]);

  return (
    <>
      {loading ? (
        <div className="text-teal text-[40px] w-full block items-center justify-center text-center">
          Loading . . .
        </div>
      ) : (
        <>
          <div>Organization dashboard</div>
          <div>{organizationInfo.id}</div>
          <div>{organizationInfo.name}</div>
          <div>{organizationInfo.creationDate}</div>
          <div>{organizationInfo.address}</div>
          <div>{organizationInfo.description}</div>
          <img
            className="h-10 w-10"
            src={organizationInfo.logo}
            alt={organizationInfo.name}
          />

          <button type="button" className="border" onClick={logout}>
            logout
          </button>
        </>
      )}
    </>
  );
};

export default Organization;
