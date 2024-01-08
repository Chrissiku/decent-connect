/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AppContext } from "../../context/ContextProvider";
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Appointments = ({ meetings }) => {
  const { findPsyByDid, clientInfo } = useContext(AppContext);
  console.log(meetings);
  return (
    <div className="w-full mx-auto px-5 md:px-10 py-14 flex flex-col flex-wrap space-y-5 items-start justify-between">
      <h1 className="text-[20px] font-bold">All Appointment</h1>
      <p className="text-[15px] text-gray-500">
        Search for the best therapists to attend to you! our therapists are
        qualified and certified to give you the best service
      </p>
      {Object.keys(meetings).length === 0 ? (
        <div className="w-full flex flex-col flex-wrap items-center justify-between space-y-3 bg-red-200">
          <div className="w-full h-[100%] p-20 text-center text-[20px] text-dark-gray">
            Currently, there are no therapists available ! come back later
          </div>
        </div>
      ) : (
        <table className="rounded-lg bg-slate-100 w-full mx-auto text-center text-[13px]">
          <thead className="bg-gray-300">
            <tr className="w-full">
              <th className="p-3">Participants</th>
              <th>Reason</th>
              <th>Symptoms</th>
              <th>Data/Time</th>
              <th>Details</th>
              <th>Record</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {meetings
              ?.sort(
                (a, b) => new Date(a.meetingTime) - new Date(b.meetingTime)
              )
              .map((item, index) => (
                <tr key={index} className="hover:bg-gray-200">
                  <td>
                    <div className="w-full text-center flex flex-col items-center p-3 justify-center text-gray-500 text-[13px]">
                      <span>{clientInfo.name}</span>
                      <span>{findPsyByDid(item.psychologistDid).name}</span>
                    </div>
                  </td>
                  <td>{item.reason}</td>
                  <td>{item.symptom}</td>
                  <td className="">
                    <div className="w-full flex flex-col text-[13px] text-gray-500">
                      <span>
                        on{" "}
                        {new Date(item.meetingTime).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                      <span>
                        @{" "}
                        {new Date(item.meetingTime).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          }
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="p-2">
                    {item.moreInfo !== "" ? (
                      <div>
                        <a title={item.moreInfo}>
                          {item.moreInfo.slice(0, 10) + "..."}
                        </a>
                      </div>
                    ) : (
                      <span> - </span>
                    )}
                  </td>
                  <td>
                    {item.medicalRecord !== null ? (
                      <div className="text-[10px] flex flex-col items-center justify-center group ">
                        <DocumentArrowDownIcon className="w-8 h-8 group-hover:text-green-500" />
                      </div>
                    ) : (
                      <span> - </span>
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/join/${item.id}`}
                      target="_blank"
                      className="px-4 py-1 bg-green-400 hover:bg-green-500 text-black rounded-lg text-[13px]"
                    >
                      Join now
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Appointments;
