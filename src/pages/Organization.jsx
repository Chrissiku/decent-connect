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
          <div className="flex justify-between p-4">
            {/* <div>{organizationInfo.id}</div> */}
            <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <h3 className="font-semibold text-base">Organization Name</h3>
              <span className="text-[#9C9A9A] text-sm">
                {organizationInfo.name}
              </span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-base">Established Date</h3>
              <span className="text-[#9C9A9A] text-sm">{organizationInfo.creationDate}</span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-base">Street Address</h3>
              <span className="text-[#9C9A9A] text-sm">{organizationInfo.address}</span>
              </div>
            <div>{organizationInfo.description}</div>
            </div>
            <div className="font-semibold text-base">List of accredited therapists</div>
            <div className="self-end flex-col gap-4">
              <div>
                <img
                  className="h-10 w-10 rounded-full"
                  src={organizationInfo.logo}
                  alt={organizationInfo.name}
                />
              </div>
              <button type="button" className="border" onClick={logout}>
                logout
              </button>
            </div>
          </div>
      )}
    </>
  );
};

export default Organization;
