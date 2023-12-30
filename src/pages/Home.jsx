import { useContext } from "react";
import About from "../components/About";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HowItWorks from "../components/HowItWorks";
import Journey from "../components/Journey";
import Psychologist from "../components/psychologist";
import { AppContext } from "../context/ContextProvider";

const Home = () => {
  const { userType, getUserType, toggleUserType } = useContext(AppContext);
  toggleUserType('me')
  console.log("Context : ", userType);
  console.log("Storage : ", getUserType());
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
    </>
  );
};

export default Home;
