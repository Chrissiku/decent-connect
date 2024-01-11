import { useContext, useState } from "react";
import { AppContext } from "../context/ContextProvider";
import { getCurrentDateTime } from "../utils/constant";
import useImageUploader from "../utils/imageUploader";
import { v4 as meetingId } from "uuid";
import Process from "../components/common/Process";

const BookPsychologist = () => {
  const {
    web5,
    did,
    protocolDefinition,
    selectedDid,
    setCustomModalOpen,
  } = useContext(AppContext);
  const { picture: medicalRecord, handleImageChange } = useImageUploader();
  const [reason, setReason] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [symptom, setSymptom] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const formData = {
    id: meetingId(),
    clientDid: did,
    psychologistDid: selectedDid,
    medicalRecord,
    reason,
    meetingTime,
    symptom,
    moreInfo,
  };

  const bookMeeting = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!formData.reason || !formData.meetingTime || !formData.symptom) {
      alert("Please Fill all required fields !!");
      return;
    } else {
      try {
        const { record, status } = await web5.dwn.records.write({
          data: formData,
          message: {
            protocol: protocolDefinition.protocol,
            protocolPath: "meetings",
            schema: protocolDefinition.types.meetings.schema,
            recipient: did,
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
          setReason("");
          setMeetingTime("");
          setSymptom("");
          setMoreInfo("client");
          setCustomModalOpen(false);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error Creating a meeting", error);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {loading ? (
        <Process />
      ) : (
        <div className="md:p-5 grid grid-cols-1 items-center justify-center space-y-5">
          <h3 className="text-teal font-bold text-[20px]">
            Complete this form to schedule an Meeting.
          </h3>
          <form
            className="space-y-3 md:space-y-4"
            autoComplete="off"
            onSubmit={bookMeeting}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-between space-x-2">
              {/* Reason */}
              <div>
                <label
                  htmlFor="reason"
                  className="block mb-2 text-[14px] font-medium text-gray-900"
                >
                  Reason of this meeting <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="reason"
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                  placeholder="eg. Emotional well being"
                  required
                />
              </div>

              {/* Meeting time */}
              <div>
                <label
                  htmlFor="meetingTime"
                  className="block mb-2 text-[14px] font-medium text-gray-900"
                >
                  Meting date and time<span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="meetingTime"
                  id="meetingTime"
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                  placeholder="Your Date of birth here"
                  min={getCurrentDateTime()}
                  required
                />
              </div>
            </div>
            {/* Symptoms */}
            <div>
              <label
                htmlFor="symptom"
                className="block mb-2 text-[14px] font-medium text-gray-900"
              >
                What are you symptoms <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="symptom"
                id="symptom"
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                placeholder="eg. Emotional well being"
                required
              />
            </div>

            {/* Medical record */}
            <div>
              <label
                htmlFor="medicalRecord"
                className="block mb-2 text-[14px] font-medium text-gray-900"
              >
                Any previous medical record ?{" "}
                <span className="text-red-500">(Optional)</span>
                <span className="text-gray-400 text-[12px]">{`(Maximum size < 700kb)`}</span>
              </label>
              <input
                type="file"
                name="medicalRecord"
                id="medicalRecord"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                onChange={handleImageChange}
              />
            </div>

            {/* Addition information */}
            <div>
              <label
                htmlFor="moreInfo"
                className="block mb-2 text-[14px] font-medium text-gray-900"
              >
                More information that may help the therapist know you more ?
                <span className="text-red-500">(Optional)</span>
              </label>
              <textarea
                type="text"
                name="moreInfo"
                id="moreInfo"
                value={moreInfo}
                onChange={(e) => setMoreInfo(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-3"
                placeholder="eg. More info about your feelings"
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-teal hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Schedule now
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookPsychologist;
