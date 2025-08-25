import React, { useContext, useEffect, useState } from "react";
import "./QuizPage.css";
import QuizHeader from "../quiz_header/QuizHeader";
import { TfiMenuAlt } from "react-icons/tfi";
import { MdOutlineTimer } from "react-icons/md";
import engIcon from "../../../../../assets/english.png";
import quizLeft from "../../../../../assets/quizLeft.png";
import quizLeftActive from "../../../../../assets/leftArrowActive.png";
import quizRight from "../../../../../assets/quizRight.png";
import Wrapper from "../../../../../components/Wrapper/Wrapper";
import SubmitPopup from "./submit_popup/SubmitPopup";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CoursesData } from "../../../../../context/courses/Courses";
import QuizDetailPopup from "../../../../../components/QuizDetailsPopup/QuizDetailPopup";

const QuizPage = () => {
  //fetching quiz id from url
  const { quizId, batchSlug } = useParams();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === "I") {
        event.preventDefault();

        // Custom behavior here
      }
    };

    //stop accessing console
    document.addEventListener("contextmenu", (e) => e.preventDefault());

    document.onkeydown = (e) => {
      if (
        e.key === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i")) || // Ctrl+Shift+I, Ctrl+Shift+J
        (e.ctrlKey && e.key === 85) || // Ctrl+U
        (e.ctrlKey && e.shiftKey && e.key === 67)
      ) {
        // Ctrl+Shift+C

        e.preventDefault();
        return false;
      }
    };

    window.addEventListener("devtools-opened", () => {
      // alert('Developer tools are not allowed during the exam!');
      // Optionally log out the user or take other actions
      // window.location.href = '/logout';
    });

    window.addEventListener("devtools-closed", () => {
      // console.log("Developer tools closed");
    });

    // Attach the event listener
    // document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", (e) => e.preventDefault());
      window.removeEventListener("devtools-opened", (e) => e.preventDefault());
      window.removeEventListener("devtools-closed", (e) => e.preventDefault());
    };
  }, []);

  let devtools = { open: false, orientation: undefined };
  const threshold = 160;

  const emitEvent = (isOpen) => {
    window.dispatchEvent(
      new Event(isOpen ? "devtools-opened" : "devtools-closed")
    );
  };

  const detectDevTools = ({ emitEvents = true } = {}) => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    const orientation =
      window.innerWidth > window.innerHeight ? "horizontal" : "vertical";

    if (
      !(heightThreshold && widthThreshold) &&
      (widthThreshold || heightThreshold)
    ) {
      if (
        (!devtools.open || devtools.orientation !== orientation) &&
        emitEvents
      ) {
        emitEvent(true);
      }
      devtools.open = true;
      devtools.orientation = orientation;
    } else {
      if (devtools.open && emitEvents) {
        emitEvent(false);
      }
      devtools.open = false;
      devtools.orientation = undefined;
    }
  };

  setInterval(detectDevTools, 500);

  setInterval(() => {
    if (!document.fullscreenElement) {
      // openFullscreen()
      setIsFullScreen(false);
      // document.getElementById('full-screen').click()
      // alert('Please return to fullscreen mode to continue the exam.');
    } else {
      setIsFullScreen(true);
    }
  }, 1000);

  function goFullscreen() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
  }
  document.addEventListener("DOMContentLoaded", goFullscreen);

  function openFullscreen() {
    setIsFullScreen(true);
    var elem = document.getElementById("root");
    var doc = window.document;
    var elem = doc.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  const performAsyncAction = () => {
    // Simulate an asynchronous action
    return new Promise((resolve) => {
      setTimeout(() => {
        // console.log("Async action performed");
        resolve();
      }, 2000);
    });
  };
  const navigate = useNavigate();

  const deadline = "June, 6, 2024";

  //location state(duration)
  const location = useLocation();

  const [open, Isopen] = useState(false);

  const showpopup = () => {
    Isopen(!open);
  };

  //api-context
  const { getQuestionsByQuizId, particularQuizQuestions, attemptQuiz } =
    useContext(CoursesData);

  useEffect(() => {
    if (quizId) {
      getQuestionsByQuizId(quizId);
    }
    if (localStorage?.getItem("reloadquiz-data")) {
      localStorage.setItem('index', 1)
      navigate("/learning/my-courses");
    }
  }, [quizId]);

  //answer-response
  const [ans_res, setAnsRes] = useState([]);

  useEffect(() => {
    if (particularQuizQuestions) {
      setAnsRes(() =>
        particularQuizQuestions?.map((i, index) => {
          return {
            [index + 1]: "",
          };
        })
      );
    }
  }, [particularQuizQuestions]);

  //cuurent question
  const [currentQuestion, setCurrentQuestion] = useState(1);

  //current language
  const [currentLanguage, setCurrentLanguage] = useState("e");

  //sorting array
  const sortByNumericKey = (array) => {
    return array.sort((a, b) => {
      // Extract keys from the objects (assuming each object has only one key)
      const keyA = Object.keys(a)[0];
      const keyB = Object.keys(b)[0];

      // Convert keys to numbers and compare them
      return Number(keyA) - Number(keyB);
    });
  };

  //setting answer
  const settingAnswer = (ans) => {
    let helper = [];
    for (let j = 0; j < ans_res?.length; j++) {
      for (const [key, val] of Object.entries(ans_res[j])) {
        if (key != currentQuestion) {
          helper.push(ans_res[j]);
        }
      }
    }

    let helper2 = [...helper, { [currentQuestion]: ans }];
    const sortedArray = sortByNumericKey(helper2);

    setAnsRes(sortedArray);
  };

  const [currentValueOfQuestion, setCurrentValueOfQuestion] = useState("");

  useEffect(() => {
    for (let j = 0; j < ans_res?.length; j++) {
      for (const [key, val] of Object.entries(ans_res[j])) {
        if (key == currentQuestion) {
          setCurrentValueOfQuestion(val);
        }
      }
    }
  }, [currentQuestion, ans_res]);

  const convertMinutesToTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes, seconds: 0 };
  };

  const [time, setTime] = useState(() =>
    convertMinutesToTime(location?.state?.duration)
  );

  useEffect(() => {
    const countdown = setInterval(() => {
      setTime((prevTime) => {
        const totalSeconds =
          prevTime.hours * 3600 + prevTime.minutes * 60 + prevTime.seconds;
        if (totalSeconds <= 0) {
          clearInterval(countdown);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        const nextTotalSeconds = totalSeconds - 1;
        return {
          hours: Math.floor(nextTotalSeconds / 3600),
          minutes: Math.floor((nextTotalSeconds % 3600) / 60),
          seconds: nextTotalSeconds % 60,
        };
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  //automatically-submit
  useEffect(() => {
    if (time?.seconds == 0 && time?.minutes == 0 && time?.hours == 0) {
      document?.getElementById("submit-quiz")?.click();
      attemptQuiz({ quizId: quizId, timeLeft: 0, ans_res: ans_res });
    }
  }, [time]);

  //clear option
  const handleClearOption = () => {
    settingAnswer("");
  };

  //preventing full screen off
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        // onEscape();
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [isFullScreen, setIsFullScreen] = useState(false);
  //refersh confirmation
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Cancel the page reload event
      event.preventDefault();
      // Prompt the user for confirmation
      const confirmationMessage = "Are you sure you want to reload the page?";
      event.returnValue = confirmationMessage; // Standard for most browsers
      return confirmationMessage; // Required for legacy browsers
    };

    const handleUnload = () => {
      // performAsyncAction().then(() => {
      //   attemptQuiz({ quizId: quizId, timeLeft: time?.minutes, ans_res: ans_res })

      //   console.log('Async action completed');
      // });
      // Action to perform when the page is reloaded after confirmation

      let data = { quizId: quizId, timeLeft: time?.minutes, ans_res: ans_res };
      localStorage?.setItem("reloadquiz-data", JSON.stringify(data));
      console.log("Page reloaded after confirmation");
    };

    // Attach event listeners
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, [ans_res]);

  //exit full screen
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }

  return (
    <>
      {!isFullScreen ? (
        <div className="modal-full-screen">
          {" "}
          <button id="full-screen" onClick={() => openFullscreen()}>
            Go Full screen
          </button>
        </div>
      ) : (
        <div className="quiz_page_wrapper">
          <QuizHeader
            batchSlug={batchSlug}
            from="quiz"
            closeFullscreen={closeFullscreen}
            quizId={quizId}
            timeLeft={time?.minutes}
            ans_res={ans_res}
          />

          <Wrapper>
            <div className="quiz_page_container">
              <div className="quiz_page_upper">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  {" "}
                  <TfiMenuAlt
                    className="quiz-page-icon"
                    onClick={showpopup}
                    style={{ cursor: "pointer" }}
                  />{" "}
                  {open && (
                    <QuizDetailPopup
                      setCurrentQuestion={setCurrentQuestion}
                      currentQuestion={setCurrentQuestion}
                      ans_res={ans_res}
                      showpopup={showpopup}
                    />
                  )}
                  <p>{particularQuizQuestions?.length} Questions :</p>
                </div>

                <div className="quiz-timer">
                  <MdOutlineTimer className="quiz-page-icon" />
                  <p>
                    {`${time.hours.toString().padStart(2, "0")}:${time.minutes
                      .toString()
                      .padStart(2, "0")}:${time.seconds
                        .toString()
                        .padStart(2, "0")}`}
                  </p>
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (currentLanguage == "e") {
                      setCurrentLanguage("h");
                    } else {
                      setCurrentLanguage("e");
                    }
                  }}
                >
                  {currentLanguage == "e" ? (
                    <img src={engIcon} alt="english" />
                  ) : (
                    // ""
                    <p className="hindi-symbol">अ</p>
                  )}
                </div>
              </div>

              <div className="quiz_page_mid">
                <div className="quiz_option_number">
                  {currentQuestion == 1 ? (
                    <img src={quizLeft} alt="rightrow" onClick={() => { }} />
                  ) : (
                    <img
                      src={quizLeftActive}
                      alt="left-arrow-quiz"
                      onClick={() => {
                        if (currentQuestion > 1) {
                          setCurrentQuestion(currentQuestion - 1);
                        }
                      }}
                      className="quiz-arrow left-arrow-quiz"
                    />
                  )}

                  <div>
                    {" "}
                    {particularQuizQuestions?.map((item, index) => {
                      return (
                        <p
                          onClick={() => setCurrentQuestion(index + 1)}
                          style={{
                            background:
                              currentQuestion == index + 1 && "#ae3cf5",
                            color: currentQuestion == index + 1 && "#fff",
                          }}
                        >
                          {index + 1}
                        </p>
                      );
                    })}
                  </div>

                  <img
                    src={quizRight}
                    alt="right-arrow-quiz"
                    onClick={() => {
                      if (currentQuestion < particularQuizQuestions?.length) {
                        setCurrentQuestion(currentQuestion + 1);
                      }
                    }}
                    className="quiz-arrow right-arrow-quiz"
                  />
                </div>

                <div className="quiz_ques_ans">
                  <h3 className="quiz_question">
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          particularQuizQuestions?.length > 0
                            ? currentLanguage == "e"
                              ? particularQuizQuestions[currentQuestion - 1]
                                ?.question_title?.e
                              : particularQuizQuestions[currentQuestion - 1]
                                ?.question_title?.h
                            : "",
                      }}
                    />
                  </h3>

                  <div className="quiz_options">
                    {/* {particularQuizQuestions?.length > 0 && particularQuizQuestions[currentQuestion - 1]?.map((item, index) => {
                    return (<> */}
                    <div
                      className="tick_box"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        document.getElementById("option1").checked = true;
                        settingAnswer("1");
                      }}
                    >
                      <input
                        type="radio"
                        id="option1"
                        checked={currentValueOfQuestion == 1}
                        onChange={() => {
                          settingAnswer("1");
                        }}
                        name={`answer-res-${currentQuestion - 1}`}
                        value="1"
                      />
                      <p>
                        {particularQuizQuestions?.length > 0
                          ? currentLanguage == "e"
                            ? particularQuizQuestions[currentQuestion - 1]
                              ?.option1?.e
                            : particularQuizQuestions[currentQuestion - 1]
                              ?.option1?.h
                          : ""}
                      </p>
                    </div>
                    <div
                      className="tick_box"
                      onClick={() => {
                        document.getElementById("option2").checked = true;
                        settingAnswer("2");
                      }}
                    >
                      <input
                        type="radio"
                        id="option2"
                        checked={currentValueOfQuestion == 2}
                        onChange={() => {
                          settingAnswer("2");
                        }}
                        name={`answer-res-${currentQuestion - 1}`}
                        value="2"
                      />
                      <p>
                        {particularQuizQuestions?.length > 0
                          ? currentLanguage == "e"
                            ? particularQuizQuestions[currentQuestion - 1]
                              ?.option2?.e
                            : particularQuizQuestions[currentQuestion - 1]
                              ?.option2?.h
                          : ""}
                      </p>
                    </div>
                    <div
                      className="tick_box"
                      onClick={() => {
                        document.getElementById("option3").checked = true;
                        settingAnswer("3");
                      }}
                    >
                      <input
                        type="radio"
                        id="option3"
                        checked={currentValueOfQuestion == 3}
                        onChange={() => {
                          settingAnswer("3");
                        }}
                        name={`answer-res-${currentQuestion - 1}`}
                        value="3"
                      />
                      <p>
                        {particularQuizQuestions?.length > 0
                          ? currentLanguage == "e"
                            ? particularQuizQuestions[currentQuestion - 1]
                              ?.option3?.e
                            : particularQuizQuestions[currentQuestion - 1]
                              ?.option3?.h
                          : ""}
                      </p>
                    </div>
                    <div
                      className="tick_box"
                      onClick={() => {
                        document.getElementById("option4").checked = true;
                        settingAnswer("4");
                      }}
                    >
                      <input
                        type="radio"
                        id="option4"
                        checked={currentValueOfQuestion == 4}
                        name={`answer-res-${currentQuestion - 1}`}
                        onChange={() => {
                          settingAnswer("4");
                        }}
                        value="4"
                      />
                      <p>
                        {particularQuizQuestions?.length > 0
                          ? currentLanguage == "e"
                            ? particularQuizQuestions[currentQuestion - 1]
                              ?.option4?.e
                            : particularQuizQuestions[currentQuestion - 1]
                              ?.option4?.h
                          : ""}
                      </p>
                    </div>
                    {/* </>) */}
                    {/* })} */}
                  </div>
                  <div className="quiz_clear_option">
                    <button onClick={() => handleClearOption()}>
                      {" "}
                      Clear Option
                    </button>
                  </div>
                </div>
              </div>
              <p style={{ border: "1px solid gray", marginTop: "2rem" }}></p>
              <div className="quiz_page_lower">
                <div
                  className="arrow_btn_div"
                  style={{}}
                  onClick={() => {
                    if (currentQuestion > 1) {
                      setCurrentQuestion(currentQuestion - 1);
                    }
                  }}
                >
                  {currentQuestion == 1 ? (
                    <img src={quizLeft} alt="quizicon" />
                  ) : (
                    <img src={quizLeftActive} alt="quizicon" />
                  )}

                  <p>Previous</p>
                </div>
                <div>
                  <SubmitPopup
                    batchSlug={batchSlug}
                    ans_res={ans_res}
                    attemptQuiz={attemptQuiz}
                    quizId={quizId}
                    timeLeft={time?.minutes}
                  />
                </div>
                <div
                  className="arrow_btn_div"
                  onClick={() => {
                    if (currentQuestion < particularQuizQuestions?.length) {
                      setCurrentQuestion(currentQuestion + 1);
                    }
                  }}
                >
                  <p>Next</p>
                  <img src={quizRight} alt="quizicon" />
                </div>
              </div>
            </div>
          </Wrapper>
        </div>
      )}
    </>
  );
};

export default QuizPage;
