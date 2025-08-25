//imports
import { useEffect, useState } from "react";
import "./ChatContainer.css";
import toast, { Toaster } from "react-hot-toast";
import { Avatar, Typography } from "@mui/material";
import { LuSendHorizonal } from "react-icons/lu";
import { MdChatBubbleOutline } from "react-icons/md";
import { MdOutlineLiveHelp } from "react-icons/md";
import { MdOutlineAlignVerticalBottom } from "react-icons/md";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import emptychatimg from "../../../../../assets/emptychat.png";
import videopart from "../../../../../assets/videopart.png";
import { IoMdTime } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import nodoubt from "../../../../../assets/nodoubt.png";
import nopole from "../../../../../assets/nopole.png";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ChatContainer = ({
  doubtsEnabled,
  nameOfRoom,
  participantList,
  handleVideo,
  lectureId,
  socket,
  roomName,
  batch,
  name,
  userId,
  msgList,
  sendMessage,
  tabs,
  setTabs,
}) => {
  //msg
  const [msg, setMsg] = useState("");
  const [pollFinished, setPollFinished] = useState(false);

  //handleChange
  const handleChange = (e) => {
    const { value } = e.target;
    setMsg(value);
  };

  //sending msg
  const handleSend = () => {
    if (msg?.toString()?.trim() !== "") {
      // toast.success(msg);
      let info = {
        name: name,
        msg: msg,
        roomNameOfUser: roomName,
        batch: batch,
        to: roomName,
        imageUrl: "",
        id: socket.id,
        roomName: nameOfRoom,
      };
      sendMessage(info);
      setMsg("");
    } else {
      toast.error("Pls Enter something");
    }
  };

  //getting Doubts

  const getDoubts = () => {
    socket.emit(
      "getDoubts",
      {
        lectureId: lectureId,
        token: localStorage.getItem("token"),
      },
      (data) => {
        setDoubts(data);
        // console.log(data);
      }
    );
  };

  const [doubts, setDoubts] = useState([]);
  useEffect(() => {
    if (doubtsEnabled) {
      getDoubts();
      socket.on("response-admin-to-user", (data) => {
        // console.log("data", data);
        if (data?.status) {
          document.getElementById("produce-video").click();
          // handleVideo();
        } else {
          toast.error("Request Declined");
        }
      });
    }
  }, [doubtsEnabled]);

  const handleVideoDoubt = () => {
    toast.success("Video request raised, Wait for host to respond...");
    socket.emit("permission-user-to-admin", {
      userId: socket.id,
      name: name,
      for: "video",
      status: true,
    });
  };
  const handleTextDoubt = () => {
    if (doubtText !== "") {
      socket.emit(
        "postDoubt",
        {
          title: doubtText,
          lectureId: lectureId,
          time: 10,
          token: localStorage.getItem("token"),
        },
        (data) => {
          // console.log("doubt data", data);
          getDoubts();
          setDoubtText("");
        }
      );
    } else {
      toast.error("Enter Something...");
    }
  };
  // const [pollId, setPollId] = useState('')
  const [leaderBoard, setLeaderBoard] = useState([]);

  const [pollId, setPollId] = useState("");
  // console.log("Is Lecture Id", lectureId);
  const handlePollResponse = () => {
    // console.log('Polll', pollId, pollOptions, lectureId)
    socket.emit(
      "postResponse",
      {
        lectureId: lectureId,
        options: pollOptions,
        token: localStorage.getItem("token"),
        duration: 10,
        pollId: pollId,
      },
      (data) => {
        // console.log('doubt data', data)
        toast.success("Response Submitted");
      }
    );
  };

  // console.log('MSG LIST', msgList)
  // console.log("Tabs", tabs);

  const [pollData, setPollData] = useState("");
  useEffect(() => {
    socket.on("doubt-added", () => {
      toast.success("Added");
    });
    socket.on("doubt-solved", (data) => {
      toast.success("solved");
      // console.log("solved Doubt", data);
      getDoubts();
    });
    socket.on("student-submission-started", () => {
      toast.success("poll Started");
      socket.emit(
        "getPoll",
        {
          lectureId: lectureId,
          token: localStorage.getItem("token"),
        },
        (data) => {
          // console.log("Data of poll", data);
          setPollFinished(false);
          setPollId(data?.data?.pollId);
          setPollData(data?.data);
          setTimeLeft(data?.data?.duration);
        }
      );
    });
  }, []);
  // console.log('MSG LIST', msgList)
  // console.log("Tabs", pollData);

  //doubt text
  const [doubtText, setDoubtText] = useState("");
  const handleDoubtText = (e) => {
    setDoubtText(e.target.value);
  };

  //pollTimer
  //timer
  const [timeLeft, setTimeLeft] = useState(-1);

  useEffect(() => {
    if (timeLeft === 0) {
      // console.log("TIME LEFT IS 0");
      setTimeLeft("Finished");
    }

    // exit early when we reach 0
    if (timeLeft == -1) {
      setTimeLeft("Not Started");
      return;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  const [leaderBoardArray, setLeaderBoardArray] = useState([]);
  useEffect(() => {
    if (timeLeft == 0) {
      socket.emit(
        "getPollLeaderBoardForUser",
        {
          lectureId: lectureId,
          pollId: pollId,
          token: localStorage.getItem("token"),
        },
        (Leaderboard) => {
          // console.log('LeaderBoard=>', Leaderboard)
          setPollFinished(true);
          setLeaderBoard(Leaderboard);
          // var optionResult = Object.keys(leaderBoard?.optionsPercentage).map((key) => [key, leaderBoard?.optionsPercentage[key]])
          // setLeaderBoardArray(optionResult)
        }
      );
    }
    // socket.on("doubt-added", () => {
    //   toast.success("Added");
    // });
    // socket.on("doubt-solved", (data) => {
    //   toast.success("solved");
    //   console.log("solved Doubt");
    // });
    // socket.on("student-submission-started", () => {
    //   toast.success("poll Started");
    //   socket.emit(
    //     "getPoll",
    //     {
    //       lectureId: "65face7272faec4d0365f078",
    //       token: localStorage.getItem("token"),
    //     },
    //     (data) => {
    //       console.log("Data of poll", data);
    //       setPollId(data?.data?.pollId);
    //     }
    //   );
    // });
  }, [timeLeft]);

  // console.log('leaderBoard araaay', pollData)
  //pollOptions
  const [pollOptions, setPollOptions] = useState([]);

  //chat automatic scroll to top

  useEffect(() => {
    var elem = document.getElementById("chat-container");
    if (elem) {
      elem.scrollTop = elem.scrollHeight;
    } else {
    }
  }, [msgList]);
  return (
    <>
      <Toaster />

      <div className="chat-container">
        <div className="chat-container-box">
          <div className="chat-top">
            <span
              onClick={() => {
                setTabs({
                  chat: true,
                  doubt: {
                    text: false,
                    video: false,
                  },
                  poll: false,
                });
              }}
              style={{
                backgroundColor: tabs?.chat ? "#b042f527" : "",
                borderRadius: "10px 10px 0px 0px",
                color: tabs?.chat ? "var(--primaryColor)" : "",
              }}
            >
              <MdChatBubbleOutline className="chat-upper-icon" />
              Chat
            </span>
            <span
              onClick={() => {
                setTabs({
                  chat: false,
                  doubt: {
                    text: true,
                    video: false,
                  },
                  poll: false,
                });
              }}
              style={{
                backgroundColor:
                  tabs?.doubt?.text || tabs?.doubt?.video ? "#b042f527" : "",
                borderRadius: "10px 10px 0px 0px",
                color:
                  tabs?.doubt?.text || tabs?.doubt?.video
                    ? "var(--primaryColor)"
                    : "",
              }}
            >
              <MdOutlineLiveHelp className="chat-upper-icon" />
              Doubt
            </span>
            <span
              onClick={() => {
                setTabs({
                  chat: false,
                  doubt: {
                    text: false,
                    video: false,
                  },
                  poll: true,
                });
              }}
              style={{
                backgroundColor: tabs?.poll ? "#b042f527" : "",
                borderRadius: "10px 10px 0px 0px",
                color: tabs?.poll ? "var(--primaryColor)" : "",
              }}
            >
              <MdOutlineAlignVerticalBottom className="chat-upper-icon" />
              Poll
            </span>
          </div>
          <div className="chat-mid" id="chat-container">
            {tabs?.chat &&
              (msgList?.length > 0 ? (
                msgList?.map((item, index) => {
                  return (
                    <div
                      className="msg-reply-container"
                      style={{ display: "flex" }}
                      key={index}
                    >
                      <Typography
                        onMouseEnter={() => {
                          // setReply(true)
                        }}
                        onMouseLeave={() => {
                          // setReply(false)
                        }}
                        className="usermessage"
                      >
                        {/* <span className="from-to-box" style={{}} > {
                                    `${item?.name?.slice(0, 10)}...`} 
                                    from <span style={{ color: '#b042f5' }}>{item?.batchName ? item?.batchName : 'All'}</span> to <span style={{ color: '#b042f5' }}>{item?.to !== '' ? item?.to : 'hi'}</span></span> */}
                        <span className="from-to-box" style={{}}>
                          <Avatar
                            sx={{ width: 30, height: 30, fontSize: "20rem" }}
                          />{" "}
                          <span className="chat-user-name">
                            {" "}
                            {item?.name} :
                          </span>
                        </span>
                        <span className="msg-content" style={{}}>
                          {item?.msg}
                        </span>
                      </Typography>
                    </div>
                  );
                })
              ) : (
                <div className="empty-chat">
                  <img src={emptychatimg} alt="emptychat" />
                  <div className="empty-chat-descrip">
                    <h3>Start a conversation</h3>
                    <p>
                      There are no messages here yet. Start a conversation by
                      sending a message.
                    </p>
                  </div>
                </div>
              ))}
            {(tabs?.doubt?.text || tabs?.doubt?.video) && (
              <div className="ask-doubt-container">
                <div className="doubt-btn-container">
                  <button
                    onClick={() => {
                      setTabs({
                        chat: false,
                        doubt: {
                          text: false,
                          video: true,
                        },
                        poll: false,
                      });
                    }}
                    className="video-btn"
                    style={{
                      background: tabs?.doubt?.video ? "#b042f527" : "",
                    }}
                  >
                    Video
                  </button>
                  <button
                    onClick={() => {
                      setTabs({
                        chat: false,
                        doubt: {
                          text: true,
                          video: false,
                        },
                        poll: false,
                      });
                    }}
                    style={{
                      background: tabs?.doubt?.text ? "#b042f527" : "",
                      borderRadius: "10px 10px 0px 0px",
                    }}
                    className="text-btn"
                  >
                    Text
                  </button>
                </div>
              </div>
            )}

            {tabs?.doubt?.text && (
              <>
                <div style={{ height: "75%", overflowY: "scroll" }}>
                  {doubtsEnabled ? (
                    doubts?.data?.length > 0 ? (
                      doubts?.data?.map((item, index) => {
                        return (
                          <>
                            <div className="ask-doubt-textpart" key={index}>
                              <div className="textpart-box">
                                <div className="textpart-upper">
                                  <p>{item?.title} </p>
                                </div>
                                <p style={{ border: "1px solid #dfdfdf" }}></p>
                                <div className="textpart-mid">
                                  <p>
                                    {item?.isResolved
                                      ? item?.answer
                                      : "Yet to be resolved"}{" "}
                                  </p>
                                </div>
                                <p style={{ border: "1px solid #dfdfdf" }}></p>
                                <div className="textpart-lower">
                                  {item?.isResolved && (
                                    <div>
                                      <IoMdTime />
                                      {item?.resolveTime}sec
                                    </div>
                                  )}
                                  <div>
                                    {item?.isResolved && (
                                      <FaCheckCircle className="resolve-icon" />
                                    )}
                                    {item?.isResolved
                                      ? "  Resolved"
                                      : "Not Resolved"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })
                    ) : (
                      <div className="ask-doubt-videopart">
                        <img src={nodoubt} alt="videopart" />
                        {/* <p>
                        Please few minutes wait host to provide access to
                        real-time Communication.
                      </p> */}
                      </div>
                    )
                  ) : (
                    <div className="ask-doubt-videopart">
                      <img src={nodoubt} alt="videopart" />
                      <p>
                        Please few minutes wait host to provide access to
                        real-time Communication.
                      </p>
                    </div>
                  )}
                </div>

                {/* <button onClick={() => handleTextDoubt()}>Ask Text Doubt</button> */}
              </>
            )}
            {tabs?.doubt?.video && (
              <div>
                <div className="ask-doubt-videopart">
                  <img src={videopart} alt="videopart" />
                  <p>
                    Please few minutes wait host to provide access to real-time
                    Communication.
                  </p>
                </div>

                {doubtsEnabled && (
                  <div className="video-doubt-button">
                    <button
                      className="ask-doubt-button"
                      style={{ height: "40px", padding: "10px" }}
                      onClick={() => handleVideoDoubt()}
                    >
                      Ask Video Doubt
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* {tabs?.poll && 'Poll'} */}
            {tabs?.poll &&
              (!pollFinished ? (
                pollData != "" ? (
                  <div className="pole-container">
                    <div style={{ width: 150, height: 150 }}>
                      <CircularProgressbar
                        value={timeLeft}
                        maxValue={pollData?.duration}
                        text={
                          timeLeft == -1
                            ? "Not Started..."
                            : timeLeft == NaN
                            ? "Not Started"
                            : timeLeft
                        }
                      />
                    </div>

                    <div className="poll-options">
                      {pollData?.options?.map((item, index) => {
                        return (
                          <>
                            <div className="poll-opt-box" key={index}>
                              <input
                                type="radio"
                                name={
                                  pollData?.pollType == "single"
                                    ? "correctOptions"
                                    : `correctOptions-${index}`
                                }
                                onChange={() => {
                                  if (pollData?.pollType == "single") {
                                    setPollOptions([item]);
                                  } else {
                                    setPollOptions((prev) => {
                                      return [...prev, item];
                                    });
                                  }
                                }}
                              />
                              <p>{item}</p>
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <div className="video-doubt-button">
                      <button
                        className="submit-pole-btn"
                        style={{ height: "40px", padding: "10px" }}
                        onClick={() => {
                          handlePollResponse();
                        }}
                      >
                        Submit Poll
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="no-pole-part">
                    <img src={nopole} alt="videopart" />
                    <p>There are no polls in the live class yet.</p>
                  </div>
                )
              ) : (
                <>
                  {" "}
                  <div className="pole-result">
                    <div className="pole">
                      {" "}
                      {/* {leaderBoardArray?.map((item, index) => {


                    return (<> */}
                      <div className="pole-circularbar">
                        {leaderBoard?.data?.optionsPercentage?.A && (
                          <div style={{ width: 110, height: 110 }}>
                            <CircularProgressbar
                              color="green"
                              value={`${
                                leaderBoard?.data?.optionsPercentage?.A * 100
                              }`}
                              maxValue={100}
                              text={`${
                                leaderBoard?.data?.optionsPercentage?.A * 100
                              }% (A)`}
                            />
                          </div>
                        )}
                        {leaderBoard?.data?.optionsPercentage?.B && (
                          // {true && (
                          <div style={{ width: 110, height: 110 }}>
                            <CircularProgressbar
                              value={
                                leaderBoard?.data?.optionsPercentage?.B * 100
                              }
                              maxValue={20}
                              text={`${
                                leaderBoard?.data?.optionsPercentage?.B * 100
                              }% (B)`}
                            />
                          </div>
                        )}
                        {/* <br></br> */}
                        {leaderBoard?.data?.optionsPercentage?.C && (
                          // {false && (
                          <div style={{ width: 110, height: 110 }}>
                            <CircularProgressbar
                              value={
                                leaderBoard?.data?.optionsPercentage?.C * 100
                              }
                              maxValue={100}
                              text={`${
                                leaderBoard?.data?.optionsPercentage?.C * 100
                              }% (C)`}
                            />
                          </div>
                        )}
                        {leaderBoard?.data?.optionsPercentage?.D && (
                          // {true && (
                          <div style={{ width: 110, height: 110 }}>
                            <CircularProgressbar
                              value={
                                leaderBoard?.data?.optionsPercentage?.D * 100
                              }
                              maxValue={100}
                              text={`${
                                leaderBoard?.data?.optionsPercentage?.D * 100
                              }% (D)`}
                            />
                          </div>
                        )}
                        {leaderBoard?.data?.optionsPercentage?.E && (
                          // {true && (
                          <div style={{ width: 110, height: 110 }}>
                            <CircularProgressbar
                              value={
                                leaderBoard?.data?.optionsPercentage?.E * 100
                              }
                              maxValue={100}
                              text={`${
                                leaderBoard?.data?.optionsPercentage?.E * 100
                              }% (E)`}
                            />
                          </div>
                        )}
                        {leaderBoard?.data?.optionsPercentage?.F && (
                          // {false && (
                          <div style={{ width: 110, height: 110 }}>
                            <CircularProgressbar
                              value={
                                leaderBoard?.data?.optionsPercentage?.F * 100
                              }
                              maxValue={100}
                              text={`${
                                leaderBoard?.data?.optionsPercentage?.F * 100
                              }% (F)`}
                            />
                          </div>
                        )}
                        {leaderBoard?.data?.optionsPercentage?.G && (
                          // {false && (
                          <div style={{ width: 110, height: 110 }}>
                            <CircularProgressbar
                              value={
                                leaderBoard?.data?.optionsPercentage?.G * 100
                              }
                              maxValue={100}
                              text={`${
                                leaderBoard?.data?.optionsPercentage?.G * 100
                              }% (G)`}
                            />
                          </div>
                        )}
                        {leaderBoard?.data?.optionsPercentage?.H && (
                          // {false && (
                          <div style={{ width: 110, height: 110 }}>
                            <CircularProgressbar
                              value={
                                leaderBoard?.data?.optionsPercentage?.H * 100
                              }
                              maxValue={100}
                              text={`${
                                leaderBoard?.data?.optionsPercentage?.H * 100
                              }% (H)`}
                            />
                          </div>
                        )}
                      </div>
                      {/* </>)
                  })} */}
                    </div>
                    <p style={{ fontWeight: "600", marginTop: "1rem" }}>
                      View Leader Dashboard
                    </p>
                  </div>
                  <div className="pole-result-wrapper">
                    <div className="pole-result-container">
                      <table>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Duration</th>

                        {leaderBoard?.data?.leaderBoard?.map((item, index) => {
                          return (
                            <>
                              <tr>
                                <td>{item?.rank}</td>
                                <td>{item?.name}</td>
                                <td>{item?.duration}</td>
                              </tr>
                            </>
                          );
                        })}
                      </table>
                    </div>
                  </div>
                </>
              ))}

            {/* {(tabs?.doubt?.text || tabs?.doubt?.video) && (
              <div className="ask-doubt-container">
                <div className="doubt-btn-container">
                  <button
                    onClick={() => {
                      setTabs({
                        chat: false,
                        doubt: {
                          text: false,
                          video: true,
                        },
                        poll: false,
                      });
                    }}
                    className="video-btn"
                  >
                    Video
                  </button>
                  <button
                    onClick={() => {
                      setTabs({
                        chat: false,
                        doubt: {
                          text: true,
                          video: false,
                        },
                        poll: false,
                      });
                    }}
                    className="text-btn"
                  >
                    Text
                  </button>
                </div>
              </div>
            )} */}

            {/* {tabs?.doubt?.video && (
              <div>
                <div className="ask-doubt-videopart">
                  <img src={videopart} alt="videopart" />
                  <p>
                    Please few minutes wait host to provide access to
                    real-time Communication.
                  </p>
                </div>
                <button onClick={() => handleVideoDoubt()}>
                  Ask Video Doubt
                </button>
              </div>
            )} */}
            {/* //   </div> */}
            {/* // )} */}
            {/* {tabs?.poll && 'Poll'} */}
            {/*  // {tabs?.poll && (
                // step 1---

                // <div className="pole-container">
                //   <div style={{ width: 120, height: 120 }}>
                //     <CircularProgressbar value={10} maxValue={20} text="10 sec" />
                //   </div>

                //   <div className="poll-options">
                //     <div className="poll-opt-box">
                //       <input type="radio" />
                //       <p>1</p>
                //     </div>
                //     <div className="poll-opt-box">
                //       <input type="radio" />
                //       <p>2</p>
                //     </div>
                //     <div className="poll-opt-box">
                //       <input type="radio" />
                //       <p>3</p>
                //     </div>
                //     <div className="poll-opt-box">
                //       <input type="radio" />
                //       <p>4</p>
                //     </div>
                //   </div>
                // </div>

                // step 2 --

                // <div className="pole-container">
                //   <div style={{ width: 120, height: 120 }}>
                //     <CircularProgressbar value={10} maxValue={20} text="10 sec" />
                //   </div>

                //   <div className="poll-options">
                //     <div className="poll-opt-box">
                //       <input type="radio" />
                //       <p>Yes</p>
                //     </div>
                //     <div className="poll-opt-box">
                //       <input type="radio" />
                //       <p>No</p>
                //     </div>
                //   </div>
                // </div>

                // step 3 ----

                // <div className="pole-container">
                //   <div style={{ width: 120, height: 120 }}>
                //     <CircularProgressbar value={10} maxValue={20} text="10 sec" />
                //   </div>

                //   <div className="poll-options">
                //     <div className="poll-opt-box">
                //       <input type="checkbox" />
                //       <p>User Interfoce </p>
                //     </div>
                //     <div className="poll-opt-box">
                //       <input type="checkbox" />
                //       <p>User Experience</p>
                //     </div>
                //     <div className="poll-opt-box">
                //       <input type="checkbox" />
                //       <p>User Experience</p>
                //     </div>
                //     <div className="poll-opt-box">
                //       <input type="checkbox" />
                //       <p>User Experience</p>
                //     </div>
                //     <div className="poll-opt-box">
                //       <input type="checkbox" />
                //       <p>User Experience</p>
                //     </div>
                //     <div className="poll-opt-box">
                //       <input type="checkbox" />
                //       <p>User Experience</p>
                //     </div>
                //   </div>
                // </div>

                // step 4 --

                //   <div className="pole-result">
                //     <div className="pole">
                //       {" "}
                //       <div style={{ width: 100, height: 100 }}>
                //         <CircularProgressbar
                //           value={10}
                //           maxValue={20}
                //           text="10 sec"
                //         />
                //       </div>
                //       <div style={{ width: 100, height: 100 }}>
                //         <CircularProgressbar
                //           value={10}
                //           maxValue={20}
                //           text="10 sec"
                //         />
                //       </div>
                //       <div style={{ width: 100, height: 100 }}>
                //         <CircularProgressbar
                //           value={10}
                //           maxValue={20}
                //           text="10 sec"
                //         />
                //       </div>
                //       <div style={{ width: 100, height: 100 }}>
                //         <CircularProgressbar
                //           value={10}
                //           maxValue={20}
                //           text="10 sec"
                //         />
                //       </div>
                //     </div>
                //     <p style={{ fontWeight: "600" }}>View Leader Dashboard</p>

                //     <div className="pole-result-wrapper">
                //       <div className="pole-result-container"></div>
                //     </div>
                //   </div>
                // )}
                // </div>

                {/* {tabs?.doubt?.text && (
                        <div>
                            <div className="ask-doubt-textpart">
                                <div className="textpart-box">
                                    <div className="textpart-upper">
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing
                                            andtypesetting industry?{" "}
                                        </p>
                                    </div>
                                    <p style={{ border: "1px solid #dfdfdf" }}></p>
                                    <div className="textpart-mid">
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and
                                            typesetting industry?{" "}
                                        </p>
                                    </div>
                                    <p style={{ border: "1px solid #dfdfdf" }}></p>
                                    <div className="textpart-lower">
                                        <div>
                                            <IoMdTime />
                                            05:09
                                        </div>
                                        <div>
                                            <FaCheckCircle className="resolve-icon" />
                                            Resolved
                                        </div>
                                    </div>
                                </div>
                                <div className="textpart-box">
                                    <div className="textpart-upper">
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing
                                            andtypesetting industry?{" "}
                                        </p>
                                    </div>
                                    <p style={{ border: "1px solid #dfdfdf" }}></p>
                                    <div className="textpart-mid"></div>
                                    <p style={{ border: "1px solid #dfdfdf" }}></p>
                                    <div className="textpart-lower">
                                        <div>
                                            <IoMdTime />
                                            05:09
                                        </div>
                                        <div>
                                            <FaCheckCircle className="cancel-icon" />
                                            Not Resolved
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => handleTextDoubt()}>
                                Ask Text Doubt
                            </button>
                        </div>
                    )}
                    {tabs?.doubt?.video && (
                        <div>
                            <div className="ask-doubt-videopart">
                                <img src={videopart} alt="videopart" />
                                <p>
                                    Please few minutes wait host to provide access to
                                    real-time Communication.
                                </p>
                            </div>
                            <button onClick={() => handleVideoDoubt()}>
                                Ask Video Doubt
                            </button>
                        </div>
                    )} */}
            {/* // </div > */}
          </div>
          {tabs?.doubt?.text && doubtsEnabled && (
            <div className="chat-end">
              <div className="doubt-input-box">
                {" "}
                <input
                  placeholder="Enter Your Doubt.."
                  className="ask-text-doubt"
                  type="text"
                  value={doubtText}
                  onChange={handleDoubtText}
                />
                <button
                  className="ask-doubt-button"
                  onClick={() => handleTextDoubt()}
                >
                  Ask Text Doubt
                </button>
              </div>
            </div>
          )}
          {tabs?.chat && (
            <div className="chat-end">
              <div className="input-box chat-input">
                <input
                  type="text"
                  placeholder="Enter Something..."
                  value={msg}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                />
                <div className="inputbox-icon">
                  {" "}
                  <MdOutlineEmojiEmotions className="emoji-icon" />
                  <LuSendHorizonal
                    onClick={handleSend}
                    className="chat-end-icon"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ChatContainer;
