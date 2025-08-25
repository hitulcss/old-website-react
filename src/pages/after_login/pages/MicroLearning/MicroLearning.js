import { useContext, useEffect, useRef, useState } from "react";
import SideBar from "../../../../components/Sidebar/SideBar";
// import CourseDetails from "../../../course_details/CourseDetails"
import NavBar from "../../NavBar/NavBar";
import { CoursesData } from "../../../../context/courses/Courses";
import { useNavigate, useParams } from "react-router-dom";
import MicroLearningPlayer from "../../../../components/MicroLearningPlayer/MicroLearningPlayer";

import { useSwipeable } from "react-swipeable";

const MicroLearning = () => {
  const { getShortVideos, shortVideosData, isSidebarExpanded } =
    useContext(CoursesData);

  const { videoId } = useParams(); // Get the current video ID from the URL
  const navigate = useNavigate();
  const videoRefs = useRef([]);

  useEffect(() => {
    if (shortVideosData) {
      const index = shortVideosData?.shorts?.find(
        (video) => video.id == videoId
      );

      if (index) {
        shortVideosData?.shorts?.map((video, i) =>
          video.id == videoId ? setCurrentIndexNumber(i) : ""
        );

        setCurrentIndex(index?.id);
      } else {
        setCurrentIndex(shortVideosData?.shorts[0].id);
        setCurrentIndexNumber(0);
        navigate(`/learning/micro-learning/${shortVideosData?.shorts[0].id}`); // Redirect to the first video if ID is invalid
      }
    }
  }, [videoId, navigate, shortVideosData]);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (isLoggedIn) {
      getShortVideos();
    } else {
      navigate(`/login?source=${window?.location?.href}`);
    }
  }, []);

  // useEffect(() => {
  //   if (shortVideosData) {
  //     console.log("data", shortVideosData);
  //   }
  // }, [shortVideosData]);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [currentIndex, setCurrentIndex] = useState(videoId ?? -1);
  const [currentIndexNumber, setCurrentIndexNumber] = useState(0);

  // Update URL when the index changes
  useEffect(() => {
    navigate(`/learning/micro-learning/${currentIndex}`);
  }, [currentIndex, navigate]);

  // Handle swipe gestures
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => {
      if (currentIndexNumber < shortVideosData?.shorts?.length - 1) {
        setCurrentIndexNumber((prevIndex) => prevIndex + 1);
        setCurrentIndex(shortVideosData?.shorts[currentIndexNumber + 1]?.id);
      }
    },
    onSwipedDown: () => {
      if (currentIndexNumber > 0) {
        setCurrentIndexNumber((prevIndex) => prevIndex - 1);
        setCurrentIndex(shortVideosData?.shorts[currentIndexNumber - 1]?.id);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Enable swipe gestures with mouse
  });

  // Lazy loading video when it comes into view
  const loadVideoOnView = (index) => {
    const videoElement = videoRefs.current[index];
    if (
      videoElement &&
      videoElement.getBoundingClientRect().top < window.innerHeight
    ) {
      videoElement.src = shortVideosData?.shorts[index].urls[2]?.src; // Set video src to start loading
    }
  };

  useEffect(() => {
    // Check visibility of the video each time currentIndex changes
    loadVideoOnView(currentIndexNumber);
  }, [currentIndex]);

  const containerRef = useRef(null);

  // useEffect(() => {
  //     const container = containerRef.current;
  //     if (container) {
  //         container.scrollTo({
  //             top: currentIndex * container.offsetHeight,
  //             behavior: "smooth",
  //         });
  //     }
  // }, [currentIndexNumber]);

  const [inViewData, setInViewData] = useState(false);

  useEffect(() => {
    if (inViewData) {
      console.log("inView", inViewData);
      // setCurrentIndexNumber
    }
  }, [inViewData]);

  return (
    <>
      <>
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
            <div
              style={{
                padding: isSidebarExpanded && !isSmallScreen && "0rem 7rem",
              }}
            >
              <div>
                <div
                  {...swipeHandlers}
                  ref={containerRef}
                  style={{
                    // height: "70vh",

                    padding: "20px 0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    // width: "100vw",
                    // overflow: "scroll",
                    position: "relative",
                    overflowY: "scroll",
                    scrollSnapType: "y mandatory",

                    height: "100vh",
                  }}
                >
                  {shortVideosData?.shorts?.map((video, index) => (
                    <div
                      key={video.id}
                      style={{
                        marginBottom: "30px",
                        scrollSnapAlign: "start",
                        // display: index === currentIndex ? "block" : "none",
                        position: "absolute",
                        top: `${
                          (index - currentIndexNumber) * 75 +
                          (index - currentIndexNumber !== 0 ? 10 : 10)
                        }vh`,
                        left: "40%",
                        height: "70vh",
                        // width: "100vw",
                        transform: `scale(${
                          index === currentIndexNumber ? 1 : 0.9
                        })`,
                        zIndex: index === currentIndexNumber ? 10 : 5,
                        transition: "top 0.3s, transform 0.3s",
                        opacity: index === currentIndexNumber ? 1 : 0.7,
                        // height: "100vh",
                        maxWidth: "350px",
                        borderRadius: "30px",
                        background: "black",
                      }}
                    >
                      <MicroLearningPlayer
                        setInViewData={setInViewData}
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};
export default MicroLearning;
