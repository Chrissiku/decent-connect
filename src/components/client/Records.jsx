/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { AppContext } from "../../context/ContextProvider";
import { DocumentIcon } from "@heroicons/react/24/outline";
import RefreshButton from "../common/RefreshButton";

const Records = ({ records }) => {
  const { fetchMedicalRecords } = useContext(AppContext);

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = async () => {
    setRefresh(true);
    await fetchMedicalRecords();
    setRefresh(false);
  };

  return (
    <div className="w-full mx-auto px-5 md:px-10 py-14 flex flex-col flex-wrap space-y-5 items-start justify-between">
      <h1 className="text-[20px] font-bold">All your medical Records</h1>
      <RefreshButton onClick={handleRefresh} refresh={refresh} />
      {Object.keys(records).length === 0 ? (
        <div className="w-full flex flex-col flex-wrap items-center justify-between space-y-3 bg-red-200">
          <div className="w-full h-[100%] p-20 text-center text-[20px] text-dark-gray">
            Currently, there are no records available ! come back later
          </div>
        </div>
      ) : (
        <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {records.map((item, index) => (
            <div
              key={index}
              className="w-full flex flex-col items-center justify-between hover:bg-slate-300 
              bg-slate-100 p-3 rounded-xl space-y-3"
            >
              <div className="text-gray-500">
                <DocumentIcon className="w-20 h-20" />
              </div>
              <div>
                <h4 className="text-center w-full text-[15px] font-bold text-black">
                  {item?.name.slice(0, 16)}
                </h4>
              </div>
              <div className="w-full">
                <p className="break-all text-center text-[14px] font-bold text-gray-400 overflow-hidden">
                  {(
                    item?.summary +
                    "hdhddddddddddddddddddd dhd hdh ddhdh dhdh dhd hd hdhd h"
                  ).slice(0, 60) +
                    "..." +
                    item?.summary.slice(-5)}
                </p>
              </div>
              <a
                href={item.medicalRecord}
                download={"Medical Record-" + item.name}
                className="bg-teal w-full text-center  text-white rounded-lg p-2"
                type="button"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Records;
