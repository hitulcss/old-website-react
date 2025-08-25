import React, { useState, useEffect, useContext } from "react";
import "./LearningSlide.css";
import {
  MdArrowBack,
  MdArrowForward,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Pagination,
  Autoplay,
  EffectCoverflow,
  Navigation,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { CoursesData } from "../../context/courses/Courses";
import MicroLearningPlayer from "../MicroLearningPlayer/MicroLearningPlayer";
import { useNavigate } from "react-router-dom";

const LearningSlide = () => {
  const { getShortVideos, shortVideosData } = useContext(CoursesData);

  useEffect(() => {
    getShortVideos({ page: 1, pageSize: 10 });
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

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const navigate = useNavigate();

  return (
    <>
      <div className="learning-slide-container">
        <div className="offering-courses-upper">
          <div>
            {" "}
            <h1>Quick Learning </h1>
            <p>Short Feel of Your Learning</p>
          </div>

          <button
            onClick={() => {
              navigate("/learning/short-learning");
            }}
          >
            View All
            <MdKeyboardArrowRight />
          </button>
        </div>
        <p></p>
        <div className="learning-slide-lower">
          <div id="carouselContainer" className="swiper-container">
            <div className="swiper-navigation-buttons">
              <button className="swiper-button-prev">
                <MdArrowBack />
              </button>
              <button className="swiper-button-next">
                <MdArrowForward />
              </button>
            </div>

            <Swiper
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={2.3}
              loop={true}
              spaceBetween={30}
              effect={"coverflow"}
              autoplay={false}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              coverflowEffect={{
                rotate: 0,
                depth: 700,
                slideShadows: false,
              }}
              // onSlideChange={handleSlideChange}

              onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
              // pagination={{ clickable: true }}
              modules={[Autoplay, Pagination, EffectCoverflow, Navigation]}
            >
              {shortVideosData?.shorts?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="swiper-slide">
                    <MicroLearningPlayer
                      from="home-page"
                      data={item}
                      src={item?.urls}
                      isActive={index === activeSlideIndex}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default LearningSlide;
