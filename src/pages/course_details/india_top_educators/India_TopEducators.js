import React, { useContext, useEffect } from "react";
import "./India_TopEducators.css";
import { CoursesData } from "../../../context/courses/Courses";
import NotFound from "../../../components/NotFound/NotFound";

const India_TopEducators = () => {
  const { getallYoutube, youtube } = useContext(CoursesData);

  useEffect(() => {
    getallYoutube();
  }, []);

  return (
    <>
      <div className="india_topeducators_wrapper">
        <h1>
          India's top <span className="primary_color">educators</span> to learn
          from
        </h1>
        <div className="india_top_educators">
          {/* {top_educators_courses.map((item, index) => ( */}
          {youtube?.data?.length > 0 ? (
            youtube?.data?.map((item, index) => (
              <div
                className="india_top_educators_img"
                key={index}
                style={{ borderRadius: "10px", overflow: "hidden" }}
              >
                {/* <img src={item.poster} alt="poster" /> */}
                <iframe
                  id="frame"
                  src={item?.video_url}
                  title={item?.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>

                {/* <img src={item.playBtn} alt="playbutton" className="play_btn" /> */}
              </div>
            ))
          ) : (
            <NotFound />
          )}
        </div>
      </div>
    </>
  );
};

export default India_TopEducators;
