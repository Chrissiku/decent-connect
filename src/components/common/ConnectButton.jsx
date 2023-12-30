/* eslint-disable react/prop-types */
import { Fragment, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  UserIcon,
  HomeModernIcon,
  HeartIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { AppContext } from "../../context/ContextProvider";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const buttonConfig = [
  {
    icon: <UserIcon className="w-6 h-6 text-[#3498db]" />,
    label: "Patient",
    userType: "patient",
  },
  {
    icon: <HeartIcon className="w-6 h-6 text-[#2ecc71]" />,
    label: "Psychologist",
    userType: "psychologist",
  },
  {
    icon: <HomeModernIcon className="w-6 h-6 text-[#9b59b6]" />,
    label: "Organization",
    userType: "organization",
  },
  {
    icon: <LockClosedIcon className="w-6 h-6 text-red-600" />,
    label: "Logout",
    userType: "logout",
  },
];

const ConnectButton = ({ text, start }) => {
  const { logout, toggleUserType } = useContext(AppContext);
  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <div>
        <Menu.Button
          className="inline-flex w-full justify-center items-center gap-x-2 
      bg-teal text-white text-center py-2 px-5 lg:py-3 lg:px-10 rounded-lg"
        >
          {text}
          <ChevronDownIcon
            className="-mr-1 h-4 w-4 text-gray-200"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-200"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="p-2 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-[#ebe9fd] shadow-lg outline-none">
          <div className="py-1 space-y-2">
            {buttonConfig.map(({ icon, label, userType }) => (
              <Menu.Item key={userType}>
                <button
                  onClick={() =>
                    userType === "logout" ? logout() : toggleUserType(userType)
                  }
                  type="button"
                  className={classNames(
                    "hover:bg-gray-100 bg-gray-50 w-full px-2 py-3 text-left text-sm inline-flex items-center justify-start space-x-3 rounded-lg"
                  )}
                >
                  <span className="border p-2 rounded-lg border-teal">
                    {icon}
                  </span>
                  <span className="flex flex-col items-start justify-center">
                    <span className="text-[16px]">{label}</span>
                    <span className="text-gray-400 text-[12px]">
                      {start} as {label}
                    </span>
                  </span>
                </button>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ConnectButton;
