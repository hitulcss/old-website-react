import React, { useState } from "react";
import "./Channel.css";
import { MdOutlineTouchApp } from "react-icons/md";
import { pushToDataLayer } from "../../../gtm/gtm";

const Channel = () => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribeClick = (subscribeLink, item) => () => {
    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "view_youtube_channels",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      channel_name: item?.title,
      channel_subs: item?.subs,
      channel_videos: item?.videos,

      ecommerce: {},
    });
    if (!subscribed) {
      // Perform any additional actions if needed when the user subscribes
      setSubscribed(true);
    }
    window.open(subscribeLink, "_blank");
  };

  const yt_channel = [
    {
      img: "https://d1mbj426mo5twu.cloudfront.net/assets/sdcampus_logo.png",
      title: "SD Teaching Exams",
      subs: "165K+",
      videos: "7.5K",
      subLink:
        "https://www.youtube.com/channel/UC1o9hfvby_ns1sJIKEq9LFQ?sub_confirmation=1",
      subLink:
        "https://www.youtube.com/channel/UC1o9hfvby_ns1sJIKEq9LFQ?sub_confirmation=1",
    },
    {
      img: "https://d1mbj426mo5twu.cloudfront.net/assets/sdcampus_logo.png",
      title: "SD Campus",
      subs: "32.1K+ ",
      videos: "1.3K",
      subLink:
        "https://www.youtube.com/channel/UCXi36lfrMGc3oH-OFC_1EtA?sub_confirmation=1",
    },
    {
      img: "https://d1mbj426mo5twu.cloudfront.net/assets/sdcampus_logo.png",
      title: "SD Sainik & JNV School",
      subs: "6K+",
      videos: "500+",
      subLink: "https://www.youtube.com/@sdsainikschool",
    },
    {
      img: "https://d1mbj426mo5twu.cloudfront.net/assets/sdpublication-logo.png",
      title: "SD Publication",
      subs: "6K+",
      videos: "200+",
      subLink: "https://www.youtube.com/@sdpublication",
    },
    {
      img: "https://yt3.googleusercontent.com/ctSSQSbyPye3ANtIbD8ll6joj7APgRdZ5vBmpniZdEUTtaYiC-1j5W3K6xEGkU4mCcdecJrkiRs=s160-c-k-c0x00ffffff-no-rj",
      title: "SD Campus Sainik & JNV School English",
      subs: "5K+",
      videos: "230+",
      subLink: "https://www.youtube.com/@SDCampusSainikJNVSchoolEnglish",
    },
    // {
    //   img: "https://d1mbj426mo5twu.cloudfront.net/assets/sd_study_abroad_1718430048.jpg",
    //   title: "SD Study Abroad",
    //   subs: "1.5K+",
    //   videos: "120+",
    //   subLink: "https://www.youtube.com/@sdstudyabroad",
    // },
  ];

  return (
    <>
      <div className="channel_wrapper" data-aos="fade-up">
        <div className="top_title" data-aos="fade-up">
          <h2>
            SD Campus{" "}
            <span style={{ color: "var(--primaryColor)" }}>
              YouTube Channels
            </span>
          </h2>
          <p>
            Explore our YouTube channels and subscribe for free access to
            quality education.
          </p>
        </div>

        <div className="channel_Container" data-aos="fade-up">
          {yt_channel.map((item, index) => (
            <div
              className="channel_box"
              key={index}
              onClick={handleSubscribeClick(item.subLink, item)}
            >
              <img src={item.img} alt="img" loading="lazy" />
              <h2>{item.title}</h2>
              {/* <div className="subs_videos">
                <p>
                  {item.subs} Subscribers | {item.videos} Videos
                </p>
              </div> */}

              <button>
                <MdOutlineTouchApp className="channel_icon" />
                Subscribe
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Channel;
