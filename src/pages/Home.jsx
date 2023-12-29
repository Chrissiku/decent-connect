import About from "../components/About";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HowItWorks from "../components/HowItWorks";
import Journey from "../components/Journey";
import Mentor from "../components/Mentor";

const Home = () => {
  return (
    <>
      <div className="w-full flex flex-col mx-auto">
        <Header />
        <About />
        <Experience />
        <HowItWorks />
        <Mentor />
        <Journey />
        <Footer />
      </div>
    </>
  );
};

export default Home;
