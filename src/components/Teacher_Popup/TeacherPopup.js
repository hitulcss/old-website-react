import React, { useState } from "react";
import "./TeacherPopup.css";
import { PiGraduationCapLight } from "react-icons/pi";
import { MdOutlineClose } from "react-icons/md";
import { FaSquareCheck } from "react-icons/fa6";
import { IoIosPlayCircle } from "react-icons/io";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "80%",
  borderRadius: "20px",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TeacherPopup = ({ data, setShowPopup }) => {
  // const subjects = data?.subject?.toString()?.split(",");
  const parts = data?.qualification?.split(",");

  const arr = ["", "na", "NA"];
  const [demoVideo, setDemoVideo] = useState(false);
  const [showDemoVideo, setShowDemoVideo] = useState(false);

  const handleOpen = () => setShowDemoVideo(true);
  const handleClose = () => setShowDemoVideo(false);

  const controls = {
    volume: { volumeProgress: true, volumeLogo: true },
    forward: true,
    backward: true,
    play: true,
    progressBar: true,
    settings: true,
    expand: true,
  };
  return (
    <>
      <div>
        <Modal
          open={showDemoVideo}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="teacher-popup-modal">
            <MdOutlineClose
              onClick={handleClose}
              className="video_popup_close"
            />
            <VideoPlayer
              link={demoVideo}
              type="Recorded"
              title="Demo Videos"
              platform="yt"
              showControls={controls}
            />
          </div>
        </Modal>
      </div>

      <div className="teacher_popup_container ">
        <div className="teacher_popup ">
          <div className="teacher_popup_upper">
            <div className="popup_left">
              <img
                src={data?.profilePhoto}
                alt=""
                style={{ height: "120px" }}
                className="faculty_pupupimg"
                loading="lazy"
              />
            </div>
            <div className="popup_mid">
              <h2>{data?.FullName ? data?.FullName : data.name}</h2>

              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "var(--primaryColor)",
                  gap: "6px",
                  fontWeight: "500",
                }}
              >
                <PiGraduationCapLight />
                <span>
                  {data?.subject ? data?.subject.toString()?.split(",")[0] : ""}
                </span>
              </p>

              {data?.demoVideo && data?.demoVideo !== "" && (
                <div
                  className="play-demo"
                  onClick={() => {
                    setDemoVideo(data?.demoVideo);
                    handleOpen();
                  }}
                >
                  <IoIosPlayCircle className="play-demo-icon" />
                  <p>PLAY DEMO</p>
                </div>
              )}
            </div>
            <div className="popup_right">
              <MdOutlineClose
                onClick={() => setShowPopup(false)}
                className="popup_close_icon"
              />
            </div>
          </div>

          <div className="teacher_popup_lower">
            {/* {data?.demoVideo && data?.demoVideo !== "" ? (
              <div className="teacher_intro">
                <h2>Introduction</h2>
                <ReactPlayer
                  url={data?.demoVideo}
                  controls={false}
                  width="100%"
                  height="20vh"
                />
              </div>
            ) : (
              ""
            )} */}

            {!arr.includes(data?.qualification) && (
              <>
                {" "}
                <h2>Experience & Expertise</h2>
                <div className="lower_popup_description">
                  {/* <p>{data?.subject} </p> */}
                  <p>
                    <ul
                      style={{
                        lineHeight: 2,
                      }}
                    >
                      {parts?.map((part, index) => (
                        <li>
                          <FaSquareCheck
                            style={{ color: "var(--primaryColor)" }}
                          />
                          {part.trim()}
                          {index !== parts?.length - 1 && " "}
                        </li>
                      ))}
                    </ul>
                  </p>
                  {/* <p>Mock Interview Panel list & Interview Expert</p> */}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherPopup;
