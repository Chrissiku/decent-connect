import Hero from "./Hero";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="w-full mx-auto bg-light-gray">
      <Navbar />
      <Hero />
    </div>
  );
};

export default Header;
