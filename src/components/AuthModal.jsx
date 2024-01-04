/* eslint-disable react/prop-types */
import { Fragment, useContext, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AppContext } from "../context/ContextProvider";
import Client from "./auth/Client";
import Organization from "./auth/Organization";
import Psychologist from "./auth/Psychologist";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function AuthModal({ isOpen, closeModal }) {
  const { authType, toggleUserType } = useContext(AppContext);

  const cancelButtonRef = useRef(null);

  const handleCloseModal = () => {
    closeModal();
    toggleUserType(null);
  };

  return (
    <Transition.Root appear show={isOpen} as={Fragment}>
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
              shadow-xl transition-all sm:my-8 w-full md:w-[80%]"
              >
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="absolute text-white top-0 right-0 bg-red-500 w-12 md:w-14 h-12 md:h-14 rounded-bl-3xl  z-50"
                >
                  <XMarkIcon className="text-[16px]" />
                </button>
                <div className="bg-white p-5">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full" ref={cancelButtonRef}>
                      {authType === "client" ? (
                        <Client />
                      ) : authType === "organization" ? (
                        <Organization />
                      ) : authType === "psychologist" ? (
                        <Psychologist />
                      ) : (
                        <main
                          className="w-full mx-auto grid place-items-center 
                        bg-white px-6 py-24 sm:py-32 lg:px-8"
                        >
                          <div className="text-center mx-auto">
                            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                              user type not found
                            </h1>
                            <p className="mt-6 text-base leading-7 text-gray-600">
                              Sorry, we couldn’t find the user type you’re
                              looking for.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                              <button
                                type="button"
                                onClick={closeModal}
                                className="rounded-md bg-teal px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Go back home
                              </button>
                            </div>
                          </div>
                        </main>
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
