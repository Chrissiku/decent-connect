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

          if (fulfilledClientData.length > 0) {
            setClientInfo(fulfilledClientData[fulfilledClientData.length - 1]);
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
                <>No data on the DWN</>
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
