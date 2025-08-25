import React, { useRef, useEffect, useState, useContext } from "react";
import { useInView } from "react-intersection-observer";
import "./MicroLearningPlayer.css";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { FaPlay } from "react-icons/fa6";

import { IoEyeOutline } from "react-icons/io5";

import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { PiShareFatLight } from "react-icons/pi";
import { MdBookmark, MdOutlineBookmarkBorder } from "react-icons/md";
import { CoursesData } from "../../context/courses/Courses";
import toast from "react-hot-toast";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CancelIcon from "@mui/icons-material/Cancel";
import { FaFacebookSquare } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaWhatsappSquare } from "react-icons/fa";
import Menu from "../../pages/after_login/short_learning/Menu";
import CommentModal from "../../pages/after_login/short_learning/CommentModal";
import ReportBox from "../../pages/after_login/short_learning/ReportBox";
import { pushToDataLayer } from "../../gtm/gtm";
import { Tooltip } from "@mui/material";
import { IoPlayOutline } from "react-icons/io5";
import { MdBookmarkAdded } from "react-icons/md";
import cmnt from "../../assets/short-learning/cmnt.png";

const MicroLearningPlayer = (
  {
    setInViewData,
    src,
    data,
    from,
    currentIndex,
    setCurrentIndexNumber,
    currInd,
    shortLearningPolicy,
    setShortLearningPrivacyPolicy,
    isActive,
  },
  ref
) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const [reff, inView] = useInView({
    threshold: 0.6, // Play video when at least 50% visible
  });

  //share
  const [showShareModal, setShowShareModal] = useState(false);
  const [showShareModalLink, setShowShareModalLink] = useState({
    url: "",
    title: "",
    id: "",
  });

  const { makeSaveOrUnsave, likeOrRemoveLikeOfShort, viewed } =
    useContext(CoursesData);

  //report
  const [showReport, setShowReport] = useState({ show: false, type: "" });

  //save or unsave short
  const handleSaveOrUnsave = (id) => {
    makeSaveOrUnsave({ shortId: id, from });
  };
  //save or unsave short
  const handleLikeOrRemoveLikeOfShort = (id) => {
    likeOrRemoveLikeOfShort({ shortId: id, from: from });
  };

  useEffect(() => {
    if (videoRef.current) {
      if (from == "home-page") {
        if (isActive) {
          videoRef.current.play().catch((error) => {
            console.error("Video play error:", error);
          });
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      } else {
        if (inView) {
          viewed({ shortId: data?.id });

          if (currInd?.show) {
            setInViewData(data);
            // setCurrentIndex(data?.id)
            // setCurrentIndexNumber(currInd.ind)
          }
          videoRef.current.play().catch((error) => {
            console.error("Video play error:", error);
          });
          setIsPlaying(true);
        } else {
          videoRef.current.pause();

          setIsPlaying(false);
        }
      }
    }
  }, [inView, isActive]);

  useEffect(() => {
    if (isPlaying) {
      // setCurrentIndex(data?.id)
      // setCurrentIndexNumber(key)
    }
  }, [isPlaying]);
  const handleVideoClick = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoElement.play().catch((error) => {
          console.error("Video play error:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle mute/unmute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.src = ""; // Prevent loading of video until it is in view
    }
  }, [ref]);

  const [videoUrl, setVideoUrl] = useState(src[0]?.url); // Default to 360p

  const measureInternetSpeed = async () => {
    const testFileUrl = "https://ipv4.download.thinkbroadband.com/1MB.zip"; // Public test file URL
    try {
      const startTime = performance.now();
      const response = await fetch(testFileUrl, { method: "GET" });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const endTime = performance.now();
      const fileSizeInBytes = parseInt(
        response.headers.get("content-length") || "1000000",
        10
      ); // Fallback to 1 MB
      const durationInSeconds = (endTime - startTime) / 1000;
      const speedInMbps =
        (fileSizeInBytes * 8) / (1024 * 1024 * durationInSeconds); // Convert to Mbps
      return speedInMbps;
    } catch (error) {
      console.error("Failed to measure internet speed:", error.message);
      return 1; // Default to low speed for fallback
    }
  };

  const getVideoUrlForSpeed = (speedInMbps) => {
    const videoResolutions = [
      { resolution: "144p", minSpeed: 0 },
      { resolution: "360p", minSpeed: 1 },
      { resolution: "720p", minSpeed: 3 },
      { resolution: "1080p", minSpeed: 5 },
    ];

    const selectedResolution = videoResolutions
      .reverse()
      .find((res) => speedInMbps >= res.minSpeed);

    return selectedResolution?.resolution || "144p";
  };
  useEffect(() => {
    const fetchAndSetVideoUrl = async () => {
      const speedInMbps = await measureInternetSpeed();
      const selectedResolution = getVideoUrlForSpeed(speedInMbps || 1); // Fallback to lowest resolution
      let res = src?.find((i) => i.label == selectedResolution);
      setVideoUrl(res.url);
    };
    fetchAndSetVideoUrl();
  }, []);

  const [likeState, setLikeState] = useState({
    liked: data?.isLiked,
    id: data?.id,
    count: data?.likes,
  });
  const [savedState, setSavedState] = useState({
    saved: data?.isSaved,
    id: data?.id,
  });

  return (
    <>
      <ReportBox showReport={showReport} setShowReport={setShowReport} />
      <div ref={reff} className="micro-learning-wrapper">
        <div className="micro-video-container">
          <video
            ref={videoRef}
            src={videoUrl}
            className={
              from == "home-page" ? "main-micro-video2" : "main-micro-video"
            }
            muted={isMuted}
            loop
            playsInline
            onClick={handleVideoClick}
          />
          {/* Pause/Play Icon */}
          {!isPlaying && (
            <div
              className={
                from == "home-page" ? "play-pause-btn2" : "play-pause-btn"
              }
              onClick={handleVideoClick}
            >
              <FaPlay style={{ marginLeft: "5px" }} />
            </div>
          )}

          {/* Top-right sound toggle */}
          <div className="sound-toggle-btn" onClick={toggleMute}>
            <span
              style={{ color: "white", fontSize: "15px", marginTop: "3px" }}
            >
              {isMuted ? <HiSpeakerXMark /> : <HiSpeakerWave />}
            </span>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 30,
              right: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          ></div>
        </div>

        {from !== "home-page" && (
          <div className="learning-box-right">
            <div className="learnin-box-right-inner">
              {" "}
              <Tooltip title="Views" placement="right">
                <div className="micro-icon-container">
                  {" "}
                  <IoPlayOutline className="micro-learning-icon" />
                </div>
              </Tooltip>
              <p>{data?.views}</p>
            </div>

            <div className="learnin-box-right-inner">
              {" "}
              {likeState?.id == data?.id && likeState?.liked ? (
                <Tooltip title="Unlike" placement="right">
                  <div className="micro-icon-container">
                    {" "}
                    <IoMdHeart
                      className="micro-learning-icon"
                      onClick={() => {
                        setLikeState({
                          liked: false,
                          id: data.id,
                          count: likeState?.count - 1,
                        });
                        handleLikeOrRemoveLikeOfShort(data?.id);
                      }}
                      style={{ color: "red" }}
                    />
                  </div>
                </Tooltip>
              ) : (
                <Tooltip title="Like" placement="right">
                  <div className="micro-icon-container">
                    {" "}
                    <IoMdHeartEmpty
                      onClick={() => {
                        setLikeState({
                          liked: true,
                          id: data.id,
                          count: likeState?.count + 1,
                        });
                        handleLikeOrRemoveLikeOfShort(data?.id);
                      }}
                      className="micro-learning-icon"
                    />
                  </div>
                </Tooltip>
              )}
              {likeState?.id == data?.id && <p>{likeState?.count}</p>}
            </div>

            <div className="learnin-box-right-inner">
              {" "}
              {/* <FaRegComment className="micro-learning-icon" /> */}
              <CommentModal
                data={data}
                showReport={showReport}
                setShowReport={setShowReport}
              />
              <p>{data?.commentCounts}</p>
            </div>

            <div className="learnin-box-right-inner">
              <Tooltip title="Share" placement="right">
                <div className="micro-icon-container">
                  <PiShareFatLight
                    className="micro-learning-icon "
                    onClick={() => {
                      if (!showShareModal) {
                        pushToDataLayer({
                          ecommerce: null, // Clear the previous ecommerce object.
                        });
                        pushToDataLayer({
                          event: "short_shared",
                          isLoggedIn: localStorage?.getItem("isLoggedIn"),
                          url: data?.shareLink?.link,
                          title: data?.shareLink?.text,
                        });
                        setShowShareModal(true);
                        setShowShareModalLink({
                          url: data?.shareLink?.link,
                          title: data?.shareLink?.text,
                          id: data?.id,
                        });
                      } else {
                        setShowShareModal(false);
                        setShowShareModalLink({ url: "", title: "", id: "" });
                      }
                    }}
                  />
                </div>{" "}
              </Tooltip>

              <p>{data?.shareCount}</p>
            </div>

            {showShareModal && data.id == showShareModalLink?.id && (
              <div className="share_modal2" style={{}}>
                <CancelIcon
                  className="share_modal_cancel "
                  onClick={() => {
                    setShowShareModal(false);
                  }}
                />
                {/* <div className="text_share_modal">{showShareModalLink}</div> */}
                <div className="share_platforms">
                  <div>
                    {" "}
                    <WhatsappShareButton
                      url={showShareModalLink?.url}
                      title={showShareModalLink?.title}
                      separator="Download Now : "
                      className="Demo__some-network__share-button"
                    >
                      <FaWhatsappSquare className="link_share_icon share_wp" />{" "}
                      Whatsapp
                    </WhatsappShareButton>
                  </div>
                  <div>
                    {" "}
                    <TwitterShareButton
                      url={showShareModalLink?.url}
                      title={showShareModalLink?.title}
                      separator=":"
                      className="Demo__some-network__share-button"
                    >
                      <RiTwitterXFill className="link_share_icon " /> Twitter
                    </TwitterShareButton>
                  </div>
                  <div>
                    {" "}
                    <FacebookShareButton
                      url={showShareModalLink?.url}
                      title={showShareModalLink?.title}
                      separator=":"
                      className="Demo__some-network__share-button"
                    >
                      <FaFacebookSquare className="link_share_icon  share_fb" />{" "}
                      Facebook
                    </FacebookShareButton>
                  </div>
                  <div style={{ display: "flex" }}>
                    {" "}
                    Copy Link
                    <ContentCopyIcon
                      className="refer_icon refer_copy_icon"
                      onClick={() => {
                        navigator.clipboard.writeText(showShareModalLink?.url);
                        toast.dismiss();
                        toast.success("Copied");
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div
              onClick={() => {
                // navigate("/learning/saved-post/10");
              }}
              className="learnin-box-right-inner"
            >
              {" "}
              {savedState?.id == data?.id && savedState?.saved ? (
                <Tooltip title="Unsave" placement="right">
                  <div className="micro-icon-container">
                    {" "}
                    <MdBookmarkAdded
                      onClick={() => {
                        setSavedState({ saved: false, id: data.id });
                        handleSaveOrUnsave(data?.id);
                      }}
                      className="micro-learning-icon"
                    />
                  </div>
                </Tooltip>
              ) : (
                <Tooltip title="Save" placement="right">
                  <div className="micro-icon-container">
                    <MdOutlineBookmarkBorder
                      onClick={() => {
                        setSavedState({ saved: true, id: data.id });
                        handleSaveOrUnsave(data?.id);
                      }}
                      className="micro-learning-icon"
                    />
                  </div>
                </Tooltip>
              )}
              <p>Save</p>
            </div>
            {/* <div>
            {" "}
            <BsThreeDots
              className="micro-learning-icon"
              onClick={() => {
                navigate("/learning/saved-post/10");
              }}
            />
          </div> */}
            <div>
              {from !== "home-page" && (
                <Menu
                  setShortLearningPrivacyPolicy={setShortLearningPrivacyPolicy}
                  shortLearningPolicy={shortLearningPolicy}
                  showReport={showReport}
                  setShowReport={setShowReport}
                  data={data}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MicroLearningPlayer;
