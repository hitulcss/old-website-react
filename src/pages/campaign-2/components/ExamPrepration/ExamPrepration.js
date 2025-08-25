import React from "react";
import "./ExamPrepration.css";
import Wrapper from "../../../../components/Wrapper/Wrapper";

const ExamPrepration = ({ data }) => {

  const handleClickScroll = () => {
    const element = document.getElementById("book-demo");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div className="examprepration-wrapper">
        <Wrapper>
          <div className="examprepration-container">
            <div className="examprepration-left">
              <h1>{data?.title}</h1>
              <p>{data?.descrip}</p>
              <button onClick={handleClickScroll
                
              }>Book Free Demo!</button>
            </div>
            <div className="examprepration-right">
              <img src={data?.img} alt="examprepare" />
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default ExamPrepration;
