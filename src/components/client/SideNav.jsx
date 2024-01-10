import {
  Squares2X2Icon,
  CalendarDaysIcon,
  UserPlusIcon,
  DocumentTextIcon,
  UserIcon,
  ArrowLeftStartOnRectangleIcon,
  Bars4Icon,
} from "@heroicons/react/24/solid";
import logo from "../../assets/patient/logo.svg";
import { useContext } from "react";
import { AppContext } from "../../context/ContextProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const SideNav = () => {
  const { logout, togglePageView } = useContext(AppContext);
  return (
    <>
      <div className="lg:hidden">
        <DropdownMenu className="bg-white w-full h-screen flex flex-col items-center justify-start space-y-[50px] py-14">
          <DropdownMenuTrigger asChild>
            <Bars4Icon className="w-10 m-3 rounded-[8px] cursor-pointer h-10 text-[#8B7EF8] border border-gray-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="!bg-[#F7F6FE] !border !border-[#DBDAE5]">
            <DropdownMenuItem className="w-[150px] lg:w-full h-16 px-10">
              <img
                src={logo}
                className="w-[150px] lg:w-full h-full object-contain"
                alt="Decent connect"
              />
            </DropdownMenuItem>
            <DropdownMenuGroup className="w-full flex flex-col items-center justify-center">
              <DropdownMenuItem
                onClick={() => togglePageView("home")}
                type="button"
                className="py-5 px-10 w-full text-shade inline-flex items-center justify-start space-x-4 
            hover:bg-white"
              >
                <span>
                  <Squares2X2Icon className="w-[20px] h-[20px]" />
                </span>
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => togglePageView("appointment")}
                type="button"
                className="py-5 px-10 w-full text-shade inline-flex items-center justify-start space-x-4 
            hover:bg-white"
              >
                <span>
                  <CalendarDaysIcon className="w-[20px] h-[20px]" />
                </span>
                <span>Appointment</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => togglePageView("psychologist")}
                type="button"
                className="py-5 px-10 w-full text-shade inline-flex items-center justify-start space-x-4 
            hover:bg-white"
              >
                <span>
                  <UserPlusIcon className="w-[20px] h-[20px]" />
                </span>
                <span>Therapist</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => togglePageView("appointment")}
                type="button"
                className="py-5 px-10 w-full text-shade inline-flex items-center justify-start space-x-4 
            hover:bg-white"
              >
                <span>
                  <CalendarDaysIcon className="w-[20px] h-[20px]" />
                </span>
                <span>Appointment</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => togglePageView("records")}
                type="button"
                className="py-5 px-10 w-full text-shade inline-flex items-center justify-start space-x-4 
            hover:bg-white"
              >
                <span>
                  <DocumentTextIcon className="w-[20px] h-[20px]" />
                </span>
                <span>Records</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup className="w-full flex flex-col items-center justify-center">
              <DropdownMenuItem
                type="button"
                className="py-5 px-10 w-full text-shade inline-flex items-center justify-start space-x-4 
            hover:bg-white"
              >
                <span>
                  <UserIcon className="w-[20px] h-[20px]" />
                </span>
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                type="button"
                className="py-5 px-10 w-full text-shade inline-flex items-center justify-start space-x-4 
            hover:bg-white"
                onClick={logout}
              >
                <span>
                  <ArrowLeftStartOnRectangleIcon className="w-[20px] h-[20px]" />
                </span>
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Desktop view */}
      <div className="w-full h-full hidden bg-[#F7F6FE] border border-r-[#DBDAE5] lg:block">
        <nav className="w-full h-screen flex flex-col items-center justify-start space-y-[50px] py-14">
          <div className="w-[150px] md:w-full h-16 px-10">
            <img
              src={logo}
              className="w-[150px] md:w-full h-full object-contain"
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
              onClick={() => togglePageView("records")}
              type="button"
              className="py-5 px-10 w-full text-shade inline-flex items-center justify-start space-x-4 
            hover:bg-white"
            >
              <span>
                <DocumentTextIcon className="w-[20px] h-[20px]" />
              </span>
              <span>Records</span>
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
    </>
  );
};

export default SideNav;
