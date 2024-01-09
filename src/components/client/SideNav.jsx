import {
  Squares2X2Icon,
  CalendarDaysIcon,
  UserPlusIcon,
  DocumentTextIcon,
  UserIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import logo from "../../assets/patient/logo.svg";
import { useContext } from "react";
import { AppContext } from "../../context/ContextProvider";

const SideNav = () => {
  const { logout, togglePageView } = useContext(AppContext);
  return (
    <div className="w-full h-full bg-[#F7F6FE] border border-r-[#DBDAE5]">
      <nav className="w-full h-screen flex flex-col items-center justify-start space-y-[50px] py-14">
        <div className="w-full h-16 px-10">
          <img
            src={logo}
            className="w-full h-full object-contain"
            alt="Decent connect"
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <button
            onClick={() => togglePageView("home")}
            type="button"
            className="py-5 px-10 w-full text-shade inline-flex items-center justify-start space-x-4 
            hover:bg-white"
          >
            <span>
              <Squares2X2Icon className="w-[20px] h-[20px]" />
            </span>
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => togglePageView("psychologist")}
            type="button"
            className="py-5 px-10 w-full text-shade inline-flex items-center justify-start space-x-4 
            hover:bg-white"
          >
            <span>
              <UserPlusIcon className="w-[20px] h-[20px]" />
            </span>
            <span>Therapist</span>
          </button>
          <button
            onClick={() => togglePageView("appointment")}
            type="button"
            className="py-5 px-10 w-full text-shade inline-flex items-center justify-start space-x-4 
            hover:bg-white"
          >
            <span>
              <CalendarDaysIcon className="w-[20px] h-[20px]" />
            </span>
            <span>Appointment</span>
          </button>
          <button
            type="button"
            className="py-5 px-10 w-full text-shade inline-flex items-center justify-start space-x-4 
            hover:bg-white"
          >
            <span>
              <DocumentTextIcon className="w-[20px] h-[20px]" />
            </span>
            <span>Reports</span>
          </button>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <button
            type="button"
            className="py-5 px-10 w-full text-shade inline-flex items-center justify-start space-x-4 
            hover:bg-white"
          >
            <span>
              <UserIcon className="w-[20px] h-[20px]" />
            </span>
            <span>Account</span>
          </button>
          <button
            type="button"
            className="py-5 px-10 w-full text-shade inline-flex items-center justify-start space-x-4 
            hover:bg-white"
            onClick={logout}
          >
            <span>
              <ArrowLeftStartOnRectangleIcon className="w-[20px] h-[20px]" />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default SideNav;
