import React, { useContext, useEffect, useState } from "react";
import "./AfterSubmit.css";
import QuizHeader from "../../quiz_header/QuizHeader";
import Wrapper from "../../../../../../components/Wrapper/Wrapper";
import hourglass from "../../../../../../assets/hourglass.png";
import { useLocation, useParams } from "react-router-dom";
import { CoursesData } from "../../../../../../context/courses/Courses";
import QuizResult from "../../../result/QuizResult";
import { CircularProgress } from "@mui/material";

const AfterSubmit = () => {
  const { quizId, batchSlug } = useParams();

  //location state data
  const location = useLocation();

  //fetching result
  const { getQuizResult, quizResult } = useContext(CoursesData);

  //call
  useEffect(() => {
    if (quizId) {
      getQuizResult({ quizId: quizId, attemptId: "" });
    }
  }, [quizId]);

  function closeFullscreen() {
    if (document.fullscreenElement) {
      if (document?.exitFullscreen) {
        document?.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document?.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document?.msExitFullscreen();
      }
    }
  }
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (quizResult) {
      setLoading(false)
    }
  }, [quizResult])
  return (
    <>
      <div className="aftersubmit_wrapper">
        <QuizHeader closeFullscreen={closeFullscreen} from="quiz-result" batchSlug={batchSlug} />

        <Wrapper>
          {loading ? <div style={{ display: 'flex', width: '100%', height: '70vh', alignItems: 'center', justifyContent: 'center' }}><CircularProgress /></div> : (quizResult?.is_published ? (
            <QuizResult quizResult={quizResult} />
          ) : (
            <div className="aftersubmit_container">
              <div className="submit_box_mid">
                <div>
                  <p className="number_circle total">
                    {quizResult?.summary?.noOfQues}
                  </p>
                  <p className="total_text">Total</p>
                </div>
                <div>
                  {" "}
                  <p className="number_circle attempt">
                    {quizResult?.summary?.Attempted}
                  </p>
                  <p className="attempt_text">Attempted</p>
                </div>
                <div>
                  {" "}
                  <p className="number_circle skip">
                    {quizResult?.summary?.noOfQues -
                      quizResult?.summary?.Attempted}
                  </p>
                  <p className="skip_text">Skipped</p>
                </div>
              </div>

              <div className="aftersubmit_lower">
                <img src={hourglass} alt="" />
                <p>Waiting for the result....</p>
                <p>Your result yet to publish.</p>
              </div>
            </div>
          ))}
        </Wrapper>
      </div>
    </>
  );
};

export default AfterSubmit;
