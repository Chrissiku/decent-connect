import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/ContextProvider";
import { v4 as uid } from "uuid";

const JoinAppointment = () => {
  const { meetings, did } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (did) {
      setUser(did);
      setUserName("You Name");
    }
  }, [did]);

  const params = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // This will navigate back to the previous page
  };

  const myMeeting = async (element) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      parseInt(import.meta.env.VITE_ZEGOCLOUD_APP_ID),
      import.meta.env.VITE_ZEGOCLOUD_SERVER_SECRET,
      params.id,
      user ? user : uid(),
      userName ? userName : "Your Name"
      // user?.displayName ? user.displayName : generateMeetingID()
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp?.joinRoom({
      container: element,
      maxUsers: 2,
      sharedLinks: [
        {
          name: "Personal link",
          url: window.location.origin,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };

  return (
    <div className="bg-light-gray w-full mx-auto grid grid-cols-1 items-center justify-center">
      <div
        style={{
          height: "100vh",
        }}
        className="grid grid-cols-1 items-center justify-center border border-red-100"
      >
        <div className="mx-auto w-[200px]">
          <button
            type="button"
            className="bg-teal px-5 py-3 text-white self-center w-full rounded-lg"
            onClick={handleGoBack}
          >
            Go Back
          </button>
        </div>
        <div className="myCallContainer" ref={myMeeting}></div>
      </div>
    </div>
  );
};

export default JoinAppointment;
