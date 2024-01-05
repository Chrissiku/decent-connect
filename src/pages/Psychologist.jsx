import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/ContextProvider";

const Psychologist = () => {
  const {
    web5,
    did,
    logout,
    protocolDefinition,
    organizationList,
  } = useContext(AppContext);
  const [psychologistInfo, setPsychologistInfo] = useState([]);
  const [org, setOrg] = useState("");
  const [loading, setLoading] = useState(true);

  const selectOrg = () => {
    const org = organizationList.find(
      (organization) => organization.recordId === psychologistInfo.organization
    );
    setOrg(org);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await web5.dwn.records.query({
          from: did,
          message: {
            filter: {
              protocolDefinition: protocolDefinition.protocolDefinition,
              schema: protocolDefinition.types.psychologistProfile.schema,
            },
          },
        });

        if (response.status.code === 200) {
          const psyData = await Promise.all(
            response.records.map(async (record) => {
              const data = await record.data.json();
              return {
                ...data,
                recordId: record.id,
              };
            })
          );
          setPsychologistInfo(psyData[psyData.length - 1]);
          selectOrg();
          return psyData;
        }
      } catch (error) {
        console.error("Error fetching this profile : ", error);
      }
    };

    const mounter = async () => {
      await fetchData();
      setTimeout(() => {
        setLoading(false);
      }, 200);
    };

    if (web5 && did) {
      mounter();
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
          <div>Psychologist dashboard</div>
          <div>{psychologistInfo.id}</div>
          <div>{psychologistInfo.name}</div>
          <div>{psychologistInfo.gender}</div>
          {/* <div>{org}</div> */}
          <div>{psychologistInfo.experience}</div>
          <div>{psychologistInfo.specialization} Psychologist</div>

          <img
            className="h-10 w-10"
            src={psychologistInfo.profile}
            alt={psychologistInfo.name}
          />

          <button type="button" className="border" onClick={logout}>
            logout
          </button>
        </>
      )}
    </>
  );
};

export default Psychologist;
