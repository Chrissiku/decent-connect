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

const ConnectButton = ({ text, start }) => {
  const { logout } = useContext(AppContext);
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
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="p-2 absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-[#ebe9fd] shadow-lg outline-none">
          <div className="py-1 space-y-2">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    " w-full px-2 py-3 text-left text-sm inline-flex items-center justify-start space-x-3 rounded-lg"
                  )}
                >
                  <span className="text-teal border p-2 rounded-lg  border-teal">
                    <UserIcon className="w-6 h-6" />
                  </span>
                  <span className="flex flex-col items-start justify-center">
                    <span className="text-[16px]">Patient</span>
                    <span className="text-gray-400 text-[12px]">
                      {start} as Patient
                    </span>
                  </span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    " w-full px-2 py-3 text-left text-sm inline-flex items-center justify-start space-x-3 rounded-lg"
                  )}
                >
                  <span className="text-red-500 border p-2 rounded-lg  border-teal">
                    <HeartIcon className="w-6 h-6" />
                  </span>
                  <span className="flex flex-col items-start justify-center">
                    <span className="text-[16px]">Psychologist</span>
                    <span className="text-gray-400 text-[12px]">
                      {start} as Psychologist
                    </span>
                  </span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    " w-full px-2 py-3 text-left text-sm inline-flex items-center justify-start space-x-3 rounded-lg"
                  )}
                >
                  <span className="text-teal border p-2 rounded-lg  border-teal">
                    <HomeModernIcon className="w-6 h-6" />
                  </span>
                  <span className="flex flex-col items-start justify-center">
                    <span className="text-[16px]">Organization</span>
                    <span className="text-gray-400 text-[12px]">
                      {start} as an Organization
                    </span>
                  </span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  type="button"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    " w-full px-2 py-3 text-left text-sm inline-flex items-center justify-start space-x-3 rounded-lg"
                  )}
                >
                  <span className="text-teal border p-2 rounded-lg  border-teal">
                    <LockClosedIcon className="w-6 h-6" />
                  </span>
                  <span className="flex flex-col items-start justify-center">
                    <span className="text-[16px]">Logout</span>
                    <span className="text-gray-400 text-[12px]">
                      {start} as an Organization
                    </span>
                  </span>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ConnectButton;
