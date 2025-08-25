import React, { useContext, useEffect, useState } from "react";
import "./Exams.css";
import Latest_Articles from "./latest_articles/Latest_Articles";
import Footer from "../../components/Footer/Footer";
import Wrapper from "../../components/Wrapper/Wrapper";
import { CoursesData } from "../../context/courses/Courses";
import { CircularProgress } from "@mui/material";
import ExamsBox from "../../components/Exams_Box/ExamsBox";
import LatestArticles from "../../components/Latest_Articles/LatestArticles";
import BookCounselling from "../../components/Book_Counseling/BookCounseling";
import Navbar from "../../components/Navbar/Navbar";
import Loader from "../../components/Loader/Loader";

const Exams = () => {
  const {
    getBlogs,
    loading,
    getLatestBlogs,
    latestBlogs,
    categoryBlogs,
    courses,
    getCourses,
  } = useContext(CoursesData);

  useEffect(() => {
    getLatestBlogs(6);
    // getAllCategory();
    getBlogs();
    getCourses("All", 8);
    // getAllBlogs()
    // setItems(categoryBlogs.filter((item) => { return item.data.length > 0}));
  }, []);

  // n -
  // console.log("LETBlog", getLatestBlogs);

  return (
    <>
      <Navbar />

      {loading ? (
        <div
          style={{
            minHeight: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <Loader />
        </div>
      ) : (
        <div>
          <div>{/* <Header /> */}</div>

          <div className="upper_blog_section">
            <Latest_Articles blog={latestBlogs} />
          </div>

          <Wrapper>
            <div className="lower_blog_section">
              <div className="lower_blog_left">
                {" "}
                {categoryBlogs?.map((item, index) => {
                  return (
                    <>
                      <div className="blog_exams">
                        <div className="blog_exam_box">
                          <ExamsBox
                            key={index}
                            title={item.title}
                            blog={item.data}
                          />
                        </div>
                      </div>
                      {/* {index == 0 && (
                    <div className="right_teacher_exam_box">
                      <LatestArticles blog={latestBlogs} />
                    </div>
                  )}
                  {index == 1 && (
                    <div className="right_police_exam_box">
                      <BookCounselling />
                    </div>
                  )} */}
                    </>
                  );
                })}
              </div>
              <div className="lower_blog_right">
                <div>
                  <LatestArticles blog={latestBlogs} />
                </div>

                <div style={{ marginTop: "3rem" }}>
                  {" "}
                  <BookCounselling />
                </div>
              </div>{" "}
            </div>
          </Wrapper>
          {/* <Wrapper>
            <div className="teachers_exam">
              <div className="exam_box_div">
                {" "}
                <ExamsBox
                  title="Teachers Exams"
                  blog={blog}
                  category={"6561b5684bdbed480d6a53ce"}
                  
                />
              </div>

              <div className="right_teacher_exam_box">
                <LatestArticles />
              </div>
            </div>
          </Wrapper> */}

          {/* <Wrapper>
            <div className="police_exams">
              <div className="police_exam_div">
                <ExamsBox
                  title="Police Exams"
                  blog={blog}
                  category={"6561b5684bdbed480d6a53ce"}
                  // setSelectedCategory={setSelectedCategory}
                />
              </div>

              <div className="right_police_exam_box">
                <BookCounselling />
              </div>
            </div>
          </Wrapper> */}

          {/* <div className="exams_top_courses">
            <Wrapper>
              <TopCourses courses={courses} />
            </Wrapper>
          </div> */}
          {/* <div>
            <Community />
          </div> */}
        </div>
      )}

      <Footer />
    </>
  );
};

export default Exams;
