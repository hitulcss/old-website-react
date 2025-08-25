import React, { useContext, useEffect } from "react";
import "./JobPage.css";
import Wrapper from "../../../components/Wrapper/Wrapper";
import { CoursesData } from "../../../context/courses/Courses";
import Course_Exam_Box from "../../../components/Course_Exam_Box/Course_Exam_Box";
import BookCounseling from "../../../components/Book_Counseling/BookCounseling";
import { useNavigate, useParams } from "react-router-dom";
import ExamsBox from "../../../components/Exams_Box/ExamsBox";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { HeadProvider, Title, Link, Meta } from "react-head";
const JobPage = () => {
  const {
    latestBlogs,
    getLatestBlogs,
    getCourses,
    courses,
    particularCategoryBlogs,
    getBlogsByCategory,
    // getBlogs
  } = useContext(CoursesData);
  const navigate = useNavigate();
  const { categorySlug } = useParams();
  useEffect(() => {
    // getBlogs()
    getBlogsByCategory(categorySlug);
    getLatestBlogs();
    getCourses(categorySlug, 2);
  }, []);
  // console.log("Per", courses)
  const title =
    latestBlogs?.blogs[0]?.category?.title + ":" + latestBlogs?.blogs[0]?.title;
  return (
    <>
      <HeadProvider>
        <Link rel="icon" href="https://www.sdcampus.com/favicon.ico" />
        <Meta name="viewport" content="width=device-width,initial-scale=1" />
        <Link rel="apple-touch-icon" href="https://www.sdcampus.com/logo.png" />
        <Link rel="manifest" href="https://www.sdcampus.com/site.webmanifest" />
        <Title>{title}</Title>
        <Meta
          name="description"
          content={latestBlogs?.blogs?.map((item) => item.title)}
        />
        <Meta
          name="keywords"
          content={latestBlogs?.blogs?.map((item) => item.title)}
        />
        <Meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <Link rel="canonical" href={window.location.href} />
        <Meta property="og:locale" content="en_US" />
        <Meta property="og:site_name" content="SD Campus" />
        <Meta property="og:type" content="website" />
        <Meta property="og:title" content={title} />
        <Meta
          property="og:description"
          content={latestBlogs?.blogs?.map((item) => item.title)}
        />
        <Meta
          property="og:image"
          content={latestBlogs?.blogs[0]?.featuredImage}
        />
        <Meta property="og:image:width" content="560" />
        <Meta property="og:image:height" content="292" />
        <Meta property="og:url" content={window.location.href} />
        <Meta name="twitter:card" content="summary_large_image" />
        <Meta name="twitter:title" content={title} />
        <Meta
          name="twitter:description"
          content={latestBlogs?.blogs?.map((item) => item.title)}
        />
        <Meta
          name=" twitter:image"
          content={latestBlogs?.blogs[0]?.featuredImage}
        />
      </HeadProvider>

      <Navbar />
      <div className="jobpage_wrapper">
        <Wrapper>
          <div className="jobpage_header">
            <p>
              <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                Home
              </span>{" "}
              {">"}{" "}
              <span
                style={{ cursor: "pointer" }}
                className="primary_color"
                onClick={() => navigate("/exams")}
              >
                Exams
              </span>{" "}
              {">"}{" "}
              <span className="primary_color">
                {particularCategoryBlogs?.blogs
                  ? particularCategoryBlogs?.blogs[0]?.category?.title
                  : ""}{" "}
              </span>
            </p>

            <p className="job_header_blogs">
              {/* Blogs Category <FaSortDown /> */}
            </p>
          </div>
        </Wrapper>
        <p style={{ border: "1px solid #efefef" }}></p>
        <Wrapper>
          <div className="jobpage_lower_container">
            <div className="jobpage_left">
              {/* <Latest_Articles blog={particularCategoryBlogs} /> */}
              <ExamsBox
                title={
                  particularCategoryBlogs?.blogs
                    ? particularCategoryBlogs?.blogs[0]?.title
                    : []
                }
                blog={particularCategoryBlogs?.blogs}
                from="view-more"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <Stack spacing={2}>
                  <Pagination count={10} color="secondary" />
                </Stack> */}
              </div>
            </div>
            <div className="jobpage_right">
              <div className="latest_blogs_container">
                <h3>Latest Blogs</h3>
                {latestBlogs?.blogs?.map((item, index) => (
                  <div
                    className="latest_blogs"
                    key={index}
                    onClick={() =>
                      navigate(`/exams/${item?.category?.slug}/${item?.slug}`, {
                        state: {
                          id: item?.id,
                        },
                      })
                    }
                  >
                    <img src={item.img} alt="img" loading="lazy" />
                    <p>{item.title}</p>
                  </div>
                ))}
              </div>

              <div className="job_courses">
                <p>Courses ─────────</p>
                <div style={{ marginTop: "1rem", padding: "20px" }}>
                  {" "}
                  <Course_Exam_Box courses={courses?.data} />{" "}
                </div>
              </div>

              <div className="job_counselling">
                <BookCounseling />
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
      <Footer />
    </>
  );
};

export default JobPage;
