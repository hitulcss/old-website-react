import React, { useContext, useEffect } from "react";
import "./LearningJunction.css";
import poster1 from "../../../assets/poster1.png";
import { NavLink, useNavigate } from "react-router-dom";
import { CoursesData } from "../../../context/courses/Courses";

const LearningJunction = () => {
  const junction_details = [
    {
      title: "Up Police",
      img: poster1,
      description:
        "Lorem Ipsum is simply dummy  text of the printing and types etting industry.",
      button: "Read More ➜",
    },
  ];

  const { getBlogs, blog } = useContext(CoursesData);
  const navigate = useNavigate();
  useEffect(() => {
    // getBlogs()
  }, []);
  return (
    <>
      <div className="junction_wrapper" data-aos="fade-right">
        <div className="heading">
          <h1>
            The Learning <span className="primary_color">Junction</span>
          </h1>
          <p>
            A student's go-to blog for the latest stories, discoveries, fun
            activities, exam tips, and more.
          </p>
        </div>
        <div className="learning_junction_container">
          {blog?.map((item, index) => (
            <div className="junction_box" key={index}>
              <img src={junction_details[0]?.img} alt="img" loading="lazy" />

              <h1>{item.title?.rendered}</h1>
              <h1>{item.description}</h1>

              <button className="read_more_btn">Read More ➜</button>
            </div>
          ))}
        </div>
        <NavLink to="/blog" target="_blank">
          <button className="explore_more_btn">Explore More</button>
        </NavLink>
      </div>
    </>
  );
};

export default LearningJunction;
