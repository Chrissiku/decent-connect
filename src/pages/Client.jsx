import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/ContextProvider";
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
  } = useContext(AppContext);
  // const [clientInfo, setClientInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await web5.dwn.records.query({
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
              const { data } = record;
              const responseData = await data.json();
              return responseData;
            })
          );

          setClientInfo(result[result.length - 1]);
          return result;
        } else {
          console.error("Error fetching this profile", response.status);
          return [];
        }
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    };
    if (web5 && did) {
      fetchData();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
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
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-2">
              <SideNav />
            </div>
            <div className="lg:col-span-7">
              {Object.keys(clientInfo).length === 0 ? (
                <>Loading</>
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
