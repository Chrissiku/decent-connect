import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

const AboutSwiper = () => {
  return (
    <div className="w-full p-5 lg:p-10">
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
  );
};

export default AboutSwiper;
