/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import femaleProfile from "../../assets/patient/female.svg";
import maleProfile from "../../assets/patient/male.svg";
import call from "../../assets/patient/call.svg";
import video from "../../assets/patient/video.svg";
import { Calendar } from "../ui/calendar";
import patient from "../../assets/therapist/patient.svg";
import report from "../../assets/therapist/report.svg";
import consultation from "../../assets/therapist/consultation.svg";
import repeat from "../../assets/therapist/repeat.svg";

const PsychologistContent = ({ data }) => {
  return (
    <>
      <div className="w-full mx-auto px-5 md:px-10 py-14 flex flex-col flex-wrap space-y-5 items-start justify-between">
        <div>
          <h1 className="text-[20px] font-bold">
            Welcome <span className="text-teal">{data?.name}</span>
          </h1>
          <p className="text-[12px] text-gray-500">{data?.specialization}</p>
        </div>
        <div>
          <h1 className="text-[20px] font-bold text-teal">Overview</h1>
          <p className="text-[12px] text-gray-500">
            Today is a great day to serve our patients
          </p>
        </div>
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
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Time</th>
                </tr>
              </thead>
              <tbody className="border-b border-t border-gray-200">
                {[1, 2, 3].map((index, item) => (
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
                            Dr. Mary
                          </h4>
                          <p className="text-xs">Psychiatrist</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3">Anxiety</td>
                    <td className="px-2 py-3">20-01-24</td>
                    <td className="px-2 py-3">15:05</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="bg-teal rounded-xl text-white px-5 py-3 w-full md:w-2/5 flex flex-col 
        items-center md:items-start justify-between space-y-6"
          >
            <div className="w-full h-full flex flex-col items-start justify-between space-y-6">
              <div className="inline-flex items-center justify-start space-x-3 w-full">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={maleProfile}
                    className="w-full h-full"
                    alt="female profile"
                  />
                </div>
                <div className="flex flex-col items-start justify-between text-white">
                  <h4 className="text-[13px] font-semibold">Dr. John Doe</h4>
                  <span className="text-[12px] font-light">Driver</span>
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="font-light text-sm">Symptom</h4>
                <p className="font-semibold text-[12px]">Anxiety</p>
              </div>
              <div className="flex items-center justify-between w-full">
                <div>
                  <h4 className="font-light text-[13px]">Next Appointment</h4>
                  <p className="font-semibold text-[12px]">20 Jan 2024</p>
                </div>
                <div>
                  <h4 className="font-light text-[13px]">Time</h4>
                  <p className="font-semibold text-[12px]">15:05 PM</p>
                </div>
              </div>
              <div className="flex items-center w-full justify-between">
                <button
                  className="bg-slate-100 bg-opacity-20 block items-center justify-center text-[13px] py-2 px-4 
               text-white rounded-lg"
                >
                  Join Now with
                </button>
                <div className="inline-flex items-center justify-between space-x-3">
                  <button
                    type="button"
                    className="hover:bg-slate-100 hover:bg-opacity-20 rounded-full w-8 h-8 overflow-hidden"
                  >
                    <img src={call} className="w-full h-full" alt="call icon" />
                  </button>
                  <button
                    type="button"
                    className="hover:bg-slate-100 hover:bg-opacity-20 rounded-full w-8 h-8 overflow-hidden"
                  >
                    <img
                      src={video}
                      className="w-full h-full"
                      alt="video icon"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-start justify-between flex-wrap">
          <div className="w-full md:w-3/6 flex flex-col items-start justify-between space-y-8">
            <h3 className="text-[15px] font-bold text-teal">My schedule</h3>
            <Calendar />
          </div>
          <div className="w-full md:w-3/6 flex flex-col items-center justify-end mt-auto space-y-8">
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
