import React, { useContext, useEffect } from "react";
import "./VideoBox.css";
import ytposter from "../../assets/YT/poster.png";
import playbtn from "../../assets/playbtn.png";
import { NavLink } from "react-router-dom";
import { CoursesData } from "../../context/courses/Courses";
import ReactPlayer from "react-player";

const VideoBox = ({ yt_title, view, setShowDemoVideo, setDemoVideoLink }) => {
  const { getallYoutube, youtube } = useContext(CoursesData);
  useEffect(() => {
    getallYoutube();
  }, []);

  return (
    <>
      <div className="top_educators_yt" data-aos="fade-left">
        <div className="top_educators_yt_upper">
          <h1>{yt_title}</h1>
          <NavLink to="./view-all">{/* <p>{view}</p> */}</NavLink>
        </div>

        <div className="top_educators_yt_container">
          {youtube?.data?.map((item, index) => (
            <div
              className="yt_box"
              key={index}
              onClick={() => {
                // setShowDemoVideo(true)
                // setDemoVideoLink(item?.video_url)
              }}
            >
              {/* <img src={ytposter} alt="ytPoster" /> */}
              <div className="frame_cont_category_page">
                {/* <img src='../../assets/YT/poster.png' style={{ width: '100%', height: '200px' }} /> */}
                <ReactPlayer
                  url={item?.video_url}
                  light={true}
                  playing
                  width="100%"
                  height="200px"
                  playIcon={
                    <img src={playbtn} alt="playbtn" className="yt_play_btn" />
                  }
                  // config={{
                  //   youtube: {
                  //     playerVars: { poster: "../../assets/YT/poster.png" },
                  //   },
                  // }}
                />

                {/* <iframe
                  id="frame"
                  // src={item?.video_url}
                  src="https://www.youtube.com/embed/88p3XuyAFMs?si=YCQ8quufBbn8u0EW"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe> */}
              </div>
              <div className="yt_description">
                <h1 style={{ wordBreak: "break-all" }}>{item.title}</h1>

                {/* <p style={{ fontWeight: "500" }}>
                  By: <span className="primary_color">{item.owner}</span>
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoBox;
