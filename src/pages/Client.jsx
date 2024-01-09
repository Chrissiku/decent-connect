import { useEffect, useState } from "react";
import { useAppContext } from "../context/ContextProvider";
import SideNav from "../components/client/SideNav";
import ClientContent from "../components/client/ClientContent";
import RightBar from "../components/client/RightBar";
import PsychologistList from "../components/client/PsychologistList";
import Appointments from "../components/client/Appointments";

const Client = () => {
  const {
    web5,
    did,
    protocolDefinition,
    pageView,
    psychologistList,
    meetings,
    clientInfo,
    setClientInfo,
  } = useAppContext();
  // const [clientInfo, setClientInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await web5.dwn.records.query({
          from: did,
          message: {
            filter: {
              protocol: protocolDefinition.protocol,
              schema: protocolDefinition.types.clientProfile.schema,
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
          setClientInfo(result[result.length - 1]);
          return result;
        } else {
          console.error("error fetching this profile", response.status);
          return [];
        }
      } catch (error) {
        console.error("error fetching patient profile :", error);
      }
    };

    if (web5 && did) {
      fetchData();
      setLoading(false);
    }
  }, [web5, did, protocolDefinition, setClientInfo]);

  return (
    <>
      {loading ? (
        <div className="text-teal text-[40px] w-full block items-center justify-center text-center">
          Loading . . .
        </div>
      ) : (
        <>
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-2">
              <SideNav />
            </div>
            <div className="lg:col-span-7">
              {Object.keys(clientInfo).length === 0 ? (
                <div className="text-teal text-[40px] w-full block items-center justify-center text-center">
                  Loading . . .
                </div>
              ) : pageView === "home" ? (
                <ClientContent data={clientInfo} />
              ) : pageView === "psychologist" ? (
                <PsychologistList psy={psychologistList} />
              ) : pageView === "appointment" ? (
                <Appointments meetings={meetings} />
              ) : (
                <ClientContent data={clientInfo} />
              )}
            </div>
            <div className="lg:col-span-3">
              <RightBar data={clientInfo} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Client;
