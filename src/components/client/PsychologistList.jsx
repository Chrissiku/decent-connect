/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AppContext } from "../../context/ContextProvider";
import { DocumentIcon } from "@heroicons/react/24/outline";

const PsychologistList = ({ psy }) => {
  const {
    findOrganizationByRecordId,
    setCustomModalOpen,
    toggleModalContent,
    setSelectedDid,
  } = useContext(AppContext);

  const toggleBooking = (selectedDid) => {
    toggleModalContent("book-psychologist");
    setCustomModalOpen(true);
    setSelectedDid(selectedDid);
  };

  return (
    <div className="w-full mx-auto px-5 md:px-10 py-14 flex flex-col flex-wrap space-y-5 items-start justify-between">
      <h1 className="text-[20px] font-bold">Therapist List List</h1>
      <p className="text-[15px] text-gray-500">
        Search for the best therapists to attend to you! our therapists are
        qualified and certified to give you the best service
      </p>
      {Object.keys(psy).length === 0 ? (
        <div className="w-full flex flex-col flex-wrap items-center justify-between space-y-3 bg-red-200">
          <div className="w-full h-[100%] p-20 text-center text-[20px] text-dark-gray">
            Currently, there are no therapists available ! come back later
          </div>
        </div>
      ) : (
        <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {psy.map((item, index) => (
            <div
              key={index}
              className="relative group w-full flex flex-col items-center justify-between hover:bg-slate-300 bg-slate-100 p-3 rounded-xl space-y-3"
            >
              <div className="text-shade hidden group-hover:block absolute top-2 right-2">
                <DocumentIcon className="w-10 h-10" />
              </div>
              <div className="w-full h-[180px] rounded-lg overflow-hidden">
                <img
                  src={item.profile}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-center w-full text-[15px] font-bold text-black">
                  {item?.name}
                </h4>
                <div className="w-full inline-flex items-center justify-between text-[14px] text-teal space-x-1">
                  <span>{item?.specialization}</span>
                  <span className="text-shade">
                    {item?.organization === "self" || item?.organization === ""
                      ? `@ Self Employed`
                      : `@
                            ${findOrganizationByRecordId(item?.recordId).name}`}
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleBooking(item.did)}
                className="bg-teal w-full text-center  text-white rounded-lg p-2"
                type="button"
              >
                Book now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PsychologistList;
