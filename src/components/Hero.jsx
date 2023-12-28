import hero from "../assets/hero.jpg";

const Hero = () => {
  return (
    <div className="bg-light-gray w-full mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div className="px-8 lg:px-20 py-8 flex flex-col items-start justify-start md:justify-center space-y-5 lg:space-y-8 text-left">
            <h2 className="hidden md:block w-full text-[30px] lg:text-[50px] text-black leading-tight">
              Welcome to{" "}
              <a href="/" className="text-teal font-bold">
                Decent Connect
              </a>
            </h2>
            <h2 className="w-full text-[20px] lg:text-[30px] text-black leading-tight">
              Start your wellness journey today and now.
            </h2>
            <div className="flex flex-col space-y-3 text-[16px] lg:text-[20px]">
              <p className="w-full text-gray-400">
                Embark on a transformative journey with{" "}
                <span className="text-teal">Decent Connect</span>, uniting
                innovation and compassion to provide decentralized, secure
                online therapy.
              </p>
            </div>
            <div className="w-full">
              <button
                className="bg-teal text-white px-5 py-3 lg:px-10 lg:py-5 text-[16px] lg:text-[20px] text-center rounded-lg"
                type="button"
              >
                Book your psy now
              </button>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 p-5 lg:p-0 lg:drop-shadow-lg lg:shadow-lg lg:shadow-teal">
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
