import React, { useContext, useEffect, useRef, useState } from "react";
import "./MainPage.css";
import { CoursesData } from "../../../context/courses/Courses";
import NavBar from "../NavBar/NavBar";
import SideBar from "../../../components/Sidebar/SideBar";
import { useNavigate, useParams } from "react-router-dom";
import MicroLearningPlayer from "../../../components/MicroLearningPlayer/MicroLearningPlayer";
import { Toaster } from "react-hot-toast";
import { HeadProvider, Title } from "react-head";
import { Skeleton } from "@mui/material";
import upIcon from "../../../assets/short-learning/shorts-up.svg";
import downIcon from "../../../assets/short-learning/shorts-down.svg";
import ShortLearningPolicy from "./ShortLearningPolicy";
import { pushToDataLayer } from "../../../gtm/gtm";

const MainPage = () => {
  const { getShortVideos, shortVideosData, isSidebarExpanded } =
    useContext(CoursesData);

  const { videoId } = useParams(); // Get the current video ID from the URL
  const navigate = useNavigate();
  const videoRefs = useRef([]);
  const [loading, setLoading] = useState(true);
  const [shortVideos, setShortVideos] = useState([]);
  const [lastVideo, setlastVideo] = useState({});

  useEffect(() => {
    if (shortVideosData) {
      setShortVideos((prev) => [...prev, ...shortVideosData?.shorts]);
      setlastVideo(
        shortVideosData?.shorts[shortVideosData?.shorts?.length - 1]
      );
    }
  }, [shortVideosData]);

  useEffect(() => {
    if (shortVideos) {
      const index = shortVideos?.find((video) => video.id == videoId);

      if (index) {
        shortVideos?.map((video, i) =>
          video.id == videoId ? setCurrentIndexNumber(i) : ""
        );

        setCurrentIndex(index?.id);
      } else {
        setCurrentIndex(shortVideos[0]?.id);
        setCurrentIndexNumber(0);
        // navigate(`/learning/micro-learning/${shortVideosData?.shorts[0].id}`); // Redirect to the first video if ID is invalid
      }
      setLoading(false);
    }
  }, [videoId, navigate, shortVideos, shortVideosData]);

  const [page, setPage] = useState(1);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (isLoggedIn) {
      setIncrement(true);
      getShortVideos({ page: page, pageSize: 10 });
    } else {
      navigate(`/login?source=${window?.location?.href}`);
    }
  }, [page]);

  const [savedDetail, setSavedDetails] = useState({ id: "", state: false });
  useEffect(() => {
    if (shortVideos) {
      let arr = shortVideos?.map((i) => ({
        id: i.id,
        isSaved: i.isSaved,
      }));
      setSavedDetails(arr);
    }
  }, [shortVideos]);

  const [currentIndex, setCurrentIndex] = useState(videoId ?? -1);
  const [currentIndexNumber, setCurrentIndexNumber] = useState(0);

  // Lazy loading video when it comes into view
  const loadVideoOnView = (index) => {
    const videoElement = videoRefs.current[index];
    if (
      videoElement &&
      videoElement.getBoundingClientRect().top < window.innerHeight
    ) {
      videoElement.src = shortVideos[index].urls[2]?.src; // Set video src to start loading
    }
  };

  useEffect(() => {
    // Check visibility of the video each time currentIndex changes
    loadVideoOnView(currentIndexNumber);
  }, [currentIndex]);

  const containerRef = useRef(null);

  const next = () => {
    const container = containerRef.current;
    if (!container || currentIndexNumber >= shortVideos?.length - 1) {
      return; // No more videos
    }

    const newIndex = currentIndexNumber + 1;
    setCurrentIndexNumber(newIndex);

    // Ensure smooth scroll by scrolling to the next position
    const scrollPosition = newIndex * container.offsetHeight;
    container.scrollTo({
      top: scrollPosition,
      behavior: "smooth", // Smooth scroll behavior
    });
  };

  const prev = () => {
    const container = containerRef.current;
    if (!container || currentIndexNumber <= 0) {
      return; // No more videos
    }

    const newIndex = currentIndexNumber - 1;
    setCurrentIndexNumber(newIndex);

    // Ensure smooth scroll by scrolling to the previous position
    const scrollPosition = newIndex * container.offsetHeight;
    container.scrollTo({
      top: scrollPosition,
      behavior: "smooth", // Smooth scroll behavior
    });
  };
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    // Calculate index based on scroll position
    const newIndex = Math.round(container.scrollTop / container.offsetHeight);

    // Update current index if it's different from the state
    if (newIndex !== currentIndexNumber) {
      setCurrentIndexNumber(newIndex);
    }
  };

  const [inViewData, setInViewData] = useState({});
  const [increment, setIncrement] = useState(true);

  useEffect(() => {
    if (inViewData) {
      if (
        inViewData?.id == lastVideo?.id &&
        increment &&
        shortVideos?.length > 9
      ) {
        setIncrement(false);
        setPage(page + 1);
      }
    }
  }, [inViewData]);
  //privacyPolicy
  const [shortLearningPolicy, setShortLearningPrivacyPolicy] = useState(false);

  // console.log("dataaa-", shortVideos);
  return (
    <>
      <HeadProvider>
        <Title>Quick Learning - SD Campus </Title>
      </HeadProvider>
      <Toaster />
      <NavBar from="after-login" width={isSidebarExpanded ? 250 : 93} />
      <div>
        <SideBar />
        <div
          className={
            isSidebarExpanded
              ? "after-login-mid open-sidebar"
              : "after-login-mid closed-sidebar"
          }
          style={{ marginLeft: isSidebarExpanded ? "250px" : "100px" }}
        >
          <div className="main-wrapper">
            <div
              className="up-arrow-container"
              onClick={() => {
                prev();
              }}
            >
              <img src={upIcon} alt="" />
            </div>
            <div
              className="main-container"
              ref={containerRef}
              onScroll={handleScroll}
            // style={{
            //   height: "100vh",
            //   overflowY: "scroll",
            //   scrollSnapType: "y mandatory",
            //   position: "relative",
            // }}
            >
              {loading && (
                <div>
                  <Skeleton
                    variant="rectangular"
                    width={320}
                    height={600}
                    sx={{ borderRadius: "10px" }}
                  />

                  <div>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        gap: "10px",
                        marginTop: "5px",
                      }}
                    >
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem" }}
                        style={{ width: "100%" }}
                      />
                    </div>
                    <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  </div>
                </div>
              )}

              <div>
                <ShortLearningPolicy
                  setShortLearningPrivacyPolicy={setShortLearningPrivacyPolicy}
                  shortLearningPolicy={shortLearningPolicy}
                />
              </div>
              {!loading &&
                shortVideos?.map((video, index) => (
                  <div className="learning-box" key={index}>
                    <div className="learning-box-left">
                      <div
                        className="learning-img-container"
                        style={{ marginTop: "2rem" }}
                      >
                        {" "}
                        <MicroLearningPlayer
                          setInViewData={setInViewData}
                          setShortLearningPrivacyPolicy={
                            setShortLearningPrivacyPolicy
                          }
                          shortLearningPolicy={shortLearningPolicy}
                          from="feed"
                          key={index}
                          currInd={{
                            ind: index,
                            show: index === currentIndexNumber,
                          }}
                          setCurrentIndex={setCurrentIndex}
                          setCurrentIndexNumber={setCurrentIndexNumber}
                          data={video}
                          src={video?.urls}
                          ref={(el) => (videoRefs.current[index] = el)}
                        />
                        {/* <img src={video.poster} alt="poster" /> */}
                        <div
                          className="black-shadow"
                        // style={{ width: "360px" }}
                        ></div>
                        <div className="learnig-descrip">
                          <div
                            onClick={() => {
                              localStorage.setItem("index", 6);
                              pushToDataLayer({
                                ecommerce: null, // Clear the previous ecommerce object.
                              });
                              pushToDataLayer({
                                event: "short_channel_viewed",
                                isLoggedIn: localStorage?.getItem("isLoggedIn"),
                                channelId: video?.channel?.id,
                              });
                              navigate(
                                `/learning/learning-profile/${video?.channel?.id}`
                              );
                            }}
                          >
                            {" "}
                            <img
                              src={video?.channel?.profile}
                              alt="channel_logo"
                            />
                            <h2 style={{ fontSize: "0.9rem" }}>
                              {/* {video.title} */}
                              {video?.channel?.name}
                            </h2>
                          </div>

                          <div style={{ fontSize: "0.8rem" }}>
                            {video?.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div
              className="down-arrow-container"
              onClick={() => {
                next();
              }}
            >
              <img src={downIcon} alt="downicon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
