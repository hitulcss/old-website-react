import React, { useContext, useEffect, useState } from "react";
import "./ShortLearning.css";
import { CoursesData } from "../../../context/courses/Courses";
import NavBar from "../NavBar/NavBar";
import SideBar from "../../../components/Sidebar/SideBar";
import { PiShareFatLight } from "react-icons/pi";
import { IoEye } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
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
import { TbShare3 } from "react-icons/tb";
import { HeadProvider, Title } from "react-head";
import { IoMdArrowRoundBack } from "react-icons/io";
import { pushToDataLayer } from "../../../gtm/gtm";

const ShortLearningProfile = () => {
  //channel id from url
  const { channelId } = useParams();

  //context
  const {
    getShortVideosByChannel,
    shortVideosDataByChannel,
    channelProfile,
    channelProfileData,
    channelSubscribeOrUnSubscribe,
  } = useContext(CoursesData);

  //fetching post
  useEffect(() => {
    if (channelId) {
      channelProfile({ channelId: channelId });
      getShortVideosByChannel({ channelId: channelId, page: 1, pageSize: 10 });
    }
  }, [channelId]);

  //loading
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (shortVideosDataByChannel || channelProfileData) {
      setLoading(false);
    }
  }, [shortVideosDataByChannel, channelProfileData]);

  //handleSubOrUnsub
  const handleSubOrUnsub = () => {
    channelSubscribeOrUnSubscribe({ channelId: channelId });
  };

  const navigate = useNavigate();

  //share
  const [showShareModal, setShowShareModal] = useState(false);
  const [showShareModalLink, setShowShareModalLink] = useState({
    url: "",
    title: "",
  });

  const { isSidebarExpanded } = useContext(CoursesData);
  return (
    <>
      <HeadProvider>
        <Title>Channel - SD Campus </Title>
      </HeadProvider>
      {showShareModal && (
        <div className="share_modal3" style={{}}>
          <CancelIcon
            className="share_modal_cancel"
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
            <div>
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
          {loading ? (
            <Loader />
          ) : (
            <div className="short-learning-wrapper">
              <div className="back-btn">
                <IoMdArrowRoundBack
                  className="back-arrow-btn2"
                  onClick={() => navigate(-1)}
                />
              </div>
              <div className="short-learning-container">
                <div className="short-learning-upper">
                  <div className="short-left">
                    <div className="short-left-img">
                      <img src={channelProfileData?.profile} alt="logo" />
                      <TbShare3
                        className="learning-share-btn mobile-profile-share"
                        onClick={() => {
                          if (!showShareModal) {
                            setShowShareModal(true);
                            setShowShareModalLink({
                              url: channelProfileData?.shareLink?.link,
                              title: channelProfileData?.shareLink?.text,
                            });
                          } else {
                            setShowShareModal(false);
                            setShowShareModalLink({ url: "", title: "" });
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="short-right">
                    <h1>{channelProfileData?.name}</h1>
                    <p className="short-learning-descrip">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: channelProfileData?.description,
                        }}
                        style={{ fontSize: "1.1rem" }}
                      ></div>
                      {/* 
                      <span
                        style={{
                          color: "var(--primaryColor)",
                          cursor: "pointer",
                        }}
                      >
                        more
                      </span> */}
                    </p>
                    <div className="learning-detail">
                      <div>
                        <h2>{channelProfileData?.shortCount}</h2>
                        <p>Videos</p>
                      </div>
                      <span>│</span>
                      <div>
                        <h2>{channelProfileData?.viewCount}</h2>
                        <p>Views</p>
                      </div>
                      <span>│</span>
                      <div>
                        <h2>{channelProfileData?.likeCount}</h2>
                        <p>Likes</p>
                      </div>
                      <span>│</span>
                      <div>
                        <h2>{channelProfileData?.subscriberCount}</h2>
                        <p>Followers</p>
                      </div>
                    </div>
                    <button
                      style={{
                        background: channelProfileData?.isSubscribe
                          ? "#fff"
                          : "var(--primaryColor)",
                        color: channelProfileData?.isSubscribe
                          ? "#000"
                          : "#fff",
                      }}
                      onClick={() => {
                        handleSubOrUnsub();
                      }}
                    >
                      {channelProfileData?.isSubscribe ? "Follwing" : "Follow"}
                    </button>
                  </div>
                  <TbShare3
                    className="learning-share-btn laptop-profile-share"
                    onClick={() => {
                      if (!showShareModal) {
                        pushToDataLayer({
                          ecommerce: null, // Clear the previous ecommerce object.
                        });
                        pushToDataLayer({
                          event: "short_channel_shared",
                          isLoggedIn: localStorage?.getItem("isLoggedIn"),
                          url: channelProfileData?.shareLink?.link,
                          title: channelProfileData?.shareLink?.text,
                        });
                        setShowShareModal(true);
                        setShowShareModalLink({
                          url: channelProfileData?.shareLink?.link,
                          title: channelProfileData?.shareLink?.text,
                        });
                      } else {
                        setShowShareModal(false);
                        setShowShareModalLink({ url: "", title: "" });
                      }
                    }}
                  />
                </div>
                <div className="short-learning-lower">
                  <div className="lower-header1">
                    <h2>
                      All posts ({shortVideosDataByChannel?.shorts?.length})
                    </h2>
                  </div>
                  <p style={{ border: "1px solid #dfdfdf" }}> </p>
                  <div className="learning-posts">
                    {shortVideosDataByChannel?.shorts?.map((item, index) => (
                      <div
                        key={index}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate(
                            `/learning/short-learning/short/${item?.id}`
                          );
                        }}
                      >
                        <div className="reel-container">
                          {" "}
                          <div className="main-page-img-container">
                            {" "}
                            <video
                              src={item?.urls[2]?.url}
                              style={{ borderRadius: "5px", height: "22rem" }}
                            />
                            {/* <img src={item.poster} alt="poster" /> */}
                            <div className="black-shadow2"></div>
                            <div className="reel-detail">
                              {/* <img
                                src={video?.channel?.profile}
                                alt="channel_logo"
                              />{" "} */}
                              {/* <img src={item.channel.profile} alt="logo" />{" "} */}
                              <p>{item.title}</p>
                              <p
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                <IoEye />
                                {item.views}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShortLearningProfile;
