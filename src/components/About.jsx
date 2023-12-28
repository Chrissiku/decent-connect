import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

const About = () => {
  return (
    <div className="w-full mx-auto">
      <div
        className="w-full grid grid-cols-1 lg:grid-cols-2 items-center justify-center p-5 
      lg:p-14 space-x-5 lg:space-x-20 space-y-5 lg:space-y-10"
      >
        <div className="w-full p-5 lg:p-10">
          {" "}
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="w-[85%] md:w-[80%] h-[350px] lg:h-[500px] items-center"
          >
            <SwiperSlide>
              <img
                className="w-full h-full object-cover"
                src="https://cdn.pixabay.com/photo/2016/02/10/21/57/heart-1192662_1280.jpg"
                alt="pic"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full h-full object-cover"
                src="https://cdn.pixabay.com/photo/2016/12/06/17/11/fushimi-inari-shrine-1886975_1280.jpg"
                alt="pic"
              />
            </SwiperSlide>{" "}
            <SwiperSlide>
              <img
                className="w-full h-full object-cover"
                src="https://cdn.pixabay.com/photo/2014/11/14/08/23/japan-530348_1280.jpg"
                alt="pic"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div>Grid 2</div>
      </div>
    </div>
  );
};

export default About;
