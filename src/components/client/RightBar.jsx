/* eslint-disable react/prop-types */
import {
  DocumentDuplicateIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import {
  UserGroupIcon,
  UserIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import counselling from "../../assets/patient/Marriage counseling-bro.png";
import { useContext } from "react";
import { AppContext } from "../../context/ContextProvider";

const RightBar = ({ data }) => {
  const { did } = useContext(AppContext);
  return (
    <div className="bg-[#F7F6FE] w-full h-full border border-[#DBDAE5] mx-auto p-5">
      <div className="flex flex-col space-y-10 items-center justify-start">
        {/* Profile */}
        <div className="w-full flex items-center justify-between text-gray-400 space-x-4">
          <div className="bg-white hover:bg-gray-200 px-5 py-2 font-medium text-[14px] inline-flex items-center justify-between w-full">
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
        {/* Meeting */}
        <div className="w-full flex flex-col items-start justify-between space-y-5">
          <h3 className="text-teal font-medium text-[15px]">
            Schedule Meeting
          </h3>
          <div className="inline-flex space-x-2 items-center justify-center">
            <div className="bg-teal inline-flex items-center justify-between space-x-1 text-white py-2 px-4 rounded-lg">
              <UserIcon className="w-5 h-5" />
              <button type="button" className="text-[12px]">
                One-on-One
              </button>
            </div>
            <span className="text-[12px]">or</span>
            <div className="bg-teal inline-flex items-center justify-between space-x-1 text-white py-2 px-4 rounded-lg">
              <UserGroupIcon className="w-5 h-5" />
              <button type="button" className="text-[12px]">
                Conference
              </button>
            </div>
          </div>
        </div>
        {/*Medical History  */}
        <div className="w-full flex flex-col items-start justify-between space-y-5">
          <h3 className="text-teal font-medium text-[15px]">
            My Medical Report
          </h3>
          <button className="bg-teal text-white py-2 px-5 rounded-lg tex-[13px]">
            View all Report
          </button>
        </div>
        {/* Image */}
        <div className="w-full h-[300px]">
          <img
            src={counselling}
            alt="Counselling demo"
            className="w-full h-full object-fill"
          />
        </div>
        {/* Notifications */}
        <div className="w-full flex flex-col items-start justify-between space-y-5">
          <h3 className="w-full text-teal text-[15px] font-semibold">
            Latest Notification
          </h3>
          <div className="bg-white w-full inline-flex items-center justify-between space-x-6 py-3 px-4 rounded-lg">
            <div className="space-y-2">
              <h4 className="font-semibold text-[13px]">
                Webinar “Self care essentials...
              </h4>
              <p className="font-light text-[12px] text-gray-400">
                ft. Evelyne, Lynette, Jacey
              </p>
            </div>
            <div className="bg-gray-100 hover:bg-gray-200 px-2 py-4">
              <ArrowLongRightIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
