import { useContext, useState } from "react";
import { AppContext } from "../context/ContextProvider";
import useImageUploader from "../utils/imageUploader";
import { v4 as meetingId } from "uuid";

const IssueRecord = () => {
  const {
    web5,
    did,
    protocolDefinition,
    selectedDid,
    setCustomModalOpen,
  } = useContext(AppContext);
  const { picture: medicalRecord, handleImageChange } = useImageUploader();
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const formData = {
    id: meetingId(),
    clientDid: selectedDid,
    psychologistDid: did,
    medicalRecord,
    name,
    summary,
  };

  const issueRecord = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!formData.name || !formData.medicalRecord) {
      alert("Please Fill all required fields !!");
      return;
    } else {
      try {
        const { record, status } = await web5.dwn.records.write({
          data: formData,
          message: {
            protocol: protocolDefinition.protocol,
            protocolPath: "medicalRecord",
            schema: protocolDefinition.types.medicalRecord.schema,
            recipient: selectedDid,
            published: true,
          },
        });

        const DIDs = [did, selectedDid];
        await Promise.all(
          DIDs.map(async (did) => {
            await record.send(did);
          })
        );

        if (status.code === 202 && status.detail === "Accepted") {
          setName("");
          setSummary("");
          setCustomModalOpen(false);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error Creating a medicalRecord", error);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="md:p-5 grid grid-cols-1 items-center justify-center space-y-5">
        {loading ? (
          <div className="w-full h-full text-gray-500">Creating Record</div>
        ) : (
          <>
            <h3 className="text-teal font-bold text-[20px]">
              Issue Record to this patient
            </h3>
            <form
              className="space-y-3 md:space-y-4"
              autoComplete="off"
              onSubmit={issueRecord}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-between space-x-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-[14px] font-medium text-gray-900"
                  >
                    Record Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                    placeholder="eg. Emotional well being meeting"
                    required
                  />
                </div>
                {/* Medical record */}
                <div>
                  <label
                    htmlFor="medicalRecord"
                    className="block mb-2 text-[14px] font-medium text-gray-900"
                  >
                    Record <span className="text-red-500">*</span>
                    <span className="text-gray-400 text-[12px]">{`(Max size < 700kb)`}</span>
                  </label>
                  <input
                    type="file"
                    name="medicalRecord"
                    id="medicalRecord"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                    onChange={handleImageChange}
                    required
                  />
                </div>
              </div>
              {/* Summary */}
              <div>
                <label
                  htmlFor="summary"
                  className="block mb-2 text-[14px] font-medium text-gray-900"
                >
                  Summary <span className="text-red-500">(Optional)</span>
                </label>
                <textarea
                  type="text"
                  name="summary"
                  id="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                  placeholder="eg. Emotional well being"
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-teal hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Issue Record
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default IssueRecord;
