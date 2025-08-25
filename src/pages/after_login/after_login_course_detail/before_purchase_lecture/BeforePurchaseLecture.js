import React, { useContext, useEffect, useState } from "react";
import "./BeforePurchaseLecture.css";
import maths from "../../../../assets/subjects/math.png";
import science from "../../../../assets/subjects/science.png";
import hindi from "../../../../assets/subjects/hindi.png";
import { IoArrowBack } from "react-icons/io5";
import { CoursesData } from "../../../../context/courses/Courses";
import { useParams } from "react-router-dom";
import moment from "moment";
import playBtn from "../../../../assets/playbtn.png";
import lockLecture from "../../../../assets/lock-lec.png";
import lectureIcon from "../../../../assets/lecture.png";
import toast from "react-hot-toast";
import VideoModal from "../VideoModal";
import lectureImg from "../../../../assets/lecture_default.jpg";

import LockPopupModal from "../lock-popup/LockPopup";

const BeforePurchaseLecture = ({
  setShow,
  subjectId,
  setLockModal,
  lockModal,
  course,
  selectedValidity,
}) => {
  const classes = [
    {
      icon: maths,
      className: "Mathmatics",
      chapters: "16",
    },
    {
      icon: science,
      className: "Chemistry",
      chapters: "12",
    },
    {
      icon: hindi,
      className: "Hindi",
      chapters: "6",
    },
    {
      icon: maths,
      className: "Mathmatics",
      chapters: "16",
    },
    {
      icon: science,
      className: "Chemistry",
      chapters: "12",
    },
    {
      icon: hindi,
      className: "Hindi",
      chapters: "6",
    },
  ];

  //context
  const { getLectureDetailsOfSubject, prePurchaseLecture } =
    useContext(CoursesData);

  //batchSlug
  const { subCategorySlug } = useParams();
  // console.log('BatchSlug', subCategorySlug)
  //api call
  useEffect(() => {
    if (subCategorySlug && subjectId) {
      getLectureDetailsOfSubject(subCategorySlug, subjectId);
    }
  }, [subCategorySlug, subjectId]);
  useEffect(() => {
    if (prePurchaseLecture) {
      // console.log(prePurchaseLecture);
    }
  }, [prePurchaseLecture]);

  //time formatting
  function formatDateTime(inputDateTimeString) {
    // var date = new Date(inputDateTimeString);
    var date = moment(inputDateTimeString, "DD-MM-YYYY HH:mm:ss").format(
      "MMM Do YYYY, h:mm A"
    );
    var options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      hour12: true,
    };
    var formattedDate = date.toLocaleString("en-US", options);

    // return formattedDate;
    return date;
  }

  const [open, setOpen] = useState(false);
  const [link, setLink] = useState(-1);
  return (
    <>
      <div className="before_class_wrapper">
        <VideoModal setOpen={setOpen} open={open} link={link} />
        {/* <h1>
                    <IoArrowBack
                        onClick={() => {
                            setShow({ classes: true, home: false, lecture: false })
                            setSubjectId(false)
                        }}
                        className="back-arrow-btn"
                    />
                    All Subjects{" "}
                </h1>
                <p style={{ border: "1px solid #efefef" }}></p> */}

        <LockPopupModal
          setLockModal={setLockModal}
          lockModal={lockModal}
          selectedValidity={selectedValidity}
          course={course}
          text="Classes"
        />
        <div className="before_classes_inner">
          {/* <h2>Select your subjects & Start learning </h2>{" "} */}

          {prePurchaseLecture?.data?.length > 0 ? (
            <div className="before_class_container">
              {prePurchaseLecture?.data?.length > 0
                ? prePurchaseLecture?.data?.map((item, index) => (
                    <div
                      className="lecture-box"
                      key={index}
                      onClick={() => {
                        if (index == 0) {
                          setLink(item?.link);
                          setOpen(true);
                        } else {
                          setLockModal(true);
                        }
                      }}
                    >
                      {/* <img src={ytposter} alt="ytPoster" /> */}
                      <div style={{ position: "relative" }}>
                        <img
                          src={item.banner ?? lectureImg}
                          alt="banner"
                          className="main-lecture-img"
                          loading="lazy"
                        />

                        {!index == 0 && (
                          <img
                            src={lockLecture}
                            alt="lockbutton"
                            className="lock-lec-btn"
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div
                        className="lecture-descrip"
                        style={{ height: "60%" }}
                      >
                        <h1 style={{ color: "#000" }}>
                          {" "}
                          {item.title?.slice(0, 35)}
                          {item.title?.length > 35 ? ".." : ""}
                        </h1>
                        <div className="lecture-descrip-lower">
                          <div className="lec-right-descrip">
                            {" "}
                            <span>
                              By:{" "}
                              <span style={{ color: "var(--primaryColor)" }}>
                                {item?.teacher ? item?.teacher : ""}
                              </span>
                              {/* <span style={{ color: "#000" }}>
                              {item?.teacher ? item?.teacher : ""}
                            </span> */}
                            </span>
                          </div>
                          <div className="lec-left-descrip">
                            <span style={{ color: "#000" }}>
                              {formatDateTime(item?.startDateTime)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : "No Lecture"}
            </div>
          ) : (
            <div
              style={{
                height: "50vh",
                fontSize: "25px",
                display: "flex",
                alignItems: "center",
                width: "100%",

                justifyContent: "center",
              }}
            >
              <div className="no-dpp">
                <img src={lectureIcon} alt="dpp" loading="lazy" />
                <p>No Lecture Available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BeforePurchaseLecture;
