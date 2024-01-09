/* eslint-disable react/prop-types */
import { Fragment, useContext, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AppContext } from "../context/ContextProvider";
import { XMarkIcon } from "@heroicons/react/24/solid";
import BookPsychologist from "../dashBoardsUi/BookPsychologist";

const Modal = ({ isOpen, closeModal }) => {
  const { modalContent, toggleModalContent } = useContext(AppContext);

  const cancelButtonRef = useRef(null);

  const handleCloseModal = () => {
    closeModal();
    toggleModalContent(null);
  };

  console.log(modalContent);

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
              shadow-xl transition-all sm:my-8 w-full md:w-[80%] lg:w-[50%]"
              >
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="absolute text-white top-0 right-0 bg-red-500 w-12 md:w-14 h-12 md:h-14 rounded-bl-3xl  z-50"
                >
                  <XMarkIcon className="text-[16px]" />
                </button>
                <div className="bg-white p-3">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full" ref={cancelButtonRef}>
                      {modalContent === "book-psychologist" ? (
                        <BookPsychologist />
                      ) : (
                        <div>Null</div>
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
};

export default Modal;
