import About from "../components/About";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="w-full flex flex-col mx-auto items-center justify-start">
      <Header />
      <About />
    </div>
  );
};

export default Home;
