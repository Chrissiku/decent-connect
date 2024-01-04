import { useContext, useEffect } from "react";
import About from "../components/About";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HowItWorks from "../components/HowItWorks";
import Journey from "../components/Journey";
import Psychologist from "../components/psychologist";
import { AppContext } from "../context/ContextProvider";
import AuthModal from "../components/AuthModal";

const Home = () => {
  const { userType, modalOpen, setModalOpen, toggleAuthType } = useContext(
    AppContext
  );

  const closeModal = () => {
    setModalOpen(false);
    toggleAuthType(null);
  };

  useEffect(() => {
    console.log(userType);
  }, [userType]);
  return (
    <>
      <div className="w-full flex flex-col mx-auto">
        <Header />
        <About />
        <Experience />
        <HowItWorks />
        <Psychologist />
        <Journey />
        <Footer />
      </div>
      <AuthModal isOpen={modalOpen} closeModal={closeModal} />
    </>
  );
};

export default Home;
