import { useEffect, useState } from "react";
import PsychologistSideNav from "../components/psychologist/PsychologistSideNav";
import PsychologistContent from "../components/psychologist/PsychologistContent";
import PsychologistRightBar from "../components/psychologist/PsychologistRightBar";
import { useAppContext } from "../context/ContextProvider";

const Psychologist = () => {
  const { web5, did, protocolDefinition, organizationList } = useAppContext();
  const [psychologistInfo, setPsychologistInfo] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [org, setOrg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await web5.dwn.records.query({
          from: did,
          message: {
            filter: {
              protocol: protocolDefinition.protocol,
              schema: protocolDefinition.types.psychologistProfile.schema,
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

          console.log("full filed", fulfilledClientData);

          if (fulfilledClientData.length > 0) {
            setPsychologistInfo(
              fulfilledClientData[fulfilledClientData.length - 1]
            );
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

    const mounter = async () => {
      await fetchData();
      setLoading(false);
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
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-2">
              <PsychologistSideNav />
            </div>
            <div className="lg:col-span-7">
              <PsychologistContent data={psychologistInfo} />
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
