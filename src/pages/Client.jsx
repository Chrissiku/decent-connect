import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/ContextProvider";
import SideNav from "../components/client/SideNav";
import ClientContent from "../components/client/ClientContent";
import RightBar from "../components/client/RightBar";

const Client = () => {
  const { web5, did, protocolDefinition, pageView } = useContext(AppContext);
  const [clientInfo, setClientInfo] = useState([]);
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
          const clientData = await Promise.all(
            response.records.map(async (record) => {
              const data = await record.data.json();
              return {
                ...data,
                recordId: record.id,
              };
            })
          );
          setClientInfo(clientData[clientData.length - 1]);
          return clientData;
        } else {
          console.error("error fetching this profile", response.status);
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
              {pageView === "home" ? (
                <ClientContent data={clientInfo} />
              ) : pageView === "appointment" ? (
                <>Appointment page</>
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
