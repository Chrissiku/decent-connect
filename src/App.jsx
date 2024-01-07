import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Client from "./pages/Client";
import Organization from "./pages/Organization";
import Psychologist from "./pages/Psychologist";
import { useContext } from "react";
import { AppContext } from "./context/ContextProvider";
import Modal from "./components/Modal";

export default function App() {
  const {
    userType,
    did,
    toggleModalContent,
    customModalOpen,
    setCustomModalOpen,
  } = useContext(AppContext);

  const closeModal = () => {
    setCustomModalOpen(false);
    toggleModalContent(null);
  };
  const PageComponent =
    userType === "organization"
      ? Organization
      : userType === "client"
      ? Client
      : userType === "psychologist"
      ? Psychologist
      : Home;

  console.log(did);
  return (
    <>
      <div>
        <div className="w-full mx-auto flex flex-col">
          <Routes>
            <Route path="/" element={<PageComponent />} />
          </Routes>
        </div>
        <Modal isOpen={customModalOpen} closeModal={closeModal} />
      </div>
    </>
  );
}
