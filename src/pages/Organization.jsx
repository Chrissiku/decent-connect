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
          const clientDataPromises = response.records.map(async (record) => {
            const dataPromise = record.data.json();
            return {
              data: await dataPromise,
              recordId: record.id,
            };
          });

          const clientDataResults = await Promise.allSettled(
            clientDataPromises
          );

          const fulfilledClientData = clientDataResults
            .filter((result) => result.status === "fulfilled")
            .map((result) => result.value.data);

          console.log("full filed", fulfilledClientData);

          if (fulfilledClientData.length > 0) {
            setOrganizationInfo(
              fulfilledClientData[fulfilledClientData.length - 1]
            );
          } else {
            console.error("No client data fulfilled");
          }
        }
      } catch (error) {
        console.error("Error fetching this profile", error);
      } finally {
        setLoading(false);
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
