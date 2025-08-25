//imports
import { useState } from "react";
import "./MyVideo.css";
import Draggable from "react-draggable";
import PictureInPictureAltIcon from "@mui/icons-material/PictureInPictureAlt";
import PictureInPictureIcon from "@mui/icons-material/PictureInPicture";
import CloseIcon from "@mui/icons-material/Close";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import NoPhotographyRoundedIcon from "@mui/icons-material/NoPhotographyRounded";
import MicOffRoundedIcon from "@mui/icons-material/MicOffRounded";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import CallEndRoundedIcon from "@mui/icons-material/CallEndRounded";

const MyVideo = ({
  isProduceStart,
  handleCameraOff,
  handleCameraOn,
  setIsCameraOn,
  isCameraOn,
  isMicOn,
  setIsMicOn,
  handleMicOff,
  handleMicOn,
}) => {
  const [isPipOn, setIsPipOn] = useState(false);
  // const [isMicOn, setIsMicOn] = useState(true)
  // const [isCameraOn, setIsCameraOn] = useState(true)

  const handleClick = async (id) => {
    const videoRef = document.getElementById(id);

    // if (!videoRef.current) return;

    // console.log('VideoRef', document)
    // console.log('VideoRef', document.pictureInPictureElement)
    try {
      if (document.current !== document.pictureInPictureElement) {
        setIsPipOn(true);
        await videoRef.requestPictureInPicture();
      } else {
        await document.exitPictureInPicture();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleClosePip = async (id) => {
    const videoRef = document.getElementById(id);

    // if (!videoRef.current) return;

    // console.log('VideoRef', document.current)
    // console.log('VideoRef', document.pictureInPictureElement)
    try {
      setIsPipOn(false);
      await document.exitPictureInPicture();
    } catch (err) {
      console.log(err);
    }
  };

  // console.log('IsCamera On', isCameraOn)

  return (
    <>
      <Draggable>
        <div
          className="my-video-parent"
          style={{ display: !isProduceStart ? "none" : "" }}
        >
          {!isPipOn ? (
            <button
              className="pip-my-video"
              onClick={() => {
                handleClick("myVideo");
              }}
            >
              <PictureInPictureIcon style={{ color: "white" }} />
            </button>
          ) : (
            <button
              className="pip-exit-my-video"
              onClick={() => {
                handleClosePip("myVideo");
              }}
            >
              <PictureInPictureAltIcon style={{ color: "white" }} />
            </button>
          )}
          <button
            className="stop-my-video"
            onClick={() => {
              document?.getElementById("stop-produce")?.click();
            }}
          >
            <CloseIcon style={{ color: "white" }} />
          </button>
          <button className="drag">
            <DragHandleIcon className="drag-icon" style={{ color: "white" }} />
          </button>
          {isCameraOn ? (
            <button className="camera-on-off">
              <CameraAltRoundedIcon
                onClick={() => {
                  handleCameraOff();

                  // setIsCameraOn(!isCameraOn)
                }}
                className="drag-icon"
                style={{ color: "white" }}
              />
            </button>
          ) : (
            <button className="camera-on-off">
              <NoPhotographyRoundedIcon
                onClick={() => {
                  handleCameraOn();
                  // setIsCameraOn(!isCameraOn`)
                }}
                className="drag-icon"
                style={{ color: "white" }}
              />
            </button>
          )}
          {isMicOn ? (
            <button className="mic-on-off">
              <MicRoundedIcon
                onClick={() => {
                  // setIsMicOn(!isMicOn)
                  handleMicOff();
                }}
                className="drag-icon"
                style={{ color: "white" }}
              />
            </button>
          ) : (
            <button className="mic-on-off">
              <MicOffRoundedIcon
                onClick={() => {
                  // setIsMicOn(!isMicOn)
                  handleMicOn();
                }}
                className="drag-icon"
                style={{ color: "white" }}
              />
            </button>
          )}
          <button className="call-end">
            <CallEndRoundedIcon
              onClick={() => {
                document?.getElementById("stop-produce")?.click();
              }}
              className="drag-icon"
              style={{ color: "red" }}
            />
          </button>
          <video id="myVideo" autoPlay muted></video>
        </div>
      </Draggable>
    </>
  );
};
export default MyVideo;
