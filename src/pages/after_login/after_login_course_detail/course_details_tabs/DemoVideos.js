import React from "react";
import VideoPlayer from "../../../../components/VideoPlayer/VideoPlayer";
import CloseIcon from "@mui/icons-material/Close";
import playIcon from "../../../../assets/playicon.png";

const DemoVideos = ({
  setShowDemoVideo,
  showDemoVideo,
  setDemoVideo,
  demoVideo,
  course,
}) => {

  const controls = {
    volume: { volumeProgress: true, volumeLogo: true },
    forward: true,
    backward: true,
    play: true,
    progressBar: true,
    settings: true,
    expand: true

  }
  return (
    <>
      <div>
        {" "}
        <div className="course_details_demo_videos">
          <h2
            style={{
              borderBottom: "3px solid var(--primaryColor)",
              display: "table",
              textAlign: "center",
              margin: "0 auto",
            }}
          >
            Free Demo Videos
          </h2>

          {showDemoVideo && (
            <div className="demo-video-modal">
              <CloseIcon
                className="demo-video-close-icon"
                onClick={() => {
                  setShowDemoVideo(false);
                }}
              />
              {
                demoVideo == "" ? (
                  <div className="demo_video"> Video Not Available</div>
                ) : (
                  <VideoPlayer
                    link={demoVideo}
                    type="Recorded"
                    title="Demo Videos"
                    platform="yt"
                    showControls={controls}
                  />
                )
                //  <ReactPlayer
                //   url={demoVideo}
                //   controls={false}
                //   width="100%"
                //   height="50vh"
                // />
              }
            </div>
          )}
          <div className="free_demo_videos">
            {course?.data?.demoVideo?.map((item, index) => {
              return (
                <div
                  className="free_demo_videos_container"
                  key={index}
                  onClick={() => {
                    setDemoVideo(item);
                    setShowDemoVideo(true);
                  }}
                >
                  <div className="freedemo_left">
                    <img
                      src={playIcon}
                      onClick={() => {
                        // window.open(item?.demoVideo);
                      }}
                      style={{ cursor: "pointer" }}
                      alt="playicon"
                    />
                    <p>{course?.data?.batchName}</p>
                  </div>
                  <div className="freedemo_right">
                    {/* <img
                        style={{ height: "200px" }}
                        src={item?.profilePhoto}
                        alt="mam"
                      /> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DemoVideos;
