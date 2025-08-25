import React from "react";
import "./Expertise.css";
import { MdArrowRightAlt } from "react-icons/md";
import Wrapper from "../../../../components/Wrapper/Wrapper";

const Expertise = () => {
  const tests = [
    "UGC NET Exams",
    "All Teaching Exams",
    "JNV Entrance Exam",
    "Sainik School Entrance Exam",
    "Rashtriya Military School (RMS)",
    "Rashtriya Indian Military College (RIMC)",
  ];

  return (
    <>
      <Wrapper>
        <div className="expertise_weapper">
          <div className="expertise_conatiner">
            <div className="expertise_upper">
              {" "}
              <h1>
                Our Areas of{" "}
                <span style={{ color: "rgba(228, 110, 48, 1)" }}>
                  {" "}
                  Expertise
                </span>
              </h1>
              <p>
                We are more than just a regular coaching institute- we are a
                nurturing community that cares about your all-round growth. At
                Student's Dream Campus, our focus is on developing not just your
                academic skills but also your character and values.
              </p>
              <p>
                Our goal is to shape future leaders who excel in academics and
                are also committed to serving the nation with integrity. We
                believe in bringing out the best in every student.
              </p>
              <p>
                We are a well-known name in the world of government exams,
                Sainik school entrance, JNV, teaching exams, defense exams, and
                more.
              </p>
              <p>
                Join us at Student's Dream Campus and let us guide you on the
                path to success. Our nurturing environment will help unlock your
                true potential and shape you into a future leader.
              </p>
              <p style={{ color: "rgba(228, 110, 48, 1)" }}>
                We are renowned for helping students crack crucial entrance
                tests like:
              </p>
            </div>
            <div className="expertise_lower">
              {tests.map((item, index) => (
                <div className="test_box" key={index}>
                  {item}
                </div>
              ))}
            </div>

            <p className="view_all_exam">
              View All Exams <MdArrowRightAlt className="view_icon" />
            </p>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Expertise;
