import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="w-full flex flex-col mx-auto items-center justify-start">
      <Navbar />
      <Hero />
    </div>
  );
};

export default Home;
