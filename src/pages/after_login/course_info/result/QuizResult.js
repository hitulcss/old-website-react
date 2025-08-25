import React from "react";
import "./QuizResult.css";
import QuizHeader from "../quizzes/quiz_header/QuizHeader";
import Wrapper from "../../../../components/Wrapper/Wrapper";
import ResultTabs from "./quiz_result_tabs/ResultTabs";

const QuizResult = ({ quizResult }) => {
  return (
    <>
      <div className="quiz_result_wrapper">
        {/* <QuizHeader /> */}

        <Wrapper>
          <div className="quiz_result_container">
            <div className="result_tabs">
              {" "}
              <ResultTabs quizResult={quizResult} />
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default QuizResult;
