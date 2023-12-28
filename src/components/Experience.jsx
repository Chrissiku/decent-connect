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
              Career Guidance Excellence
            </h3>
            <p className="text-gray-400 text-[16px]">
              Our experienced coaches provide personalized one-on-one coaching
              to help you achieve your goals
            </p>
          </div>
          <div className="order-2 flex flex-col items-center justify-center">
            <img
              className="w-full h-full object-cover"
              src="https://cdn.pixabay.com/photo/2018/02/12/11/45/personal-3148100_1280.jpg"
              alt="experience pic"
            />
          </div>
          <div className="order-3 md:order-4 lg:order-3 bg-light-gray p-8 md:p-14 lg:p-20 flex flex-col items-center justify-center space-y-5">
            <h3 className="text-[20px] md:text-[25px] lg:text-[28px]">
              Career Mentorship via Video
            </h3>
            <p className="text-gray-400 text-[16px]">
              Elevate your professional journey throughpersonalized mentorship,
              connecting with experienced guides on video conferencing.
            </p>
          </div>
          <div className="order-4 md:order-3 lg:order-4 flex flex-col items-center justify-center">
            <img
              className="w-full h-full object-cover"
              src="https://cdn.pixabay.com/photo/2018/05/08/08/42/virtual-coworkers-3382503_1280.jpg"
              alt="experience pic"
            />
          </div>
          <div className="order-5 bg-light-gray p-8 md:p-14 lg:p-20 flex flex-col items-center justify-center space-y-5">
            <h3 className="text-[20px] md:text-[25px] lg:text-[28px]">
              Group Mentoring Experience
            </h3>
            <p className="text-gray-400 text-[16px]">
              Be part of a collaborative community of peers and engage in group
              mentoring sessions to gain valuable insights and support for your
              career growth
            </p>
          </div>
          <div className="order-6 flex flex-col items-center justify-center">
            <img
              className="w-full h-full object-cover"
              src="https://cdn.pixabay.com/photo/2020/04/05/14/05/corona-5006277_1280.jpg"
              alt="experience pic"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
