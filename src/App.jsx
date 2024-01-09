import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Client from "./pages/Client";
import Organization from "./pages/Organization";
import Psychologist from "./pages/Psychologist";
import Modal from "./components/Modal";
import JoinAppointment from "./pages/JoinAppointment";
import { useAppContext } from "./context/ContextProvider";

export default function App() {
  const {
    userType,
    toggleModalContent,
    customModalOpen,
    setCustomModalOpen,
    setSelectedDid,
  } = useAppContext();

  const closeModal = () => {
    setCustomModalOpen(false);
    toggleModalContent(null);
    setSelectedDid(null);
  };
  const PageComponent =
    userType === "organization"
      ? Organization
      : userType === "client"
      ? Client
      : userType === "psychologist"
      ? Psychologist
      : Home;

  // console.log(did);

  return (
    <>
      <div>
        <div className="w-full mx-auto flex flex-col">
          <Routes>
            <Route path="/" element={<PageComponent />} />
            <Route path="/join/:id" element={<JoinAppointment />} />
          </Routes>
        </div>
        <Modal isOpen={customModalOpen} closeModal={closeModal} />
      </div>
    </>
  );
}
