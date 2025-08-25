import React, { useState, useContext, useEffect } from "react";
import "./LiveLecture.css";
import { MdForum } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { LuSendHorizonal } from "react-icons/lu";
import avatarimg from "../../../../../assets/live/avatar.png";
import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import { CoursesData } from "../../../../../context/courses/Courses";
import socket from "./sockets.js";
import VideoPlayer from "../../../../../components/VideoPlayer/VideoPlayer.js";
import { useNavigate } from "react-router-dom";
import LiveTabs from "./live_tabs/LiveTabs.js";
import { FaAngleUp } from "react-icons/fa";
import { Toaster } from "react-hot-toast";

const LiveLecture = ({ subjectData, from }) => {
  const navigate = useNavigate();
  if (!localStorage.getItem("isLoggedIn")) {
    navigate(`/login?source=${window?.location?.href}`);
  }

  const { batchSlug, hashId } = useParams();
  let secretKey = "SDCAMPUS";
  const bytes = CryptoJS.AES.decrypt(
    CryptoJS.enc.Base64.parse(hashId).toString(CryptoJS.enc.Utf8),
    secretKey
  );
  const Id = bytes.toString(CryptoJS.enc.Utf8);
  const {
    lectureDetails,
    getLectureById,
    lecturesOfBatch,
    getLecturesOfSubject,
    addCommentToLecture,
    getCommentsByLectureId,
    lectureComments,
    deleteCommentForLecture,
    replyToCommentsLecture,
    markCommentToReport,
    markCommentToPin,
  } = useContext(CoursesData);

  useEffect(() => {
    getLectureById(Id, batchSlug);
    getLecturesOfSubject(subjectData?.batchSlug, subjectData?.subjectId);
  }, []);
  const [isChatVisible, setChatVisible] = useState(false);

  //showing more menu
  const [showMoreMenu, setShowMoreMenu] = useState({ id: "", state: false });

  const handleToggleChat = () => {
    setChatVisible((prevVisibility) => !prevVisibility);
  };

  const details = JSON.parse(localStorage.getItem("details"));

  const name = details?.name || details?.FullName;

  const [msg, setMsg] = useState("");
  const [messagelist, setMessageList] = useState([]);
  const [nameOfUser, setNameOfUser] = useState();
  const [IconIfUser, setIconIfUser] = useState("");
  const [isLiveFullScreen, setIsLiveFullScreen] = useState(false);

  let batchName = "Batch";
  let batchId = "BatchId";
  const joinRoom = () => {
    socket.emit("create", lectureDetails?.commonName);
    // socket.emit("addUser", { id: details.id, username: name })
  };
  useEffect(() => {
    getCommentsByLectureId(Id);
    if (lectureDetails?.commonName !== "") joinRoom();
  }, [lectureDetails]);
  const [newMessageScroll, setNewMessageScroll] = useState(0);
  const [count, setCount] = useState(0);

  //replyComment
  const [replyTo, setReplyTo] = useState({
    post: true,
    comment: false,
    replyComment: false,
    name: "",
  });
  const [commentIdForReply, setCommentIdForReply] = useState("");

  const sendMessage = async (msgg, from) => {
    if (msg !== "" && from == "live") {
      setCount(count + 1);
      // const roomId = batchSlug;
      let roomId = lectureDetails?.commonName;
      await socket.emit(
        "send-message",
        msgg,
        name,
        roomId,
        details?.profilePhoto,
        lectureDetails?.batchDetails?.batchName,
        lectureDetails?.batchDetails?.id
      );
      setMsg("");
      if (count >= 7) setNewMessageScroll(50);
    } else if (msg !== "" && from == "recorded") {
      if (replyTo?.comment) {
        replyToCommentsLecture({
          commentText: msg,
          lectureId: Id,
          replyTo: commentIdForReply,
        });
      } else {
        addCommentToLecture({ commentText: msg, lectureId: Id });
      }
      setMsg("");
    }
  };

  const arrivalMessage = (message, name, userIconUrl, batchName, batchId) => {
    setMessageList((prev) => [
      ...prev,
      {
        message: message,
        name: name,
        icon: userIconUrl,
        batchName: batchName,
        batchId: batchId,
      },
    ]);
  };

  const recieveMessage = () => {
    socket.on(
      "receive-message",
      (message, name, userIconUrl, batchName, batchId) => {
        arrivalMessage(message, name, userIconUrl, batchName, batchId);
        setNameOfUser(name);
        setIconIfUser(userIconUrl);
      }
    );
  };
  useEffect(() => {
    recieveMessage();
  }, [socket]);
  const handleChange = (e) => {
    if (e.target.value !== "") {
      setMsg(e.target.value);
    }
  };

  useEffect(() => {
    // socket.on("getUsers", (data) => {
    //   console.log('data', data)
    // });
  }, []);

  useEffect(() => {
    var elem = document.getElementById("chat-section");
    if (elem) {
      elem.scrollTop = elem.scrollHeight;
    } else {
    }
  }, [messagelist]);
  useEffect(() => {
    var elem = document.getElementById("comment-section");
    if (elem) {
      elem.scrollTop = -elem.scrollHeight;
    } else {
    }
  }, [lectureComments]);


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
      <Toaster />
      {/* {from !== "after-login" && <Navbar />} */}
      <div
        className="livelecture_wrapper"
        style={{
          // maxWidth: lectureDetails?.LiveOrRecorded == "Recorded" && "100%",
          maxWidth: "100%",
        }}
      >
        {/* <Wrapper> */}
        <div className="livelecture_container">
          <div className="livelecture_upper">
            <div
              className="live_left"
              style={{
                // width: lectureDetails?.LiveOrRecorded == "Recorded" && "100%",
                width: "100%",
              }}
            >
              <div className="left_upper">
                {" "}
                {/* <img src={liveImg} alt="Live Img" /> */}
                <div className="video_payer_container">
                  {" "}
                  {lectureDetails?.lectureType &&
                    lectureDetails?.LiveOrRecorded && (
                      <div className="live_video_player_container">
                        <VideoPlayer
                          link={lectureDetails?.link}
                          type={lectureDetails?.LiveOrRecorded}
                          title={lectureDetails?.lectureTitle}
                          platform="yt"
                          showControls={controls}
                        />

                        {/* <h1 className="lecture_title">
                            {lectureDetails?.lectureTitle}
                          </h1> */}
                      </div>
                    )}
                </div>
              </div>
              {lectureDetails?.LiveOrRecorded == "Recorded" && (
                <div className="resources_container">
                  <LiveTabs
                    markCommentToPin={markCommentToPin}
                    markCommentToReport={markCommentToReport}
                    setCommentIdForReply={setCommentIdForReply}
                    commentIdForReply={commentIdForReply}
                    setReplyTo={setReplyTo}
                    replyTo={replyTo}
                    replyToCommentsLecture={replyToCommentsLecture}
                    lectureDetails={lectureDetails}
                    isChatVisible={isChatVisible}
                    lectureComments={lectureComments}
                    name={name}
                    showMoreMenu={showMoreMenu}
                    details={details}
                    deleteCommentForLecture={deleteCommentForLecture}
                    Id={Id}
                    setShowMoreMenu={setShowMoreMenu}
                    avatarimg={avatarimg}
                    sendMessage={sendMessage}
                    msg={msg}
                    handleChange2={handleChange}
                  />
                </div>
              )}
            </div>
            <div
              className="live_right"
              style={{
                display: lectureDetails?.LiveOrRecorded == "Recorded" && "none",
              }}
            >
              {lectureDetails?.LiveOrRecorded == "Live" ? (
                <div className="live_comment" onClick={handleToggleChat}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <MdForum className="live_icon" />
                    <span>Live Comments</span>
                  </div>

                  {isChatVisible ? (
                    <FaAngleDown className="live_icon" />
                  ) : (
                    <FaAngleUp className="live_icon" />
                  )}
                </div>
              ) : (
                ""
                // < div className="live_dpp">
                //   <p className="live_dpp_title">Resoures shared with you</p>
                //   <p style={{ border: "1px solid #e7e7e7" }}></p>
                //   {(lectureDetails?.material?.fileLoc ||
                //     lectureDetails?.dpp?.fileLoc) ? (
                //     <div className="recorded_dpp">
                //       {lectureDetails?.material?.fileName && (
                //         <div className="dpp_notes_download">
                //           <img src={pdficon} alt="pdficon" />
                //           <span className="pdf_name">
                //             {" "}
                //             {lectureDetails?.material?.fileName}
                //           </span>

                //           <img src={downloadpdf} alt="downloadpdf" />
                //         </div>
                //       )}
                //       {lectureDetails?.dpp?.fileName && (
                //         <div className="dpp_notes_download">
                //           <img src={pdficon} alt="pdficon" />
                //           <span className="pdf_name">
                //             {" "}
                //             {lectureDetails?.dpp?.fileName}
                //           </span>

                //           <img src={downloadpdf} alt="downloadpdf" />
                //         </div>
                //       )}
                //     </div>) : <div className="live_dpp_pdf">

                //     <div className="dpp_notes_download">
                //       No Resources Available
                //     </div>

                //   </div>}

                // </div>
              )}

              {/* live chat box  */}

              {!isChatVisible && lectureDetails?.LiveOrRecorded == "Live" && (
                <div className="chat-box">
                  <div className="inner_chat">
                    <div
                      id="chat-section"
                      style={{
                        overflowY: "scroll",
                        padding: "20px",
                        height: "45vh",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {messagelist?.map((item, index) => {
                        // console.log('Item', item)
                        // if (index % 2 == 0) {
                        return (
                          // <Stack
                          //   key={index}
                          //   direction="row"
                          //   alignItems="center"
                          //   justifyContent={name == item?.name ? "" : ""}
                          //   mb={2}
                          //   sx={{
                          //     width: "100%",
                          //     color: name == item?.name ? "green" : "",
                          //   }}
                          // >
                          //   <Avatar
                          //     src={item?.icon}
                          //     style={{ height: "30px", width: "30px" }}
                          //   />{" "}
                          //   &nbsp;
                          //   <h5 style={{ textAlign: "start" }}>
                          //     {item?.name} :{" "}
                          //   </h5>
                          //   <br /> &nbsp;
                          //   <span style={{ fontSize: "12px" }}>
                          //     {item?.message}
                          //   </span>
                          // </Stack>
                          <Stack
                            key={index}
                            direction="row"
                            alignItems="center"
                            justifyContent={name == item?.name ? "" : ""}
                            mb={2}
                            sx={{
                              width: "100%",
                              color: name == item?.name ? "green" : "",
                            }}
                          >
                            <div
                              className="msg-box msg-box-youtube"
                              style={{
                                position: "relative",
                                marginTop: "10px",
                                maxWidth: "100%",
                              }}
                            >
                              <div
                                className="from-to-box"
                                style={{
                                  color: name == item?.name ? "green" : "",
                                }}
                              >
                                <Avatar
                                  src={item?.icon}
                                  style={{ height: "20px", width: "20px" }}
                                />{" "}
                                {item?.name}
                              </div>
                              <p
                                style={{
                                  marginLeft: "30px",
                                  marginTop: "10px",
                                }}
                              >
                                {" "}
                                {item?.message}
                              </p>
                            </div>
                            {/* <Avatar
                              src={IconIfUser}
                              style={{ height: "30px", width: "30px" }}
                            />{" "}
                            &nbsp;
                            <h5 style={{ textAlign: "start" }}>
                              {item?.name}{name == item?.name ? "" : `(${item?.batchName})`} :{" "}
                            </h5>
                            <br /> &nbsp;
                            <span style={{ fontSize: "12px" }}>
                              {item?.message}
                            </span> */}
                          </Stack>
                        );
                        // } else {
                        //   return;
                        // }
                      })}
                    </div>
                    <p
                      style={{
                        border: "1px solid #e7e7e7",
                        marginTop: "1.5rem",
                      }}
                    ></p>

                    <div className="inner_chat_lower">
                      <Avatar alt="Remy Sharp" src={avatarimg} />
                      <div className="chat_input_box">
                        <input
                          type="text"
                          placeholder="Comment"
                          value={msg}
                          maxlength="200"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              sendMessage(msg, "live");
                            }
                          }}
                        />
                        <LuSendHorizonal
                          className="send_icon"
                          onClick={() => sendMessage(msg, "live")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* {!isChatVisible && lectureDetails?.LiveOrRecorded == "Recorded" && (
                  <div className="chat-box">
                    <div className="inner_chat">
                      <div
                        id='comment-section'
                        style={{
                          overflowY: "scroll",
                          padding: "20px",
                          height: "40vh",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {lectureComments?.map((item, index) => {
                          // console.log('Item', item)
                          // if (index % 2 == 0) {
                          return (

                            <Stack
                              key={index}
                              direction="row"
                              alignItems="center"
                              justifyContent={name == item?.name ? "" : ""}
                              mb={2}
                              sx={{
                                width: "100%",
                                color: name == item?.name ? "green" : "",
                              }}
                            >

                              <div className="msg-box msg-box-youtube" style={{ position: 'relative', marginTop: '10px', maxWidth: '100%' }}>
                                <div className="from-to-box" style={{ color: name == item?.name ? "green" : "", }}>
                                  <Avatar
                                    src={item?.user?.profilePhoto}
                                    style={{ height: "20px", width: "20px" }}
                                  /> {item?.user?.name}
                                </div>
                                <p style={{ marginLeft: '30px', marginTop: '10px' }}>
                                  {item?.comment}



                                </p>
                                {showMoreMenu?.state && showMoreMenu?.id == item?.id && < div className="comment-options" style={{ position: 'absolute', right: 0, top: '60%' }}>
                                  <ul>
                                    {details?.id == item?.user?.id && <li style={{ color: 'red' }} onClick={() => deleteCommentForLecture({ commentId: item?.id, lectureId: Id })}><DeleteIcon /><span>Delete</span></li>}
                                    {details?.id == item?.user?.id && <li><EditIcon /><span>Edit</span></li>}
                                    <li><ReplyIcon /> <span>Reply</span></li>
                                  </ul>
                                </div>}
                                <MoreVertIcon size='small' sx={{ position: 'absolute', cursor: 'pointer', right: 0, top: '16px' }} onClick={() => setShowMoreMenu({ id: item?.id, state: !showMoreMenu?.state })} />
                              </div>

                            </Stack>
                          );

                        })}
                      </div>
                      <p
                        style={{
                          border: "1px solid #e7e7e7",
                          marginTop: "1.5rem",
                        }}
                      ></p>

                      <div className="inner_chat_lower">
                        <Avatar alt="Remy Sharp" src={avatarimg} />
                        <div className="chat_input_box">
                          <input
                            type="text"
                            placeholder="Comment"
                            value={msg}
                            maxlength="200"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                sendMessage(msg, 'recorded');
                              }
                            }}
                          />
                          <LuSendHorizonal
                            className="send_icon"
                            onClick={() => sendMessage(msg, 'recorded')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )} */}

              {/* live chat box  */}
            </div>
          </div>
          {lectureDetails?.LiveOrRecorded == "Live" && (
            <div className="resources_container">
              <LiveTabs
                markCommentToPin={markCommentToPin}
                markCommentToReport={markCommentToReport}
                setCommentIdForReply={setCommentIdForReply}
                commentIdForReply={commentIdForReply}
                setReplyTo={setReplyTo}
                replyTo={replyTo}
                replyToCommentsLecture={replyToCommentsLecture}
                lectureDetails={lectureDetails}
                isChatVisible={isChatVisible}
                lectureComments={lectureComments}
                name={name}
                showMoreMenu={showMoreMenu}
                details={details}
                deleteCommentForLecture={deleteCommentForLecture}
                Id={Id}
                setShowMoreMenu={setShowMoreMenu}
                avatarimg={avatarimg}
                sendMessage={sendMessage}
                msg={msg}
                handleChange2={handleChange}
              />
            </div>
          )}
          {/* <div className="upcoming_lectures">
              <h2>Upcoming Lectures</h2>
              <LectureVideos
                lecturesOfBatch={lecturesOfBatch}
                batchSlug={subjectData?.batchSlug}
              />
            </div>

            <div className="previous_lectures">
              <h2>Previous Lectures</h2>
              <LectureVideos
                lecturesOfBatch={lecturesOfBatch}
                batchSlug={subjectData?.batchSlug}
              />
            </div> */}
        </div>
        {/* </Wrapper >  */}
      </div>
      {/* {from !== "after-login" && <Footer />} */}
    </>
  );
};

export default LiveLecture;
