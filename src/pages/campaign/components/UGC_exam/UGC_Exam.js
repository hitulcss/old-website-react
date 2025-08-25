import React from "react";
import "./UGC_Exam.css";
import { MdOutlineArrowRightAlt } from "react-icons/md";

const UGC_Exam = ({ data, imgSrc }) => {
  return (
    <>
      <div className="ugc_net_wrapper">
        <div className="ugc_net_container">
          <div className="ugc_net_left">
            <h1>{data?.title}</h1>

            {data?.p?.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}

            <button>
              Registor Now <MdOutlineArrowRightAlt className="regis_icon" />
            </button>
          </div>
          <div className="ugc_net_right">
            <img src={imgSrc} alt="ugcImg" loading="lazy" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UGC_Exam;
