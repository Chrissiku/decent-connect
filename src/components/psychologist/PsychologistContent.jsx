/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {
  DocumentDuplicateIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import femaleProfile from "../../assets/patient/female.svg";
import call from "../../assets/patient/call.svg";
import video from "../../assets/patient/video.svg";
import { Calendar } from "../ui/calendar";
import patient from "../../assets/therapist/patient.svg";
import report from "../../assets/therapist/report.svg";
import consultation from "../../assets/therapist/consultation.svg";
import repeat from "../../assets/therapist/repeat.svg";
import { useContext, useState } from "react";
import { AppContext } from "../../context/ContextProvider";
import RefreshButton from "../common/RefreshButton";

const PsychologistContent = ({ data }) => {
  const { meetings, did, findPsyByDid, fetchMeetings } = useContext(AppContext);
  // console.log(meetings);
  const upcomingAppointment = meetings.sort(
    (a, b) => new Date(a.meetingTime) - new Date(b.meetingTime)
  );

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = async () => {
    setRefresh(true);
    await fetchMeetings();
    setRefresh(false);
  };
  return (
    <>
      <div className="w-full mx-auto px-5 md:px-10 py-14 flex flex-col flex-wrap space-y-5 items-start justify-between">
        <div>
          <h1 className="text-[20px] font-bold">
            Welcome <span className="text-teal">{data?.name}</span>
          </h1>
          <p className="text-[12px] text-gray-500">{data?.specialization}</p>
          {/* profile */}
          <div className="w-full flex lg:hidden items-center justify-between text-gray-400 space-x-4">
            <div className="bg-slate-200 rounded-[8px] w-[250px] hover:bg-gray-200 px-5 py-2 font-medium text-[14px] inline-flex items-center justify-between lg:w-full">
              <p>{did?.slice(0, 10) + "..." + did?.slice(-10)}</p>
              <span>
                <DocumentDuplicateIcon className="w-[20px] h-[20px]" />
              </span>
            </div>
            <div className="inline-flex items-center justify-between space-x-1 hover:bg-gray-300 py-2 px-3 rounded-lg">
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <img
                  src={data?.profile}
                  className="w-full h-full"
                  alt="profile picture"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none cursor-pointer">
                  <ChevronDownIcon className="w-5 h-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="!text-black !rounded-lg !border !border-teal p-5 absolute -right-2 !bg-slate-300 min-w-[200px]">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Appointments</DropdownMenuItem>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Meetings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-[20px] font-bold text-teal">Overview</h1>
          <p className="text-[12px] text-gray-500">
            Today is a great day to serve our patients
          </p>
        </div>
        <RefreshButton onClick={handleRefresh} refresh={refresh}/>
        {Object.keys(meetings).length === 0 ? (
          <div className="w-full flex flex-col flex-wrap items-center justify-between space-y-3 bg-red-200">
            <div className="w-full h-[100%] p-20 text-center text-[20px] text-dark-gray">
              Currently, there are no appointments available ! come back later
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-between space-x-8 space-y-5">
            <div className="w-full md:w-3/5 flex flex-col flex-wrap items-center justify-between space-y-3">
              <div className="w-full flex items-center justify-between text-[15px]">
                <h2 className="text-teal font-bold">Upcoming Appointments</h2>
                <Link className="underline font-semibold py-2 px-3 hover:bg-slate-100">
                  View all
                </Link>
              </div>
              <table className="w-full">
                <thead className="text-center w-full text-[14px] text-gray-500">
                  <tr className="p-5">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Symptoms</th>
                    <th className="px-4 py-3">Date/time</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="border-b border-t border-gray-200">
                  {meetings
                    ?.sort(
                      (a, b) =>
                        new Date(a.meetingTime) - new Date(b.meetingTime)
                    )
                    .map((item, index) => (
                      <tr
                        key={index}
                        className="text-gray-400 text-[13px] text-center hover:bg-slate-200 cursor-pointer"
                      >
                        <td className="px-4 py-3">
                          <div className="inline-flex items-center justify-start space-x-3">
                            <div className="rounded-full overflow-hidden w-8 h-8">
                              <img
                                src={femaleProfile}
                                className="w-full h-full"
                                alt={`female profile ${item}`}
                              />
                            </div>
                            <div className="flex flex-col">
                              <h4 className="text-sm font-semibold text-teal">
                                {findPsyByDid(item.psychologistDid).name}
                              </h4>
                              <p className="text-xs">
                                {
                                  findPsyByDid(item.psychologistDid)
                                    .specialization
                                }
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-2 py-3">{item.symptom}</td>
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
                        <td>
                          <Link
                            to={`/join/${item.id}`}
                            target="_blank"
                            className="whitespace-nowrap px-4 py-1 bg-green-400 hover:bg-green-500 text-black rounded-lg text-[13px]"
                          >
                            Join now
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {Object.keys(meetings).length === 0 ? (
              <div className="w-full">No Appointment available</div>
            ) : (
              <div
                className="bg-teal rounded-xl text-white px-5 py-3 w-full md:w-2/5 flex flex-col 
        items-center md:items-start justify-between space-y-6"
              >
                <div className="w-full h-full flex flex-col items-start justify-between space-y-6">
                  <div className="inline-flex items-center justify-start space-x-3 w-full">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={
                          findPsyByDid(upcomingAppointment[0].psychologistDid)
                            .profile
                        }
                        className="w-full h-full"
                        alt="female profile"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-between text-white">
                      <h4 className="text-[13px] font-semibold">
                        {
                          findPsyByDid(upcomingAppointment[0]?.psychologistDid)
                            .name
                        }
                      </h4>
                      <span className="text-[12px] font-light">
                        {
                          findPsyByDid(upcomingAppointment[0].psychologistDid)
                            .specialization
                        }
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-light text-sm">Symptom</h4>
                    <p className="font-semibold text-[12px]">
                      {upcomingAppointment[0]?.symptom}
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <h4 className="font-light text-[13px]">
                        Next Appointment
                      </h4>
                      <p className="font-semibold text-[12px]">
                        {new Date(
                          upcomingAppointment[0]?.meetingTime
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-light text-[13px]">Time</h4>
                      <p className="font-semibold text-[12px]">
                        {new Date(
                          upcomingAppointment[0]?.meetingTime
                        ).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center w-full justify-between">
                    <Link
                      to={`/join/${upcomingAppointment[0]?.id}`}
                      target="_blank"
                      className="bg-slate-100 hover:bg-slate-200 bg-opacity-20 block items-center justify-center text-[13px] py-2 px-4 
               text-white hover:text-gray-500 rounded-lg"
                    >
                      Join Now with
                    </Link>
                    <div className="inline-flex items-center justify-between space-x-3">
                      <Link
                        to={`/join/${upcomingAppointment[0]?.id}`}
                        target="_blank"
                        className="hover:bg-slate-100 hover:bg-opacity-20 rounded-full w-8 h-8 overflow-hidden"
                      >
                        <img
                          src={call}
                          className="w-full h-full"
                          alt="call icon"
                        />
                      </Link>
                      <Link
                        to={`/join/${upcomingAppointment[0]?.id}`}
                        target="_blank"
                        className="hover:bg-slate-100 hover:bg-opacity-20 rounded-full w-8 h-8 overflow-hidden"
                      >
                        <img
                          src={video}
                          className="w-full h-full"
                          alt="video icon"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="w-full flex items-start justify-between flex-wrap">
          <div className="w-full md:w-3/6 flex flex-col items-start justify-between space-y-8">
            <h3 className="text-[15px] font-bold text-teal">My schedule</h3>
            <Calendar />
          </div>
          <div className="w-full md:w-3/6 mt-16 flex flex-col md:items-center justify-end md:mt-auto space-y-8">
            <div className="grid grid-cols-2 gap-5">
              <div className="border w-[130px] h-[130px] items-center justify-center flex flex-col gap-6 rounded-[8px] p-2 border-[#EBEBEB]">
                <div className="flex gap-1">
                  <img src={patient} alt="patient" />
                  <h4 className="text-[#9C9A9A] text-xs font-semibold">
                    Patient
                  </h4>
                </div>
                <div>
                  <p className="text-[#8B7EF8] text-2xl">112</p>
                  <p className="text-[#9C9A9A] text-xs">Last 30 days</p>
                </div>
              </div>
              <div className="border w-[130px] h-[130px] flex items-center justify-center flex-col gap-6 rounded-[8px] p-2 border-[#EBEBEB]">
                <div className="flex gap-1">
                  <img src={report} alt="report" />
                  <h4 className="text-[#9C9A9A] text-xs font-semibold">
                    Report
                  </h4>
                </div>
                <div>
                  <p className="text-[#8B7EF8] text-2xl">108</p>
                  <p className="text-[#9C9A9A] text-xs">Last 30 days</p>
                </div>
              </div>
              <div className="border w-[130px] h-[130px] flex flex-col items-center justify-center gap-6 rounded-[8px] py-2 border-[#EBEBEB]">
                <div className="flex gap-1">
                  <img src={consultation} alt="consultation" />
                  <h4 className="text-[#9C9A9A] text-xs font-semibold">
                    Consultation
                  </h4>
                </div>
                <div>
                  <p className="text-[#8B7EF8] text-2xl">208</p>
                  <p className="text-[#9C9A9A] text-xs">Last 30 days</p>
                </div>
              </div>
              <div className="border w-[130px] h-[130px] flex flex-col items-center justify-center gap-6 rounded-[8px] p-2 border-[#EBEBEB]">
                <div className="flex gap-1">
                  <img src={repeat} alt="Repeat" />
                  <h4 className="text-[#9C9A9A] text-xs font-semibold">
                    Repeat Client
                  </h4>
                </div>
                <div>
                  <p className="text-[#8B7EF8] text-2xl">102</p>
                  <p className="text-[#9C9A9A] text-xs">Last 30 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PsychologistContent;
