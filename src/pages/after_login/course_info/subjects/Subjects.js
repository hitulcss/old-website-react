import React, { useContext, useEffect } from "react";
import "./Subjects.css";
import maths from "../../../../assets/subjects/math.png";
import science from "../../../../assets/subjects/science.png";
import hindi from "../../../../assets/subjects/hindi.png";
import { NavLink, useNavigate } from "react-router-dom";
import { CoursesData } from "../../../../context/courses/Courses";
import { pushToDataLayer } from "../../../../gtm/gtm";

const Subjects = ({ batchId, batchSlug, data, from }) => {
  const { getSubjectOfBatch, subjectOfBatch } = useContext(CoursesData)
  useEffect(() => {
    getSubjectOfBatch(batchSlug)
  }, [])
  const subjects = [
    {
      img: maths,
      title: "Mathmatics",
      chapters: "16 Chapters",
    },
    {
      img: science,
      title: "Mathmatics",
      chapters: "16 Chapters",
    },
    {
      img: hindi,
      title: "Mathmatics",
      chapters: "16 Chapters",
    },
    {
      img: maths,
      title: "Mathmatics",
      chapters: "16 Chapters",
    },
    {
      img: science,
      title: "Mathmatics",
      chapters: "16 Chapters",
    },
    {
      img: hindi,
      title: "Mathmatics",
      chapters: "16 Chapters",
    },
    {
      img: science,
      title: "Mathmatics",
      chapters: "16 Chapters",
    },
    {
      img: hindi,
      title: "Mathmatics",
      chapters: "16 Chapters",
    },
    {
      img: maths,
      title: "Mathmatics",
      chapters: "16 Chapters",
    },
    {
      img: science,
      title: "Mathmatics",
      chapters: "16 Chapters",
    },
    {
      img: hindi,
      title: "Mathmatics",
      chapters: "16 Chapters",
    },
  ];
  const navigate = useNavigate()
  if (!localStorage.getItem('isLoggedIn')) {
    navigate(`/login?source=${window?.location?.href}`)
  }
  return (
    <>
      <div className="subject_wrapper">
        <h4>Choose your favourite subject & start learning </h4>
        <p
          style={{
            border: "1px solid #efefef",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        ></p>

        <div className="subject_container">
          {subjectOfBatch?.map((item, index) => (
            <div to="/subject-details" onClick={() => {
              if (from == 'after-login') {
                navigate('/learning/subject-details', {
                  state: {
                    batchId: batchId,
                    batchSlug: batchSlug,
                    subjectId: item?.id,
                    batchName: data?.batchName,
                    subjectName: item?.title,
                    data: data
                  }
                })
              }
              else {

                pushToDataLayer({
                  ecommerce: null, // Clear the previous ecommerce object.
                });
                pushToDataLayer({
                  event: "view_subject",
                  batchName: data?.batchName,
                  subjectName: item?.title,
                  isLoggedIn: localStorage?.getItem('isLoggedIn'),
                  // current_stream_id: item?.id,




                });
                navigate('/subject-details', {
                  state: {
                    batchId: batchId,
                    batchSlug: batchSlug,
                    subjectId: item?.id,
                    batchName: data?.batchName,
                    subjectName: item?.title
                  }
                })
              }
            }}>
              <div className="subject_box" key={index}>
                <img src={item?.icon ? item?.icon : subjects[0]?.img} alt="" />
                <div className="sub_descrip">
                  <p className="sub_name">{item?.title}</p>
                  <p className="chapters">{item?.chapter} Lectutes</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Subjects;
