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
    // clientInfo,
    // setClientInfo,
  } = useContext(AppContext);
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

        console.log(response.records);

        if (response.status.code === 200) {
          const res = await Promise.all(
            response.records.map(async (record) => {
              const data = await web5.dwn.records.read({
                from: did,
                message: {
                  filter: {
                    recordId: record.id,
                  },
                },
              });
              console.log(data)
              // const data = await record;
              // return {
              //   ...data,
              //   recordId: record.id,
              // };
            })
          );
          setClientInfo(res);
          // setLoadingDoctor(false);
          return res;
        } else {
          console.error("error fetching this profile", response.status);
          return [];
        }
      } catch (error) {
        console.error("error fetching client profile :", error);
      }
    };

    // const fetchData = async () => {
    //   try {
    //     const response = await web5.dwn.records.query({
    //       from: did,
    //       message: {
    //         filter: {
    //           protocol: protocolDefinition.protocol,
    //           schema: protocolDefinition.types.clientProfile.schema,
    //         },
    //       },
    //     });

    //     console.log(response);

    //   } catch (error) {
    //     console.error("Error fetching client data : ", error);
    //   }
    // };
    if (web5 && did) {
      fetchData();
      setTimeout(() => {
        setLoading(false);
      }, 2000);
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
                <>Loading Data</>
              ) : pageView === "home" ? (
                <ClientContent data={clientInfo} />
              ) : pageView === "psychologist" ? (
                <PsychologistList psy={psychologistList} />
              ) : pageView === "appointment" ? (
                <Appointments meetings={meetings} />
              ) : (
                <>Null Page</>
              )}
            </div>

            <div className="lg:col-span-3">
              {Object.keys(clientInfo).length === 0 ? (
                <>Loading data</>
              ) : (
                <RightBar data={clientInfo} />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Client;
