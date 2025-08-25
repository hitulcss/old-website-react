import React from "react";
import "./QuizDetailPopup.css";
import { IoClose } from "react-icons/io5";

const QuizDetailPopup = ({
  showpopup,
  ans_res,
  setCurrentQuestion,
  currentQuestion,
}) => {
  //selected answers
  const [selectedCount, setSelectedCount] = React.useState(0);
  React.useEffect(() => {
    let count = 0;
    if (ans_res) {
      for (let j = 0; j < ans_res?.length; j++) {
        for (const [key, val] of Object.entries(ans_res[j])) {
          if (val == "") {
          } else {
            ++count;
          }
        }
      }
      setSelectedCount(count);
    }
  }, [ans_res]);
  return (
    <>
      <div className="popup-overlay">
        <div className="popup-content">
          <div className="popup-content-header">
            <IoClose
              onClick={showpopup}
              style={{ cursor: "pointer" }}
              className="quizicon"
            />
          </div>

          <p style={{ border: "1px solid #dfdfdf" }}></p>

          <div className="popup-content-lower">
            <div className="popup-upper">
              <div className="attempted">
                <span>{selectedCount}</span>
                <p>Attemped</p>
              </div>
              {/* <div className="marked">
                <span>0</span> <p>Marked</p>
              </div> */}
              <div className="not-attempted">
                <span>{ans_res?.length - selectedCount}</span>{" "}
                <p>Not Attempted</p>
              </div>
              {/* <div className="not-visited">
                <span>0</span> <p>Not Visited</p>
              </div> */}
              {/* <div className="mark-answered">
                <span>0</span> <p>Marked & Answered</p>
              </div> */}
            </div>
            <div className="popup-lower">
              <div className="popup-lower_options">
                <p>General Awareness</p>
                <p>Reasoning Ability</p>
                <p>IT</p>
              </div>
              <div className="popup-lower-ques">
                {ans_res?.map((item, index) => {
                  let flag;
                  for (const [key, val] of Object.entries(item)) {
                    if (val !== "") {
                      flag = true;
                      // setCurrentValueOfQuestion(val);
                    }
                  }
                  return (
                    <p
                      className="ques_nums"
                      style={{
                        border:
                          currentQuestion == index + 1 && "2px solid black",
                        background: flag ? "lightgreen" : "lightyellow",
                      }}
                      onClick={() => {
                        setCurrentQuestion(index + 1);
                      }}
                      key={index}
                    >
                      {index + 1}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizDetailPopup;
