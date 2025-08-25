import pencil from "../../../../../../assets/pencil.png";
import notepad from "../../../../../../assets/notepad.png";
import correct from "../../../../../../assets/correct.png";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useState } from "react";

const QuizQuestion = ({ currentLanguage, currentQuestion, quizResult }) => {


  const [explanation, setExplanation] = useState(false)
  return (
    <>
      <div className="summary_ques_box">
        <div className="ques_upper">
          <div
            dangerouslySetInnerHTML={{
              __html:
                currentLanguage == "e"
                  ? quizResult?.response[currentQuestion - 1]?.question_title?.e
                  : quizResult?.response[currentQuestion - 1]?.question_title
                    ?.h,
            }}
          />
        </div>
        <div className="ques_mid">
          <div
            style={{
              border:
                quizResult?.response[currentQuestion - 1]?.correctOption == '1' ? '2px solid green' : quizResult?.response[currentQuestion - 1]?.myAnswer == '1' ? '2px solid red' : ''
            }}
          >
            <input
              type="radio"
              disabled
              checked={
                parseInt(quizResult?.response[currentQuestion - 1]?.myAnswer) ==
                1
              }
            />
            {currentLanguage == "e"
              ? quizResult?.response[currentQuestion - 1]?.option1?.e
              : quizResult?.response[currentQuestion - 1]?.option1?.h}
          </div>
          <div
            style={{
              border:
                quizResult?.response[currentQuestion - 1]?.correctOption == '2' ? '2px solid green' : quizResult?.response[currentQuestion - 1]?.myAnswer == '2' ? '2px solid red' : ''
            }}
          >
            {" "}
            <input
              type="radio"
              disabled
              checked={
                parseInt(quizResult?.response[currentQuestion - 1]?.myAnswer) ==
                2
              }
            />
            {currentLanguage == "e"
              ? quizResult?.response[currentQuestion - 1]?.option2?.e
              : quizResult?.response[currentQuestion - 1]?.option2?.h}
          </div>
          <div
            style={{
              border:
                quizResult?.response[currentQuestion - 1]?.correctOption == '3' ? '2px solid green' : quizResult?.response[currentQuestion - 1]?.myAnswer == '3' ? '2px solid red' : ''
            }}
          >
            {" "}
            <input
              type="radio"
              disabled
              checked={
                parseInt(quizResult?.response[currentQuestion - 1]?.myAnswer) ==
                3
              }
            />
            {currentLanguage == "e"
              ? quizResult?.response[currentQuestion - 1]?.option3?.e
              : quizResult?.response[currentQuestion - 1]?.option3?.h}
          </div>
          <div
            style={{
              border:
                quizResult?.response[currentQuestion - 1]?.correctOption == '4' ? '2px solid green' : quizResult?.response[currentQuestion - 1]?.myAnswer == '4' ? '2px solid red' : ''
            }}
          >
            {" "}
            <input
              type="radio"
              disabled
              checked={
                parseInt(quizResult?.response[currentQuestion - 1]?.myAnswer) ==
                4
              }
            />
            {currentLanguage == "e"
              ? quizResult?.response[currentQuestion - 1]?.option4?.e
              : quizResult?.response[currentQuestion - 1]?.option4?.h}
          </div>
        </div>
        <p style={{ border: "1px solid #dfdfdf" }}></p>
        <div className="ques_lower">
          <div>
            <img src={pencil} alt="" />
            <p>
              Your Answer :{" "}
              <span>
                {" "}
                {quizResult?.response[currentQuestion - 1]?.myAnswer == 1 &&
                  "A"}
                {quizResult?.response[currentQuestion - 1]?.myAnswer == 2 &&
                  "B"}
                {quizResult?.response[currentQuestion - 1]?.myAnswer == 3 &&
                  "C"}
                {quizResult?.response[currentQuestion - 1]?.myAnswer == 4 &&
                  "D"}
                {(quizResult?.response[currentQuestion - 1]?.myAnswer == "" ||
                  !quizResult?.response[currentQuestion - 1]?.myAnswer) &&
                  "-"}
              </span>
            </p>
          </div>
          <div>
            {" "}
            <img src={correct} alt="" />
            <p>
              Correct Answer :{" "}
              <span>
                {" "}
                {quizResult?.response[currentQuestion - 1]?.correctOption ==
                  1 && "A"}
                {quizResult?.response[currentQuestion - 1]?.correctOption ==
                  2 && "B"}
                {quizResult?.response[currentQuestion - 1]?.correctOption ==
                  3 && "C"}
                {quizResult?.response[currentQuestion - 1]?.correctOption ==
                  4 && "D"}
              </span>
            </p>
          </div>
          <div>
            {" "}
            <img src={notepad} alt="" />
            <p onClick={() => {
              setExplanation(!explanation)
            }}>
              Explanation {explanation ? <FaAngleUp /> : <FaAngleDown />}
            </p>
          </div>
        </div>
        {explanation && < div > {currentLanguage == 'e' ? quizResult?.response[currentQuestion - 1]?.answer?.e : quizResult?.response[currentQuestion - 1]?.answer?.h}</div>}
      </div >
    </>
  );
};

export default QuizQuestion;
