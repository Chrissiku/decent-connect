import { useContext, useState } from "react";
import { AppContext } from "../context/ContextProvider";
import Loader from "../components/common/Loader";

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
        <Loader />
      ) : (
        <div className="flex justify-between p-4 bg-[#F7F6FE] h-screen">
          {/* <div>{organizationInfo.id}</div> */}
          <div className="flex flex-col gap-4">
            <div className="bg-white p-4 w-80 h-80 border flex flex-col shadow-md gap-10 rounded-[8px]">
              <div className="flex flex-col">
                <h3 className="font-semibold text-base">Organization Name</h3>
                <span className="text-[#9C9A9A] text-sm">
                  {organizationInfo.name}
                </span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold text-base">Established Date</h3>
                <span className="text-[#9C9A9A] text-sm">
                  {organizationInfo.creationDate}
                </span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold text-base">Street Address</h3>
                <span className="text-[#9C9A9A] text-sm">
                  {organizationInfo.address}
                </span>
              </div>
              <div>{organizationInfo.description}</div>
            </div>
            <button
              type="button"
              className="bg-[#8B7EF8] text-white w-[100px] font-semibold h-8 mt-40 rounded-[8px]"
              onClick={logout}
            >
              Logout
            </button>
          </div>
          <div className="font-semibold text-base">
            List of Accredited Therapists{" "}
            <span className="bg-[#8B7EF8] h-10 w-16 p-1 rounded-[8px] text-white">
              00
            </span>
          </div>
          <div>
            <img
              className="h-10 w-10 rounded-full"
              src={organizationInfo.logo}
              alt={organizationInfo.name}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Organization;
