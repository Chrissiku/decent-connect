import "../index.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useContext } from "react";
import { AppContext } from "../context/ContextProvider";

const Psychologist = () => {
  const { psychologistList } = useContext(AppContext);
  return (
    <div className="mb-12">
      <h3 className="text-center font-semibold text-2xl md:text-3xl mb-12 mt-[110px]">
        Our Therapist
      </h3>
      {Object.keys(psychologistList).length === 0 ? (
        <div className="text-center w-full p-10 bg-red-200 text-black">
          Not Therapists, come back later
        </div>
      ) : (
        <div>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={false}
            breakpoints={{
              426: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper pb-[18px] w-full px-5 md:px-10 lg:px-20"
          >
            {psychologistList.map((psy) => {
              return (
                <SwiperSlide
                  className="w-[219px] h-[250px] rounded-xl bg-[#F3F2FE] px-3 py-8 text-center font-light"
                  key={psy.id}
                >
                  <div className="mb-5 w-[100px] h-[100px] mx-auto flex items-center justify-center overflow-hidden rounded-full">
                    <img
                      className="w-full h-full object-cover"
                      src={psy.profile}
                      alt={psy.name}
                    />
                  </div>
                  <p className="text-teal font-semibold text-base text-center">
                    {psy.name}
                  </p>
                  <p className="text-center text-base text-shade">
                    {psy.specialization} Psy
                  </p>
                  <p className="text-center text-base">
                    {psy.experience} year{psy.experience > 1 && "s"} experience
                  </p>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Psychologist;
