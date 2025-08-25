import React, { useContext, useEffect, useState } from "react";
import "./QuizDescription.css";
import Wrapper from "../../../../../components/Wrapper/Wrapper";
import quizIcon from "../../../../../assets/quizicon.png";
import quizTimer from "../../../../../assets/quiztimer.png";
import QuizHeader from "../quiz_header/QuizHeader";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { CoursesData } from "../../../../../context/courses/Courses";

const QuizDescription = () => {
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
      // console.log('Developer tools closed');
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
      // Action to perform when the page is reloaded after confirmation
      // console.log('Page reloaded after confirmation');
    };

    // Attach event listeners
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);
  //full-screen
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

  useEffect(() => {
    if (!document.fullscreenElement) {
      // openFullscreen();
    } else {
      // console.log('Ide')
      // closeFullscreen();
    }
  }, [document.fullscreenElement]);

  //preventing full screen off
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" || event.key === "Esc") {
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

  //useNavigate
  const navigate = useNavigate();

  //api-context
  const { getQuizById, particularQuizDetails } = useContext(CoursesData);

  useEffect(() => {
    if (quizId) {
      getQuizById(quizId);
    }
  }, [quizId]);

  const [isFullScreen, setIsFullScreen] = useState(false);
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
        <div className="quiz_desctip_wrapper" id="quiz">
          <QuizHeader
            title={particularQuizDetails?.quiz_title}
            closeFullscreen={closeFullscreen}
            batchSlug={batchSlug}
          />

          <Wrapper>
            <div className="quiz_descrip_container">
              <img src={particularQuizDetails?.quiz_banner} alt="banner" />

              <div className="quiz_descrip">
                <h3 className="quiz_box_title">
                  {" "}
                  {particularQuizDetails?.quiz_title}
                </h3>
                <p style={{ border: "1px solid gray" }}></p>
                <div className="quiz_descrip_mid">
                  {/* <p>
                  Price: 1999 (5,000)Start Date : 27 Nov 2023
                  <p> Duration : 3 Months</p> <p>Batch Details:</p>
                  <ol>
                    <li>
                      The Batch is Completely based on the syllabus of
                      Chandigarh JBT PRT 2023.
                    </li>
                    <li>
                      {" "}
                      The best faculties in India will cover the full syllabus
                      of each subject General Awareness Reasoning Ability
                      Arithmetical and Numerical Ability
                    </li>
                    <li>
                      Teaching Aptitude Information & Communication Technology
                      (ICT) Test of Punjabi Language and Comprehension Test{" "}
                    </li>
                    <li>
                      {" "}
                      of Hindi Language and Comprehension Test of English
                      Language and Comprehension Mathematics
                    </li>
                    <li> General Science Social Science.</li>
                    <li>
                      All the classes will be live only on our SD Campus App
                      In-depth explanation of all the topics.
                    </li>
                    <li>
                      {" "}
                      Classes will be held 6 days a week, each class duration
                      will be 1 hour Class notes will be uploaded on the
                    </li>
                    <li> SD Campus App in the batch in PDF Format. </li>
                    <li>
                      {" "}
                      Chapter Wise Practice Sheet Will be provided at the end of
                      the chapter Classes will start from 28 Nov 2023
                    </li>
                    <li>
                      The syllabus will be completed by 15 Feb 202$ Weekly Doubt
                      Session will be held on SD Campus Application
                    </li>
                    <li>
                      {" "}
                      Regular test will held in the SD Campus App Daily Practice
                      Problem will be provided Price: 1999 (5,000)Start Date :
                      27 Nov 2023 Duration : 3 Months Batch Details:{" "}
                    </li>
                    <li>
                      {" "}
                      The Batch is Completely based on the syllabus of
                      Chandigarh JBT PRT 2023.
                    </li>
                    <li>
                      {" "}
                      The best faculties in India will cover the full syllabus
                      of each subject General Awareness{" "}
                    </li>
                    <li>
                      Reasoning Ability Arithmetical and Numerical Ability
                      Teaching Aptitude Information & Communication Technology
                      (ICT)
                    </li>
                    <li>
                      {" "}
                      Test of Punjabi Language and Comprehension Test of Hindi
                      Language and Comprehension{" "}
                    </li>
                    <li>
                      Test of English Language and Comprehension Mathematics
                      General Science Social Science.
                    </li>
                    <li>
                      All the classes will be live only on our SD Campus App
                      In-depth explanation of all the topics.
                    </li>
                    <li>
                      {" "}
                      Classes will be held 6 days a week, each class duration
                      will be 1 hour Class notes will be uploaded on the SD
                      Campus App in the batch in PDF Format.
                    </li>
                    <li>
                      Chapter Wise Practice Sheet Will be provided at the end of
                      the chapter
                    </li>
                    <li>
                      {" "}
                      Classes will start from 28 Nov 2023 The syllabus will be
                      completed by 15 Feb 202$
                    </li>
                    <li>
                      {" "}
                      Weekly Doubt Session will be held on SD Campus Application
                      Regular
                    </li>
                    <li>
                      {" "}
                      test will held in the SD Campus App Daily Practice Problem
                      will be provided
                    </li>
                  </ol>
                </p> */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: particularQuizDetails?.quiz_desc,
                    }}
                  />
                </div>

                <p style={{ border: "1px solid gray" }}></p>
                <div className="quiz_lower">
                  <div className="quiz_lower_left">
                    <div className="quiz_lower_left_box">
                      <img src={quizIcon} alt="quiz" />
                      <p>{particularQuizDetails?.no_ques} Questions</p>
                    </div>
                    <div className="quiz_lower_left_box">
                      {" "}
                      <img src={quizTimer} alt="quiz" />
                      <p>{particularQuizDetails?.quiz_duration} Mins</p>
                    </div>
                    <div className="quiz_lower_left_box">
                      {" "}
                      <img src={quizTimer} alt="quiz" />
                      <p>
                        {particularQuizDetails?.negativeMarks} Negative Marks
                      </p>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      navigate(`/quiz-page/${quizId}/${batchSlug}`, {
                        state: {
                          duration: particularQuizDetails?.quiz_duration,
                        },
                      });
                      // attemptQuiz({ quizId: quizId, timeLeft: timeLeft, ans_res: ans_res })
                    }}
                  >
                    <div className="quiz_lower_right">
                      <button>Continue</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Wrapper>
        </div>
      )}
    </>
  );
};

export default QuizDescription;
