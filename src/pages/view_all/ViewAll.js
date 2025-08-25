import React, { useContext, useEffect, useState } from "react";
import "./ViewAll.css";
import Navbar from "../../components/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";
import Footer from "../../components/Footer/Footer";
import Testimonial from "../home/testimonial/Testimonial";
import Faq from "../courses/asked_Ques/Faq";
import { MenuItem, Select } from "@mui/material";
import Course_Exam_Box from "../../components/Course_Exam_Box/Course_Exam_Box";
import { CoursesData } from "../../context/courses/Courses";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Banner from "../home/banner/Banner";
import { HeadProvider, Title, Link, Meta } from "react-head";
import Loader from "../../components/Loader/Loader";
import NewAccordian from "../../components/Accordian/NewAccordian";
const ViewAll = () => {
  const {
    loading,
    getCourses,
    courses,
    testSeries,
    getAllTestSeries,
    getFreeCourses,
    getBanner,
    banner,
    faq,
    getFAQs,
    selectedCategoryId,
    getPaidCourses,
    paidCoursesData,
    freeCoursesData,
  } = useContext(CoursesData);
  const location = useLocation();
  const navigate = useNavigate();

  const { slug, subCategorySlug } = useParams();
  useEffect(() => {
    if (["", null, undefined].includes(subCategorySlug)) {
      getCourses(slug);
      getFAQs({ type: "category", id: selectedCategoryId });
    } else {
      getCourses(slug, 100, "CategoryPage", subCategorySlug);
    }
    // getCourses(slug );
    // getAllTestSeries(slug);
    setTimeout(() => {
      if (window.innerWidth < 450) {
        getBanner(
          courses?.data?.batches ? courses?.data?.batches[0]?.category?.id : "",
          "APP"
        );
      } else {
        getBanner(
          courses?.data?.batches ? courses?.data?.batches[0]?.category?.id : "",
          "WEB"
        );
      }
    }, 2000);
    // getBannner()
  }, []);
  const [filter, setFilter] = useState("all");
  const limit = 100;
  const handleTypeChange = (type) => {
    if (type == "free") {
      setFilter("free");
      getCourses(slug, 100, "CategoryPage", subCategorySlug);
      // getFreeCourses(slug, limit);
    }
    if (type == "paid") {
      setFilter("paid");
      // getPaidCourses(slug, limit);
      getCourses(slug, 100, "CategoryPage", subCategorySlug);
    }
    if (type == "all") {
      setFilter("all");
      getCourses(slug, 100, "CategoryPage", subCategorySlug);
      // getCourses(slug, limit);
    }
  };
  // console.log("CC", courses)
  const mettitle =
    courses?.data?.batches[0]?.category.title +
    " : " +
    courses?.data?.batches[0]?.batchName;

  return (
    <>
      <HeadProvider>
        <Link rel="icon" href="https://www.sdcampus.com/favicon.ico" />
        <Meta name="viewport" content="width=device-width,initial-scale=1" />
        <Link rel="apple-touch-icon" href="https://www.sdcampus.com/logo.png" />
        <Link rel="manifest" href="https://www.sdcampus.com/site.webmanifest" />
        <Title>{mettitle}</Title>
        <Meta
          name="description"
          content={courses?.data?.batches?.map((item) => item.batchName)}
        />
        <Meta
          name="keywords"
          content={courses?.data?.batches?.map((item) => item.batchName)}
        />
        <Meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <Link rel="canonical" href={window.location.href} />
        <Meta property="og:locale" content="en_US" />
        <Meta property="og:site_name" content="SD Campus" />
        <Meta property="og:type" content="website" />
        <Meta property="og:title" content={mettitle} />
        <Meta
          property="og:description"
          content={courses?.data?.batches?.map((item) => item.batchName)}
        />
        <Meta property="og:image" content={courses?.data?.batches[0]?.banner} />
        <Meta property="og:image:width" content="560" />
        <Meta property="og:image:height" content="292" />
        <Meta property="og:url" content={window.location.href} />
        <Meta name="twitter:card" content="summary_large_image" />
        <Meta name="twitter:title" content={mettitle} />
        <Meta
          name="twitter:description"
          content={courses?.data?.batches?.map((item) => item.batchName)}
        />
        <Meta
          name=" twitter:image"
          content={courses?.data?.batches[0]?.banner}
        />
      </HeadProvider>

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
          <Loader color="secondary" />
        </div>
      ) : (
        <div className="railway_wrapper">
          <section className="hero_section">
            <Banner banner={banner?.data} />
          </section>
          <Wrapper>
            <div className="category_upper_part">
              <p>
                <span
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Home{" "}
                </span>
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#arrow_svg__a)">
                    <path
                      d="M6.586 6.001 4.111 3.526l.707-.707L8 6.001 4.818 9.183l-.707-.707 2.475-2.475Z"
                      fill="#757575"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="arrow_svg__a">
                      <path fill="#fff" d="M0 0h12v12H0z"></path>
                    </clipPath>
                  </defs>
                </svg>
                <span
                  className="primary_color"
                  style={{ cursor: "pointer", textTransform: "capitalize" }}
                  onClick={() =>
                    navigate(`/${location?.state?.slug}`, {
                      state: {
                        name: location?.state?.name,
                      },
                    })
                  }
                >
                  {location?.state?.name}
                </span>
                {"  "}
              </p>

              {/* <div className="search_sort">
                <Select sx={{ height: "25px", width: "100px" }} value={filter}>
                  <MenuItem value="all" onClick={() => handleTypeChange("all")}>
                    All
                  </MenuItem>
                  <MenuItem
                    value="free"
                    onClick={() => {
                      handleTypeChange("free");
                    }}
                  >
                    Free Courses
                  </MenuItem>
                  <MenuItem
                    value="paid"
                    onClick={() => handleTypeChange("paid")}
                  >
                    Paid Courses
                  </MenuItem>
                </Select>
              </div> */}
            </div>

            <div className="new_courses_for_you" data-aos="fade-right">
              <div className="new_courses_container">
                <Course_Exam_Box
                  courses={
                    filter == "all"
                      ? courses?.data?.batches
                      : filter == "free"
                        ? freeCoursesData
                        : paidCoursesData
                  }
                  slug={slug}
                  from="course"
                />
              </div>

              <div>
                <Testimonial />
              </div>
              <div style={{ marginBottom: "2rem" }}>
                <Wrapper>
                  {" "}
                  {/* <Faq data={faq} staticData={false} /> */}
                  {faq?.length > 0 && <NewAccordian data={faq} />}
                </Wrapper>
              </div>
            </div>
          </Wrapper>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ViewAll;
