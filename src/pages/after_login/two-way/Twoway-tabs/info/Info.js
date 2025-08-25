import React from "react";
import "./Info.css";

const Info = (data) => {

  return (
    <>
      <div className="twoway-info-container">
        <div className="info-upper">
          <h1>{data?.data?.lectureTitle}</h1>
          <p>
            By : <span style={{ color: "var(--textGray)" }}>Sachin Sir</span>
          </p>
        </div>
        <div className="info-lower">
          <p>Start Date : {data?.data?.starting_date}</p>{" "}
          <p>Duration : {data?.data?.duration} Months </p>
          <p>Batch Details: </p>
          <div dangerouslySetInnerHTML={{ __html: data?.data?.description }} />
          {/* <p>{data?.data?.description}</p> */}
        </div>
      </div>
    </>
  );
};

export default Info;
