import About from "../components/About";
import Experience from "../components/Experience";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="w-full flex flex-col mx-auto items-center justify-start">
      <Header />
      <About />
      <Experience />
    </div>
  );
};

export default Home;
