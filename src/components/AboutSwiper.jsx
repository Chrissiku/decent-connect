import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards, Autoplay, Navigation, Pagination } from "swiper/modules";

const AboutSwiper = () => {
  return (
    <div className="w-full p-5 lg:p-10">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={false}
        navigation={true}
        modules={[EffectCards, Autoplay, Pagination, Navigation]}
        className="w-[85%] md:w-[80%] h-[350px] lg:h-[500px] items-center"
      >
        <SwiperSlide className="rounded-xl">
          <img
            className="w-full h-full object-cover"
            src="https://img.freepik.com/free-photo/doctor-advising-patient-online-with-laptop_155003-8504.jpg?size=626&ext=jpg&ga=GA1.2.1547911478.1703766780&semt=ais"
            alt="pic"
          />
        </SwiperSlide>
        <SwiperSlide className="rounded-xl">
          <img
            className="w-full h-full object-cover"
            src="https://cdn.pixabay.com/photo/2021/01/14/09/21/covid-19-5916334_1280.jpg"
            alt="pic"
          />
        </SwiperSlide>
        <SwiperSlide className="rounded-xl">
          <img
            className="w-full h-full object-cover"
            src="https://img.freepik.com/free-photo/sick-student-patient-discussing-sickness-symptoms-with-physician-doctor-during-online-videocall-telehealth-consultation-sitting-desk-living-room_482257-2334.jpg?size=626&ext=jpg&ga=GA1.2.1547911478.1703766780&semt=ais"
            alt="pic"
          />
        </SwiperSlide>
        <SwiperSlide className="rounded-xl">
          <img
            className="w-full h-full object-cover"
            src="https://img.freepik.com/free-photo/mental-health-care-sketch-diagram_53876-121351.jpg?w=1480&t=st=1703803875~exp=1703804475~hmac=887fb9b2d5b127a8e87c4594fbe547e97cd1154944437727ad132b75f00e0d77"
            alt="pic"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AboutSwiper;
