import React, { useContext, useEffect } from "react";
import "./Testimonial.css";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import upperquote from "../../../assets/upperquote.png";
import lowerquote from "../../../assets/lowerquote.png";
import { CoursesData } from "../../../context/courses/Courses";

const Testimonial = () => {
  const a = [1, 2, 3, 4, 5, 6, 7, 8];

  const { getAllTestimonal, testimonial } = useContext(CoursesData);

  useEffect(() => {
    getAllTestimonal();
  }, []);

  return (
    <>
      <div className="testimonial_wrapper" data-aos="fade-up">
        {testimonial?.data?.length > 0 && (
          <h1 data-aos="fade-up" className="testi-h1">
            What Our Students <span>Say?</span>
          </h1>
        )}
        <div className="testimmonial_card_conatiner" data-aos="fade-up">
          {testimonial?.data?.map((item, index) => (
            <div key={index} className="testimonial_box_wrapper">
              <div className="testimonial_box">
                <p className="testimonial_description">{item?.message}</p>
                <div className="testi_desctip">
                  <img src={item?.photo} alt="img" loading="lazy" />
                  <div className="testimonial_lower_descrip">
                    <p className="student_name">{item?.studentName}</p>
                    <p className="bio">
                      {/* {item?.rank}- */}
                      {item?.exam}
                    </p>
                    <div className="stars">
                      <StarOutlinedIcon
                        style={{ color: "#FCA120 ", fontSize: "22px" }}
                      />
                      <StarOutlinedIcon
                        style={{ color: "#FCA120 ", fontSize: "22px" }}
                      />
                      <StarOutlinedIcon
                        style={{ color: "#FCA120 ", fontSize: "22px" }}
                      />
                      <StarOutlinedIcon
                        style={{ color: "#FCA120 ", fontSize: "22px" }}
                      />
                      <StarOutlinedIcon
                        style={{ color: "#FCA120 ", fontSize: "22px" }}
                      />
                    </div>
                  </div>
                </div>
                <img
                  src={upperquote}
                  alt="quote"
                  className="upper_quote"
                  loading="lazy"
                />
                <img
                  src={lowerquote}
                  alt="quote"
                  className="lower_quote"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Testimonial;
