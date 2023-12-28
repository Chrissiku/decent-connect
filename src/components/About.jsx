import AboutSwiper from "./AboutSwiper";
import AboutInfo from "./AboutInfo";

const About = () => {
  return (
    <div className="w-full mx-auto">
      <div
        className="w-full grid grid-cols-1 lg:grid-cols-2 items-center justify-center px-5 py-20
      lg:px-20 space-x-5 lg:space-x-10 space-y-5 lg:space-y-10"
      >
        <AboutSwiper />
        <AboutInfo />
      </div>
    </div>
  );
};

export default About;
