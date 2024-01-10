import group from "/group.jpg";
import guide from "/guide.jpg";
import personal from "/personal.jpg";

const Experience = () => {
  return (
    <div className="w-full mx-auto">
      <div className="flex flex-col items-center justify-center w-full text-center py-5 lg:py-10 space-y-16">
        <h3 className="text-black text-[20px] md:text-[25px] lg:text-[32px]">
          Experience Seamless Psychotherapy Support.
        </h3>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="order-1 bg-light-gray p-8 md:p-14 lg:p-20 flex flex-col items-center justify-center space-y-5">
            <h3 className="text-[20px] md:text-[25px] lg:text-[28px]">
              Mental Wellness Support
            </h3>
            <p className="text-gray-400 text-[16px]">
              Engage in one-on-one sessions with our experienced therapists who
              offer personalized support to enhance your mental well-being.
            </p>
          </div>
          <div className="order-2 flex flex-col items-center justify-center">
            <img
              className="w-full h-full object-cover"
              src={guide}
              alt="experience pic"
            />
          </div>
          <div className="order-3 md:order-4 lg:order-3 bg-light-gray p-8 md:p-14 lg:p-20 flex flex-col items-center justify-center space-y-5">
            <h3 className="text-[20px] md:text-[25px] lg:text-[28px]">
              Personalized Therapeutic Guidance via Video
            </h3>
            <p className="text-gray-400 text-[16px]">
              Elevate your mental health journey through personalized session,
              connecting with experienced therapists on video conferencing.
            </p>
          </div>
          <div className="order-4 md:order-3 lg:order-4 flex flex-col items-center justify-center">
            <img
              className="w-full h-full object-cover"
              src={personal}
              alt="experience pic"
            />
          </div>
          <div className="order-5 bg-light-gray p-8 md:p-14 lg:p-20 flex flex-col items-center justify-center space-y-5">
            <h3 className="text-[20px] md:text-[25px] lg:text-[28px]">
              Group Therapeutic Experience
            </h3>
            <p className="text-gray-400 text-[16px]">
              Join a supportive community of peers and participate in group
              sessions focused on mental well-being, providing valuable insights
              and mutual support on your journey to mental health.
            </p>
          </div>
          <div className="order-6 flex flex-col items-center justify-center">
            <img
              className="w-full h-full object-cover"
              src={group}
              alt="experience pic"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
