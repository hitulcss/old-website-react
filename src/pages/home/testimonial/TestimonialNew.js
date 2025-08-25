import React, { useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, EffectCoverflow } from "swiper";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "./TestimonialNew.css"; // Create this file for the provided CSS
import { CoursesData } from "../../../context/courses/Courses";

const TestimonialNew = () => {
  //Context
  const { getAllTestimonal, testimonial } = useContext(CoursesData);

  useEffect(() => {
    getAllTestimonal();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const swiper = document.querySelector(".swiper").swiper;
      if (window.innerWidth < 501) swiper.params.slidesPerView = 1;
      if (window.innerWidth > 501 && window.innerWidth < 724)
        swiper.params.slidesPerView = 2;
      if (window.innerWidth > 724) swiper.params.slidesPerView = 2.3;
      swiper.update();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="testimonial_wrapper" data-aos="fade-up">
        {testimonial?.data?.length > 0 && (
          // {testimonialData?.length > 0 && (
          <h1 data-aos="fade-up" className="testi-h1">
            What Our Students <span>Say?</span>
          </h1>
        )}
        <div id="carouselContainer" className="swiper-container">
          <Swiper
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={2.3}
            loop={true}
            spaceBetween={30}
            effect={"coverflow"}
            autoplay={true}
            coverflowEffect={{
              rotate: 0,
              depth: 700,
              slideShadows: false,
            }}
            // pagination={{ clickable: true }}
            modules={[Autoplay, Pagination, EffectCoverflow]}
          >
            {testimonial?.data?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="swiper-slide">
                  <div className="ImgHolder">
                    <img
                      src={item?.photo}
                      alt={item?.studentName}
                      loading="lazy"
                    />
                  </div>
                  <div className="ContentHolder">
                    <h3>{item?.studentName}</h3>
                    <p>{item?.message}</p>
                  </div>
                  <p className="bio">{item?.exam}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default TestimonialNew;
