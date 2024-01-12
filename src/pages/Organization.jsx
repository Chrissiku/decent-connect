import { useContext, useState } from "react";
import { AppContext } from "../context/ContextProvider";
import Loader from "../components/common/Loader";
import RefreshButton from "../components/common/RefreshButton";

const Organization = () => {
  const {
    web5,
    did,
    logout,
    protocolDefinition,
    psychologistList,
    toggleModalContent,
    setCustomModalOpen,
    setSelectedDid,
    fetchOrganizations,
    fetchPsychologists,
  } = useContext(AppContext);
  const [organizationInfo, setOrganizationInfo] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = async () => {
    setRefresh(true);
    await fetchPsychologists();
    setRefresh(false);
  };

  const handleLogout = async () => {
    logout();
    await fetchOrganizations();
  };

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
    }
  }, [web5, did, protocolDefinition]);

  const handleIssueVC = (selectedDid) => {
    toggleModalContent("issue-vc");
    setCustomModalOpen(true);
    setSelectedDid(selectedDid);
  };

  // console.log(organizationInfo);
  // console.log(psychologistList);
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-9 gap-3 justify-between p-4 bg-[#F7F6FE] h-screen">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="w-full bg-white p-4 h-[300px] flex flex-col shadow-md gap-10 rounded-[8px]">
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
          <RefreshButton onClick={handleRefresh} refresh={refresh} />
          <button
            type="button"
            className="w-full bg-[#8B7EF8] text-[14px] text-white font-semibold p-3 rounded-lg"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
        {/* Content */}
        {Object.keys(psychologistList).length === 0 ? (
          <div className="lg:col-span-7 w-full flex flex-col items-start justify-start">
            <Loader />
          </div>
        ) : (
          <div className="lg:col-span-7 w-full flex flex-col items-start justify-start">
            <div className="mx-auto text-center font-semibold text-base">
              List of Accredited Therapists{" "}
              <span className="bg-[#8B7EF8] h-10 w-16 p-1 rounded-[8px] text-white">
                {psychologistList.length}
              </span>
            </div>
            <div className="w-full p-5 overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {psychologistList.map((item, index) => (
                  <div
                    key={index + "Organization"}
                    className="h-auto flex flex-col items-start justify-between space-y-3 pb-2 
                        rounded-xl drop-shadow bg-slate-200 hover:bg-slate-300 scale-95 transition-all duration-300 hover:scale-100 overflow-hidden"
                  >
                    <div className="w-full h-[150px]">
                      <img
                        src={item.profile}
                        alt="therapist Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      className="w-full flex flex-col items-start justify-between space-y-3 
                        p-2 text-[12px] capitalize"
                    >
                      <table className="w-full text-left">
                        <tbody className="w-full text-left">
                          <tr>
                            <th className="text-gray-500">Name</th>
                            <td>: {item.name} </td>
                          </tr>
                          <tr>
                            <th className="text-gray-500">Specialization</th>
                            <td className="text-shade">
                              : {item.specialization}
                            </td>
                          </tr>
                          <tr>
                            <th className="text-gray-500">Experience</th>
                            <td>
                              : {item.experience} year
                              {item.experience > 1 && "s"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <button
                        onClick={() => handleIssueVC(item.did)}
                        className="text-center text-white text-[13px] w-full bg-teal hover:bg-indigo-500 p-3 rounded-lg"
                      >
                        Issue V. Credential
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Organization;
