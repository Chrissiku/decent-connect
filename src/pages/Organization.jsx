import { useState } from "react";
import { useAppContext } from "../context/ContextProvider";

const Organization = () => {
  const {
    web5,
    did,
    logout,
    protocolDefinition,
    organizationInfo,
    setOrganizationInfo,
  } = useAppContext();
  // const [organizationInfo, setOrganizationInfo] = useState([]);
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

        if (response.status.code === 200) {
          const result = await Promise.all(
            response.records.map(async (record) => {
              const data = await record.data.json();
              return {
                ...data,
                recordId: record.id,
              };
            })
          );
          setOrganizationInfo(result[result.length - 1]);
          return result;
        } else {
          console.error("error fetching this organization", response.status);
          return [];
        }
      } catch (error) {
        console.error("error fetching organization profile :", error);
      }
    };

    if (web5 && did) {
      fetchData();
      setLoading(false);
    }
  }, [web5, did, protocolDefinition]);

  console.log(organizationInfo);

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
          <button type="button" className="border" onClick={() => fetch()}>
            Fetch
          </button>

          <button type="button" className="border" onClick={logout}>
            logout
          </button>
        </>
      )}
    </>
  );
};

export default Organization;
