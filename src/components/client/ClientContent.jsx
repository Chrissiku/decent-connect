/* eslint-disable react/prop-types */
import {
  DocumentDuplicateIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import hero from "../../assets/patient/hero-img.png";
import call from "../../assets/patient/call.svg";
import video from "../../assets/patient/video.svg";
import { Calendar } from "../ui/calendar";
import { useContext, useState } from "react";
import { AppContext } from "../../context/ContextProvider";
import RefreshButton from "../common/RefreshButton";

const ClientContent = ({ data }) => {
  const {
    psychologistList,
    findOrganizationByRecordId,
    meetings,
    did,
    togglePageView,
    setCustomModalOpen,
    toggleModalContent,
    setSelectedDid,
    findPsyByDid,
    fetchPsychologists,
    fetchMeetings,
  } = useContext(AppContext);

  const upcomingAppointment = meetings.sort(
    (a, b) => new Date(a.meetingTime) - new Date(b.meetingTime)
  );
  const recentScheduled = upcomingAppointment.slice(0, 3);
  const [refresh, setRefresh] = useState(false);

  const toggleBooking = (selectedDid) => {
    toggleModalContent("book-psychologist");
    setCustomModalOpen(true);
    setSelectedDid(selectedDid);
  };

  const handleRefresh = async () => {
    setRefresh(true);
    await fetchPsychologists();
    await fetchMeetings();
    setRefresh(false);
  };

  return (
    <div className="w-full mx-auto px-5 md:px-10 py-14 flex flex-col flex-wrap space-y-5 items-start justify-between">
      <h1 className="text-[20px] font-bold">
        Welcome <span className="text-teal">{data?.name}!</span>
      </h1>
      <div className="flex w-full lg:hidden items-center justify-between text-gray-400 space-x-4">
        <div className="bg-slate-200 rounded-[8px] w-[250px] hover:bg-gray-200 px-5 py-2 font-medium text-[14px] inline-flex items-center gap-2">
          <p>{did.slice(0, 10) + "..." + did.slice(-10)}</p>
          <span>
            <DocumentDuplicateIcon className="w-[20px] h-[20px]" />
          </span>
        </div>
        <div className="inline-flex items-center justify-between space-x-1 hover:bg-gray-300 py-2 px-3 rounded-lg">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img
              src={data.picture}
              className="w-full h-full"
              alt="profile picture"
            />
          </div>
          <button className="text-gray-400">
            <ChevronDownIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-[15px] text-gray-500">
        Search for the best therapists to attend to you! our therapists are
        qualified and certified to give you the best service
      </p>
      <div className="w-full">
        <img src={hero} className="w-full h-full" alt="Hero image" />
      </div>
      <RefreshButton onClick={handleRefresh} refresh={refresh} />
      <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-between space-x-8 space-y-5">
        {Object.keys(psychologistList).length === 0 ? (
          <div className="w-full md:w-3/5 flex flex-col flex-wrap items-center justify-between space-y-3 bg-red-200">
            <div className="w-full h-[100%] p-20 text-center text-[20px] text-dark-gray">
              Currently, there are no therapists available !
            </div>
          </div>
        ) : (
          <div className="w-full md:w-3/5 flex flex-col flex-wrap items-center justify-between space-y-3">
            <div className="w-full flex items-center justify-between space-x-3 text-[15px]">
              <h2 className="text-teal font-bold">Therapists Onboard</h2>{" "}
              <Link
                onClick={() => togglePageView("psychologist")}
                className="underline font-semibold py-2 px-3 hover:bg-slate-100"
              >
                View all
              </Link>
            </div>
            <div
              className="w-full flex flex-col items-center justify-between md:justify-start 
            border-b-2 border-t-2 border-gray-200 py-2 space-y-1"
            >
              {[...psychologistList]
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                ?.map((psy, index) => (
                  <div
                    key={index + "psy"}
                    className={`w-full flex justify-between space-x-4 px-2 py-4 rounded-xl ${
                      psy.organization === "self" || psy.organization === ""
                        ? "hover:bg-red-200"
                        : "hover:bg-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center justify-start space-x-3">
                        <div className="rounded-full overflow-hidden w-14 h-14">
                          <img
                            src={psy?.profile}
                            className="w-full h-full object-cover"
                            alt={`female profile ${psy.name}`}
                          />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="capitalize text-[14px] font-semibold text-teal">
                            {psy?.name}
                          </h4>
                          <p className="text-[12px] text-[#808080]">
                            {psy?.specialization} psychologist
                          </p>
                          <p className="text-[12px] text-shade text-left">
                            {psy.organization === "self" ||
                            psy.organization === ""
                              ? `@ Self Employed`
                              : `@
                            ${findOrganizationByRecordId(psy?.recordId).name}`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleBooking(psy?.did)}
                      className="rounded-xl text-white py-1 text-[12px] font-medium px-6 bg-teal"
                    >
                      Book Now
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
        <div
          className="bg-teal rounded-xl text-white px-5 py-3 w-full md:w-2/5 flex flex-col 
        items-center md:items-start justify-between space-y-4"
        >
          <h4 className="w-full text-[14px]">Upcoming Appointment</h4>
          {Object.keys(meetings).length === 0 ? (
            <div className="w-full">No Appointment available</div>
          ) : (
            <div className="w-full h-full flex flex-col items-start justify-between space-y-4">
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
                    {findPsyByDid(upcomingAppointment[0]?.psychologistDid).name}
                  </h4>
                  <span className="text-[12px] font-light">
                    {
                      findPsyByDid(upcomingAppointment[0]?.psychologistDid)
                        .specialization
                    }{" "}
                    therapist
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="font-light text-sm">Agenda</h4>
                <p className="font-semibold text-[12px]">
                  {upcomingAppointment[0]?.reason.slice(0, 20) + " ..."}
                </p>
              </div>
              <div className="flex items-center justify-between w-full">
                <div>
                  <h4 className="font-light text-[13px]">Next Appointment</h4>
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
                    <img src={call} className="w-full h-full" alt="call icon" />
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
          )}
        </div>
      </div>
      <div className="w-full flex items-start justify-between flex-wrap">
        <div className="w-full md:w-3/6 flex flex-col items-start justify-between space-y-8">
          <h3 className="text-[15px] font-bold text-teal">My schedule</h3>
          <Calendar />
        </div>
        <div className="w-full md:w-3/6 flex flex-col items-start justify-between space-y-8">
          <h3 className="text-teal text-[15px] font-semibold">
            Recently Scheduled Appointments
          </h3>
          <div className="bg-slate-100 rounded-xl flex flex-col items-center justify-start space-y-3 w-full p-3">
            {recentScheduled?.map((item, index) => (
              <div
                key={index + "meeting"}
                className="w-full rounded-lg bg-teal p-4 text-white inline-flex items-center 
                justify-start space-x-4"
              >
                <p className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <span className="text-teal text-xl font-bold mx-auto">P</span>
                </p>
                <div className="flex flex-col items-start justify-between space-y-1">
                  <h4 className="font-semibold text-[13px]">
                    {item?.reason.slice(0, 25) + " ..."}
                  </h4>
                  <p className="text-[12px]">
                    {new Date(item?.meetingTime).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    |{" "}
                    {new Date(item?.meetingTime).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientContent;
