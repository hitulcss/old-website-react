import React, { useEffect, useState } from "react";
import "./Summary.css";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import performance from "../../../../../../assets/performance.png";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import QuizQuestion from "../components/QuizQuestion";

// const data = [{ value: 5 }, { value: 10 }, { value: 15 }];

const size = {
  width: 400,
  height: 200,
};

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const Summary = ({ quizResult }) => {
  const percentage = 66;

  const handleChange = (event, value) => {
    setCurrentQuestion(value);
  };

  //question-handling
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [currentLanguage, setCurrentLanguage] = useState("e");
  const [data, setData1] = useState([
    { value: 25 },
    { value: 25 },
    { value: 25 },
    { value: 25 },
  ]);

  useEffect(() => {
    if (quizResult) {
      setData1([
        { value: quizResult?.summary?.correctAns },
        { value: quizResult?.summary?.Attempted },
        { value: quizResult?.summary?.wrongAnswers },
        { value: quizResult?.summary?.skipped },
      ]);
    }
  }, [quizResult]);

  return (
    <>
      <div className="summary_container">
        <div className="summary_upper">
          <div className="summary_upper_left">
            <div className="quiz_performance">
              <h2>
                <img src={performance} alt="img" />
                Quiz Performance
              </h2>
              <p style={{ border: "1px solid #dfdfdf" }}></p>
              <div className="pie_chart">
                {" "}
                <div>
                  <div className="circular-container">
                    {" "}
                    <CircularProgressbar
                      value={Math.floor(quizResult?.myScore?.number)}
                      text={`${Math.floor(quizResult?.myScore?.number)}`}
                    />
                  </div>{" "}
                  <h3>
                    {Math.floor(quizResult?.myScore?.number)} /{" "}
                    {Math.floor(quizResult?.totalMarks)}
                  </h3>
                </div>
                <div>
                  <div className="circular-container">
                    {" "}
                    <CircularProgressbar
                      value={quizResult?.accuracy?.percentage * 100}
                      text={`${quizResult?.accuracy?.percentage * 100} %`}
                      maxValue={50}
                    />
                  </div>
                  <h3>Accuracy</h3>
                </div>
                <div>
                  <div className="circular-container">
                    {" "}
                    <CircularProgressbar
                      value={quizResult?.toperScore?.percentage * 100}
                      text={`${quizResult?.toperScore?.percentage * 100} %`}
                    />
                  </div>
                  <h3>Topper's Score</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="summary_upper_right">
            <div className="quiz_performance2">
              <div className="pie_chart2">
                {" "}
                {data && (
                  <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
                    <PieCenterLabel>Correctness</PieCenterLabel>
                  </PieChart>
                )}
              </div>

              <p style={{ border: "1px solid #dfdfdf" }}></p>

              <div className="result_details">
                <div>
                  <p className="result_total quiz-detail-box">
                    {quizResult?.summary?.noOfQues}
                  </p>
                  <p>Total</p>
                </div>
                <div>
                  <p className="result_attempt quiz-detail-box">
                    {quizResult?.summary?.Attempted}
                  </p>
                  <p>Attempted</p>
                </div>
                <div>
                  <p className="result_correct quiz-detail-box">
                    {quizResult?.summary?.correctAns}
                  </p>
                  <p>Correct</p>
                </div>
                <div>
                  <p className="result_incorrect quiz-detail-box">
                    {quizResult?.summary?.wrongAnswers}
                  </p>
                  <p>Incorrect</p>
                </div>
                <div>
                  <p className="result_skipped quiz-detail-box">
                    {quizResult?.summary?.skipped}
                  </p>
                  <p>Skipped</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="summary_lower">
          <h1>All question See the details</h1>
          <p style={{ border: "1px solid #dfdfdf" }}></p>
          <div className="summary_ques">
            {" "}
            <QuizQuestion
              quizResult={quizResult}
              currentLanguage={currentLanguage}
              currentQuestion={currentQuestion}
            />
            {/* <div className="summary_ques_box">
              <div className="ques_upper">
                <div
                  dangerouslySetInnerHTML={{
                    __html: currentLanguage == 'e' ? quizResult?.response[currentQuestion - 1]?.question_title?.e : quizResult?.response[currentQuestion - 1]?.question_title?.h
                  }}
                />
              </div>
              <div className="ques_mid">
                <div style={{ border: parseInt(quizResult?.response[currentQuestion - 1]?.myAnswer) == parseInt(quizResult?.response[currentQuestion - 1]?.correctOption) == 1 ? '2px solid green' : quizResult?.response[currentQuestion - 1]?.correctOption == "1" ? '2px solid green' : quizResult?.response[currentQuestion - 1]?.myAnswer == '1' && '2px solid red' }}>
                  <input type="radio" disabled checked={parseInt(quizResult?.response[currentQuestion - 1]?.myAnswer) == 1} />
                  {currentLanguage == 'e' ? quizResult?.response[currentQuestion - 1]?.option1?.e : quizResult?.response[currentQuestion - 1]?.option1?.h}

                </div>
                <div style={{ border: parseInt(quizResult?.response[currentQuestion - 1]?.myAnswer) == parseInt(quizResult?.response[currentQuestion - 1]?.correctOption) == 2 ? '2px solid green' : quizResult?.response[currentQuestion - 1]?.correctOption == "2" ? '2px solid green' : quizResult?.response[currentQuestion - 1]?.myAnswer == '2' && '2px solid red' }}>
                  {" "}
                  <input type="radio" disabled checked={parseInt(quizResult?.response[currentQuestion - 1]?.myAnswer) == 2} />
                  {currentLanguage == 'e' ? quizResult?.response[currentQuestion - 1]?.option2?.e : quizResult?.response[currentQuestion - 1]?.option2?.h}



                </div>
                <div style={{ border: parseInt(quizResult?.response[currentQuestion - 1]?.myAnswer) == parseInt(quizResult?.response[currentQuestion - 1]?.correctOption) == 3 ? '2px solid green' : quizResult?.response[currentQuestion - 1]?.correctOption == "3" ? '2px solid green' : quizResult?.response[currentQuestion - 1]?.myAnswer == '3' && '2px solid red' }}>
                  {" "}
                  <input type="radio" disabled checked={parseInt(quizResult?.response[currentQuestion - 1]?.myAnswer) == 3} />
                  {currentLanguage == 'e' ? quizResult?.response[currentQuestion - 1]?.option3?.e : quizResult?.response[currentQuestion - 1]?.option3?.h}


                </div>
                <div style={{ border: parseInt(quizResult?.response[currentQuestion - 1]?.myAnswer) == parseInt(quizResult?.response[currentQuestion - 1]?.correctOption) == 4 ? '2px solid green' : quizResult?.response[currentQuestion - 1]?.correctOption == "4" ? '2px solid green' : quizResult?.response[currentQuestion - 1]?.myAnswer == '4' && '2px solid red' }}>
                  {" "}
                  <input type="radio" disabled checked={parseInt(quizResult?.response[currentQuestion - 1]?.myAnswer) == 4} />

                  {currentLanguage == 'e' ? quizResult?.response[currentQuestion - 1]?.option4?.e : quizResult?.response[currentQuestion - 1]?.option4?.h}

                </div>
              </div>
              <p style={{ border: "1px solid #dfdfdf" }}></p>
              <div className="ques_lower">
                <div>
                  <img src={pencil} alt="" />
                  Your Answer :
                  {quizResult?.response[currentQuestion - 1]?.myAnswer == 1 && "A"}
                  {quizResult?.response[currentQuestion - 1]?.myAnswer == 2 && "B"}
                  {quizResult?.response[currentQuestion - 1]?.myAnswer == 3 && "C"}
                  {quizResult?.response[currentQuestion - 1]?.myAnswer == 4 && "D"}
                </div>
                <div>
                  {" "}
                  <img src={correct} alt="" />
                  Correct Answer :
                  {quizResult?.response[currentQuestion - 1]?.correctOption == 1 && "A"}
                  {quizResult?.response[currentQuestion - 1]?.correctOption == 2 && "B"}
                  {quizResult?.response[currentQuestion - 1]?.correctOption == 3 && "C"}
                  {quizResult?.response[currentQuestion - 1]?.correctOption == 4 && "D"}
                </div>
                <div>
                  {" "}
                  <img src={notepad} alt="" />
                  <span>
                    Explanation <FaAngleDown />
                  </span>
                </div>
              </div>
            </div> */}
            {/* <div className="summary_ques_box">
              <div className="ques_upper">
                {currentLanguage == 'e' ? quizResult?.response[currentQuestion - 1]?.question_title?.e : quizResult?.response[currentQuestion - 1]?.question_title?.h}
              </div>
              <div className="ques_mid">
                <div>
                  <input type="radio" disabled checked={parseInt(quizResult?.response[currentQuestion - 1]?.correctOption) == 1} />
                  {currentLanguage == 'e' ? quizResult?.response[currentQuestion - 1]?.option1?.e : quizResult?.response[currentQuestion - 1]?.option1?.h}

                </div>
                <div>
                  {" "}
                  <input type="radio" disabled checked={parseInt(quizResult?.response[currentQuestion - 1]?.correctOption) == 2} />
                  {currentLanguage == 'e' ? quizResult?.response[currentQuestion - 1]?.option2?.e : quizResult?.response[currentQuestion - 1]?.option2?.h}



                </div>
                <div>
                  {" "}
                  <input type="radio" disabled checked={parseInt(quizResult?.response[currentQuestion - 1]?.correctOption) == 3} />
                  {currentLanguage == 'e' ? quizResult?.response[currentQuestion - 1]?.option3?.e : quizResult?.response[currentQuestion - 1]?.option3?.h}


                </div>
                <div>
                  {" "}
                  <input type="radio" disabled checked={parseInt(quizResult?.response[currentQuestion - 1]?.correctOption) == 4} />

                  {currentLanguage == 'e' ? quizResult?.response[currentQuestion - 1]?.option4?.e : quizResult?.response[currentQuestion - 1]?.option4?.h}

                </div>
              </div>
              <p style={{ border: "1px solid #dfdfdf" }}></p>
              <div className="ques_lower">
                <div>
                  <img src={pencil} alt="" />
                  Your Answer : B
                </div>
                <div>
                  {" "}
                  <img src={correct} alt="" />
                  Correct Answer : B
                </div>
                <div>
                  {" "}
                  <img src={notepad} alt="" />
                  <span>
                    Explanation <FaAngleDown />
                  </span>
                </div>
              </div>
            </div> */}
            <div style={{ margin: "0 auto" }}>
              {" "}
              <Stack spacing={2}>
                <Pagination
                  count={quizResult?.response?.length}
                  page={currentQuestion}
                  onChange={handleChange}
                  color="secondary"
                />
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
