import hero from "../assets/hero.jpg";
import ConnectButton from "./common/ConnectButton";

const Hero = () => {
  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div className="px-8 lg:px-20 py-8 flex flex-col items-start justify-start md:justify-center space-y-5 lg:space-y-8 text-left">
            <h1 className="w-full text-[24px] font-bold md:text-[30px] lg:text-5xl text-black leading-[28.8px] md:leading-[36px] lg:leading-[60px]">
              Start your wellness journey today and now.
            </h1>
            <div className="flex flex-col space-y-3 text-[16px] lg:text-[20px]">
              <p className="w-full text-gray-400 leading-[24px] md:leading-[28px] lg:leading-[32px]">
                Embark on a transformative journey with{" "}
                <span className="text-teal">Decent Connect</span>, uniting
                innovation and compassion to provide decentralized, secure
                online therapy.
              </p>
            </div>
            <div className="w-full max-w-[300px]">
              <ConnectButton text="Start your journey" start="Start" />
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 p-5 lg:p-0">
          <div className="w-full md:h-[250px] lg:h-full">
            <img
              src={hero}
              alt="hero pic"
              className="w-full h-full border-2 border-teal md:border-none object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
