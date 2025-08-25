import React, { useContext, useEffect } from "react";
import "./Quizzes.css";
import Wrapper from "../../../../components/Wrapper/Wrapper";
import { NavLink, useParams } from "react-router-dom";
import { CoursesData } from "../../../../context/courses/Courses";
import { useNavigate } from "react-router-dom";
import LockPopupModal from "../../after_login_course_detail/lock-popup/LockPopup";
import { TfiMenuAlt } from "react-icons/tfi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

const Quizzes = ({
  batchId,
  prePurchase,
  setLockModal,
  lockModal,
  course,
  selectedValidity,
}) => {
  //slug of batch
  const { slug } = useParams();

  const {
    getQuizByBatch,
    quizDetails,
    getQuizDetailsOfBatchIdPrePurchase,
    quizDetailsOfBatchPrepurchase,
  } = useContext(CoursesData);
  useEffect(() => {
    if (prePurchase) {
      getQuizDetailsOfBatchIdPrePurchase(batchId);
    } else {
      getQuizByBatch(batchId);
    }
  }, [prePurchase]);
  const navigate = useNavigate();
  if (!localStorage.getItem("isLoggedIn")) {
    navigate(`/login?source=${window?.location?.href}`);
  }

  function formatDateTime(dateString) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Parse the date string into a Date object
    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("-").map(Number);
    const [hours, minutes] = timePart.split(":").map(Number);

    const date = new Date(year, month - 1, day, hours, minutes);

    // Format the output
    const formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${
      date.getHours() % 12 || 12
    }:${date.getMinutes().toString().padStart(2, "0")} ${
      date.getHours() >= 12 ? "PM" : "AM"
    }`;

    return formattedDate;
  }

  function isCurrentTimeGreaterThan(givenDateTime) {
    // Parse the given date-time string
    const [datePart, timePart] = givenDateTime.split(" ");
    const [day, month, year] = datePart.split("-").map(Number);
    const [hours, minutes, seconds] = timePart.split(":").map(Number);

    // Create a Date object for the given date-time
    const givenDate = new Date(year, month - 1, day, hours, minutes, seconds);

    // Get the current date and time
    const currentDate = new Date();

    // Compare the two dates
    return currentDate >= givenDate;
  }

  const handleQuizStart = (item) => {
    if (isCurrentTimeGreaterThan(item?.quiz_created_at)) {
      navigate(`/quiz-description/${item?.id}/${slug}`);
    } else {
      toast.dismiss();
      toast.error(
        `Quiz will start at ${formatDateTime(item?.quiz_created_at)}`
      );
    }
  };

  return (
    <>
      <Toaster />
      <div className="quiz_wrapper">
        {prePurchase && (
          <LockPopupModal
            setLockModal={setLockModal}
            lockModal={lockModal}
            text="Community"
            selectedValidity={selectedValidity}
            course={course}
          />
        )}
        <Wrapper>
          <div className="non-attemped">
            {" "}
            <h1 className="quiz_title">All Quizes</h1>
            <p style={{ border: "1px solid #efefef" }}></p>
            <div className="quiz_container">
              {(prePurchase
                ? quizDetailsOfBatchPrepurchase?.not_attempted
                : quizDetails?.not_attempted
              )?.length > 0
                ? (prePurchase
                    ? quizDetailsOfBatchPrepurchase?.not_attempted
                    : quizDetails?.not_attempted
                  )?.map((item, index) => (
                    <div className="quiz_box" key={index}>
                      {" "}
                      {/* <p className="live_quiz">
                            {" "}
                            <span style={{ fontSize: "1rem" }}>•</span> LIVE
                            TEST
                          </p> */}
                      {/* <p
                            dangerouslySetInnerHTML={{
                              __html: item?.quiz_desc,
                            }}
                          ></p> */}
                      <div className="quizz_upper">
                        <p>
                          <TfiMenuAlt className="quiz-icon" />
                          <span>{item?.no_ques} Questions</span>
                        </p>
                        <p>
                          <IoMdCheckmarkCircleOutline className="quiz-icon" />
                          <span>
                            {item?.eachQueMarks * item?.no_ques} Marks
                          </span>
                        </p>
                        <p>
                          <IoTimeOutline className="quiz-icon" />
                          <span>{item?.quiz_duration} Min</span>
                        </p>
                      </div>
                      <div className="quiz_start">
                        Start on :{" "}
                        <span>
                          <span
                            style={{
                              background: "rgba(246, 248, 249, 1)",
                              borderRadius: "2px 0 0 2px",
                            }}
                          >
                            {
                              formatDateTime(item?.quiz_created_at)?.split(
                                " "
                              )[0]
                            }{" "}
                            {
                              formatDateTime(item?.quiz_created_at)?.split(
                                " "
                              )[1]
                            }
                          </span>
                          <span
                            style={{
                              background: "rgb(242, 236, 255)",
                              borderRadius: "0 2px 2px 0",
                            }}
                          >
                            {
                              formatDateTime(item?.quiz_created_at)?.split(
                                " "
                              )[2]
                            }{" "}
                            {
                              formatDateTime(item?.quiz_created_at)?.split(
                                " "
                              )[3]
                            }
                          </span>
                        </span>
                      </div>
                      <div className="quizz_lower">
                        {/* <p>
                        <strong>Medium :</strong>{" "}
                        {item?.language === "en"
                          ? "English"
                          : item?.language === "hi"
                          ? "Hindi"
                          : "Bilingual"}
                      </p> */}

                        <h4>{item?.quiz_title}</h4>

                        <a
                        // to={`/quiz-description/${item?.id}/${slug}`}
                        // to="https://play.google.com/store/apps/details?id=com.sdcampus.app&hl=en_IN&gl=US"
                        >
                          <button
                            onClick={() => {
                              handleQuizStart(item);
                            }}
                            // navigate(`/quiz-page/${item?._id}`)}
                          >
                            Start Test
                          </button>
                        </a>
                      </div>
                    </div>
                  ))
                : "No Quizzes Found"}
            </div>
          </div>

          {!prePurchase && quizDetails?.is_attempted?.length > 0 && (
            <div className="attempted-quiz">
              <h2 className="quiz_title" style={{ marginTop: "2rem" }}>
                Attempted Quiz
              </h2>
              <div className="quiz_container">
                {quizDetails?.is_attempted?.map((item, index) => (
                  <div className="quiz_box" key={index}>
                    {" "}
                    {/* <p className="live_quiz">
                         {" "}
                         <span style={{ fontSize: "1rem" }}>•</span> LIVE
                         TEST
                       </p> */}
                    {/* <p
                         dangerouslySetInnerHTML={{
                           __html: item?.quiz_desc,
                         }}
                       ></p> */}
                    <div className="quizz_upper">
                      <p>
                        <TfiMenuAlt className="quiz-icon" />
                        <span>{item?.no_ques} Questions</span>
                      </p>
                      <p>
                        <IoMdCheckmarkCircleOutline className="quiz-icon" />
                        <span>{item?.eachQueMarks * item?.no_ques} Marks</span>
                      </p>
                      <p>
                        <IoTimeOutline className="quiz-icon" />
                        <span>{item?.quiz_duration} Min</span>
                      </p>
                    </div>
                    <div className="quizz_lower">
                      {/* <p>
                     <strong>Medium :</strong>{" "}
                     {item?.language === "en"
                       ? "English"
                       : item?.language === "hi"
                       ? "Hindi"
                       : "Bilingual"}
                   </p> */}

                      <h4>{item?.quiz_title}</h4>
                      {/* <p>
                     <strong>StartAt :</strong> {item?.quiz_created_at}
                   </p>
                   <p>
                     <strong>Negative Marking :</strong>{" "}
                     {item?.is_negative == true ? item?.negativeMarks : "No"}
                   </p> */}

                      <NavLink
                        to={`/quiz-result/${item?.id}/${slug}`}
                        // to="https://play.google.com/store/apps/details?id=com.sdcampus.app&hl=en_IN&gl=US"
                      >
                        <button
                        // onClick={() => navigate(`/quiz-page/${item?._id}`)}
                        >
                          Result
                        </button>
                      </NavLink>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Wrapper>
      </div>
    </>
  );
};

export default Quizzes;
