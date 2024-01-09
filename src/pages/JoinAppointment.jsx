import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/ContextProvider";

const JoinAppointment = () => {
  const { meetings, did } = useContext(AppContext);

  const params = useParams();
  const navigate = useNavigate();

  const myMeeting = async (element) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      parseInt(import.meta.env.VITE_ZEGOCLOUD_APP_ID),
      import.meta.env.VITE_ZEGOCLOUD_SERVER_SECRET,
      params.id,
      {
        userName: meetings[0].symptom, // Replace with the actual userName
        userID: did, // Replace with the actual userID
      }
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
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <div
        className="myCallContainer"
        ref={myMeeting}
        style={{ width: "100%", height: "100vh" }}
      ></div>
    </div>
  );
};

export default JoinAppointment;
