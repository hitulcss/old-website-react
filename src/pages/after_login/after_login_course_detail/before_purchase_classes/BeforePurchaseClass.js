import React, { useContext, useEffect } from "react";
import "./BeforePurchaseClass.css";
import maths from "../../../../assets/subjects/math.png";
import science from "../../../../assets/subjects/science.png";
import hindi from "../../../../assets/subjects/hindi.png";
import { IoArrowBack } from "react-icons/io5";
import { CoursesData } from "../../../../context/courses/Courses";
import { useParams } from "react-router-dom";
import LectureVideos from "../../../../components/LectureVideos/LectureVideos";

const BeforePurchaseClass = ({ setShow, setSubjectId, setValue, show }) => {
  //context
  const { getSubjectDetailsOfBatch, prePurchaseSubject } =
    useContext(CoursesData);

  //batchSlug
  const { subCategorySlug } = useParams();

  //api call
  useEffect(() => {
    if (subCategorySlug) {
      getSubjectDetailsOfBatch(subCategorySlug);
    }
  }, [subCategorySlug]);
  useEffect(() => {
    if (prePurchaseSubject) {
      // console.log(prePurchaseSubject);
    }
  }, [prePurchaseSubject]);

  return (
    <>
      <div className="before_class_wrapper">
        <h1>
          <IoArrowBack
            onClick={() => {
              setValue(1);
              setShow({
                classes: false,
                home: true,
                lecture: false,
                show: show.type,
              });
            }}
            className="back-arrow-btn"
          />{" "}
          Go back{" "}
        </h1>
        <p style={{ border: "1px solid #efefef" }}></p>

        <div className="before_classes_inner">
          <h2>Select your subjects & Start learning </h2>{" "}
          <div
            className="before_class_container"
            onClick={(e) => {
              e.stopPropagation();

              setShow({
                classes: false,
                home: false,
                lecture: true,
                type: show?.type,
              });
            }}
          >
            {prePurchaseSubject?.data?.map((item, index) => (
              <div
                key={index}
                className="before_class_box"
                onClick={() => setSubjectId(item?.id)}
              >
                <img src={item.icon} alt="icon" loading="lazy" />
                <h2>{item.title}</h2>
                {/* <p>4 Chapters</p  > */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BeforePurchaseClass;
