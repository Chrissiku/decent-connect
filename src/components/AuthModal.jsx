import { Fragment, useContext, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AppContext } from "../context/ContextProvider";
import Patient from "./auth/Patient";
import Organization from "./auth/Organization";
import Psychologist from "./auth/Psychologist";

export default function AuthModal({ isOpen, closeModal, openModal }) {
  const { userType, toggleUserType } = useContext(AppContext);

  const cancelButtonRef = useRef(null);

  const handleCloseModal = () => {
    closeModal();
    toggleUserType(null);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleCloseModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded-lg bg-white text-left 
              shadow-xl transition-all sm:my-8 w-[90%] md:w-[80%]"
              >
                <div className="bg-white p-4">
                  <div className="sm:flex sm:items-start">
                    <div className="" ref={cancelButtonRef}>
                      {userType === "patient" ? (
                        <Patient />
                      ) : userType === "organization" ? (
                        <Organization />
                      ) : userType === "psychologist" ? (
                        <Psychologist />
                      ) : (
                        "select a valid user type"
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
