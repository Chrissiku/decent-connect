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
              const { data } = record;
              const textData = await data.json();
              return { ...textData, recordId: record.id };
            })
          );
          setOrganizationInfo(result[result.length - 1]);

          return result;
        }
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    };

    if (web5 && did) {
      fetchData();
      setLoading(false);
    }
  }, [web5, did, protocolDefinition]);
  // console.log(organizationInfo);
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
