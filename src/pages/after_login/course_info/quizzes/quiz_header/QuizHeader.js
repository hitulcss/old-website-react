import React, { useContext } from "react";
import "./QuizHeader.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import Wrapper from "../../../../../components/Wrapper/Wrapper";
import { CoursesData } from "../../../../../context/courses/Courses";

const QuizHeader = ({ title, closeFullscreen, from, ans_res, quizId, timeLeft, batchSlug }) => {
  const { attemptQuiz } = useContext(CoursesData)
  const navigate = useNavigate()
  return (
    <>
      <div className="quiz_header">
        <Wrapper>
          <div onClick={() => navigate((from == 'quiz' ? `/learning/my-courses/c/${batchSlug}` : from == 'quiz-result' ? `/learning/my-courses/c/${batchSlug}` : -1), {
            state: {
              test: true
            }
          })} >
            <FaArrowLeftLong className="arrow_icon_quiz" onClick={() => {
              closeFullscreen()
              if (from == 'quiz') {
                attemptQuiz({ quizId: quizId, timeLeft: timeLeft, ans_res: ans_res })
              }



            }} />
          </div>
          <h2>{title}</h2>
        </Wrapper>
      </div>
    </>
  );
};

export default QuizHeader;
