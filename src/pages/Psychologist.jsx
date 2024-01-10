import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/ContextProvider";
import PsychologistSideNav from "../components/psychologist/PsychologistSideNav";
import PsychologistContent from "../components/psychologist/PsychologistContent";
import PsychologistRightBar from "../components/psychologist/PsychologistRightBar";
import Appointments from "../components/psychologist/Appointments";
import Loader from "../components/common/Loader";

const Psychologist = () => {
  const {
    web5,
    did,
    protocolDefinition,
    organizationList,
    psychologistInfo,
    setPsychologistInfo,
    pageView,
    meetings,
  } = useContext(AppContext);
  // const [psychologistInfo, setPsychologistInfo] = useState([]);
  // eslint-disable-next-line no-unused-vars
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
          message: {
            filter: {
              protocol: protocolDefinition.protocol,
              schema: protocolDefinition.types.psychologistProfile.schema,
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
          // console.log(result);
          setPsychologistInfo(result[result.length - 1]);
          selectOrg();
          return result;
        }
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    };

    const mounter = async () => {
      await fetchData();
      setLoading(false);
    };

    if (web5 && did) {
      mounter();
    }
  }, [web5, did, protocolDefinition]);

  // console.log(psychologistInfo);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-2">
              <PsychologistSideNav />
            </div>

            <div className="lg:col-span-7">
              {Object.keys(psychologistInfo).length === 0 ? (
                <Loader />
              ) : pageView === "home" ? (
                <PsychologistContent data={psychologistInfo} />
              ) : pageView === "psy-appointment" ? (
                <Appointments meetings={meetings} />
              ) : (
                <PsychologistContent data={psychologistInfo} />
              )}
            </div>
            <div className="lg:col-span-3">
              <PsychologistRightBar data={psychologistInfo} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Psychologist;
