import "../index.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { MentorData } from "./MentorData";

const Psychologist = () => {
    return (
        <div className="mb-12">
            <h3 className='text-center font-semibold text-2xl md:text-3xl mb-12 mt-[110px]'>Our Psychologists</h3>
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
                    {
                        MentorData.map((mentor) => {
                            return (
                                <SwiperSlide
                                    className="w-[219px] h-[219px] shadow-xl rounded-[30px] bg-white p-3 text-center font-light"
                                    key={mentor.id}
                                >
                                    <img
                                        className="mx-auto mb-5"
                                        src={mentor.image}
                                        alt={mentor.name}
                                    />
                                    <p className="text-[#17A398] font-semibold text-base text-center">{mentor.name}</p>
                                    <p className="text-center text-base">
                                        {mentor.profession}
                                    </p>
                                    <p className="text-center text-base">
                                        {mentor.company}
                                    </p>

                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default Psychologist