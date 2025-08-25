import React, { useContext, useEffect, useState } from "react";
import "./CategoryPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";
import Footer from "../../components/Footer/Footer";
import { CoursesData } from "../../context/courses/Courses";
import Testimonial from "../home/testimonial/Testimonial";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import Course_Exam_Box from "../../components/Course_Exam_Box/Course_Exam_Box";
import playbtn from "../../assets/YT/playbtn.png";
import "../home/banner/Banner.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import BookCounselling from "../course_details/book_counselling/BookCounselling";
import { HeadProvider, Title, Meta } from "react-head";
import { ToastBar, Toaster } from "react-hot-toast";
import { MdOutlineCastForEducation } from "react-icons/md";
import { MdOutlineFactCheck } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import TopEducators from "../home/topEducators/TopEducators";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import BookBox from "../../components/Book_box/BookBox";
import NewAccordian from "../../components/Accordian/NewAccordian";
import Loader from "../../components/Loader/Loader";
import { pushToDataLayer } from "../../gtm/gtm";
import SubCategory from "../../components/SubCategory/SubCategory";
import Faq from "../courses/asked_Ques/Faq";
import TestimonialNew from "../home/testimonial/TestimonialNew";
import UseModal from "../home/cta/BatchCTA";
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: 380,
  // backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: 24,
};

const CustomPrevArrow = (props) => {
  return (
    <div className="custom-prev-arrow" onClick={props.onClick}>
      {/* Your custom left arrow icon or content */}
      <span className="left_arrow">
        <FaAngleLeft />
      </span>
    </div>
  );
};

const CustomNextArrow = (props) => {
  return (
    <div className="custom-next-arrow" onClick={props.onClick}>
      {/* Your custom right arrow icon or content */}
      <span className="right_arrow">
        <FaAngleRight />
      </span>
    </div>
  );
};

const CategoryPage = ({ title, from }) => {
  const { slug, subCategorySlug } = useParams();
  const {
    getAllCategory,
    getAllTestSeries,
    testSeries,
    getCourses,
    courses,
    loading,
    getBanner,
    getallYoutube,
    banner,
    youtube,
    getFreeCourses,
    getPaidCourses,
    paidCoursesData,
    freeCoursesData,
    selectedCategoryId,
    getFAQs,
    faq,
    ebooks,
    getEbooks,
    storeProducts,
    getAllStoreProduct,
    setDrawerOpen,
    category,
    setSelectedCategory,
    setSelectedCategoryId,
    setDropDownCategory,
    getCTABanners,
  } = useContext(CoursesData);

  useEffect(() => {
    getEbooks({ page: 1, size: 25 });
    if (courses) {
      getCTABanners("category", selectedCategoryId);
    }
  }, [courses]);
  useEffect(() => {
    getAllCategory();
  }, [slug]);

  const [currentCategory, setCurrentCategory] = useState();
  useEffect(() => {
    if (category) {
      category?.data?.map((item) => {
        if (item?.slug == slug) {
          setCurrentCategory(item);
        }
      });
    }
  }, [category]);

  const [isFixed, setIsFixed] = useState(false);

  // console.log(isAddToCart?.isAddToCart)
  useEffect(() => {
    // setButtonText(isAddToCart?.isAddToCart ? 'Go To Bag' : 'Add To Cart')
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 860;
      const slideDown = 1800;

      setIsFixed(scrollPosition > threshold);

      if (scrollPosition > slideDown) {
        setIsFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const location = useLocation();
  // console.log(courses?.data?.length)
  const navigate = useNavigate();
  useEffect(() => {
    // getCourses(location?.state?.name);
    getFAQs({ type: "category", id: selectedCategoryId });
    if (slug && !subCategorySlug) {
      getCourses(slug, 100, "CategoryPage");
    } else if (subCategorySlug) {
      getCourses(slug, 100, "CategoryPage", subCategorySlug);
    }

    // getAllTestSeries(slug);
    if (window.innerWidth < 450) {
      getBanner(selectedCategoryId, "APP");
    } else {
      getBanner(selectedCategoryId, "WEB");
    }

    getallYoutube(location?.state?.id);
  }, [slug, subCategorySlug]);

  const limit = 8;
  const handleTypeChange = (type) => {
    if (type == "free") {
      setFilter("free");

      getFreeCourses(slug, limit, subCategorySlug);
    }
    if (type == "paid") {
      setFilter("paid");
      getPaidCourses(slug, limit, subCategorySlug);
    }
    if (type == "all") {
      setFilter("all");
      getCourses(slug, limit, "CategoryPage", subCategorySlug);
    }
  };
  // console.log("Courses=>", courses);

  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const [filter, setFilter] = useState("all");

  const [open, setOpen] = React.useState(false);
  const [demoLink, setDemoLink] = React.useState("");
  const [lectTitle, setlectTitle] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (courses) {
      getAllStoreProduct(
        "",
        "categoryFilter",
        1,
        9,
        courses?.data?.batches[0]?.category?.title
      );
    }
  }, [courses]);

  let first = false;
  useEffect(() => {
    if (!first) {
      pushToDataLayer({
        ecommerce: null, // Clear the previous ecommerce object.
      });
      pushToDataLayer({
        event: "view_page",
        page: "Category Page",
        isLoggedIn: localStorage?.getItem("isLoggedIn"),
        // current_stream_id: item?.id,

        ecommerce: {},
      });
    }
  }, []);

  useEffect(() => {
    const element = document.getElementById("sub-cat-cont");

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [slug, subCategorySlug]);


  const controls = {
    volume: { volumeProgress: true, volumeLogo: true },
    forward: true,
    backward: true,
    play: true,
    progressBar: true,
    settings: true,
    expand: true

  }
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style} className="video_player_box">
          <Container maxWidth="md">
            <div
              className="video_player_header"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <span onClick={handleClose}>
                <CloseIcon />
              </span>
            </div>

            <div className="playerDiv">
              {/* <ReactPlayer width={"100%"} height={300} url={demoLink} /> */}
              <VideoPlayer
                link={demoLink}
                type="Recorded"
                title={lectTitle}
                platform="yt"
                showControls={controls}
              />
            </div>
          </Container>
        </div>
      </Modal>
      <HeadProvider>
        <Link rel="icon" href="https://www.sdcampus.com/favicon.ico" />
        <Meta name="viewport" content="width=device-width,initial-scale=1" />
        <Link rel="apple-touch-icon" href="https://www.sdcampus.com/logo.png" />
        <Link rel="manifest" href="https://www.sdcampus.com/site.webmanifest" />
        <Title>
          {courses?.data
            ? courses?.data?.batches[0]?.category.metaTitle
            : "title"}
        </Title>
        <Meta
          name="description"
          content={courses?.data?.batches[0]?.category.metaDesc}
        />
        <Meta
          name="keywords"
          content={courses?.data?.batches[0]?.category.metaDesc}
        />
        <Meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <Link
          rel="canonical"
          href={`/${courses?.data?.batches[0]?.category.slug}`}
        />
        <link rel="canonical" href={window.location.href} />
        <Meta property="og:locale" content="en_US" />
        <Meta property="og:site_name" content="SD Campus" />
        <Meta property="og:type" content="website" />
        <Meta
          property="og:title"
          content={courses?.data?.batches[0]?.category.metaTitle}
        />
        <Meta
          property="og:description"
          content={courses?.data?.batches[0]?.category.metaDesc}
        />
        <Meta property="og:image" content={courses?.data?.batches[0]?.banner} />
        <Meta property="og:image:width" content="560" />
        <Meta property="og:image:height" content="292" />
        <Meta property="og:url" content={window.location.href} />
        <Meta name="twitter:card" content="summary_large_image" />
        <Meta
          name="twitter:title"
          content={courses?.data?.batches[0]?.category.metaTitle}
        />
        <Meta
          name="twitter:description"
          content={courses?.data?.batches[0]?.category.metaDesc}
        />
        <Meta
          name=" twitter:image"
          content={courses?.data?.batches[0]?.banner}
        />
      </HeadProvider>

      {from !== "after-login" && <Navbar />}
      <Toaster />
      {false ? (
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
        <div className="railway_wrapper">
          <div className="category_banner">
            {" "}
            {/* <img src={poster1} alt="banner" /> */}
            <div style={{ position: "relative" }}>
              <Slider {...settings}>
                {banner?.data?.map((item, index) => {
                  return (
                    <div className="banner" key={index}>
                      {item && (
                        <a
                          href={
                            !subCategorySlug ? (item.link === "batch"
                              ? `${item.categoryDetails?.slug}/${item.batchDetails?.slug}`
                              : item.link === "category"
                                ? `${item.categoryDetails?.slug}`
                                : item.link === "link"
                                  ? `${item.linkWith}`
                                  : "#")
                              :
                              (item.link === "batch"
                                ? `/${item.categoryDetails?.slug}/${item.batchDetails?.slug}`
                                : item.link === "category"
                                  ? `/${item.categoryDetails?.slug}`
                                  : item.link === "link"
                                    ? `${item.linkWith}`
                                    : "#")
                          }
                          target={item.link === "link" ? "_blank" : "_self"}
                        >
                          <img src={item.url} alt={item.title} />
                        </a>
                      )}
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
          <section className="course_cta">
            <div>
              <UseModal from="category" courses={courses} />
            </div>
          </section>
          <div className="bottom_header_wrapper">
            <Wrapper>
              {" "}
              <p style={{ marginBottom: "1rem" }}>
                <span sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                  Home
                </span>{" "}
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
                  className={`${from == "sub" ? "" : "primary_color sub-cat-navigation"
                    }`}
                  style={{ textTransform: "capitalize", cursor: "pointer" }}
                  onClick={() => {
                    // setIndex(-1);

                    pushToDataLayer({
                      ecommerce: null, // Clear the previous ecommerce object.
                    });
                    pushToDataLayer({
                      event: "select_stream",
                      isLoggedIn: localStorage?.getItem("isLoggedIn"),
                      current_stream: currentCategory?.name,
                      current_stream_id: currentCategory?.id,

                      ecommerce: {},
                    });

                    setSelectedCategory(currentCategory?.name);
                    setSelectedCategoryId(currentCategory?.id);
                    setDropDownCategory(currentCategory?.slug);

                    localStorage.setItem(
                      "currentCategoryName",
                      currentCategory?.name
                    );
                    localStorage.setItem(
                      "currentCategoryId",
                      currentCategory?.id
                    );
                    localStorage.setItem(
                      "currentCategorySlug",
                      currentCategory?.slug
                    );
                    if (from == "after-login") {
                      setSelectedCategoryId(currentCategory?.id);
                      setDropDownCategory(currentCategory?.slug);
                      navigate(
                        `/learning/${currentCategory?.slug !== ""
                          ? currentCategory?.slug
                          : "category"
                        }`,
                        {
                          state: {
                            id: currentCategory?.id,
                            name: currentCategory?.name,
                          },
                        }
                      );
                    } else {
                      navigate(
                        `/${currentCategory?.slug !== ""
                          ? currentCategory?.slug
                          : "category"
                        }`,
                        {
                          state: {
                            id: currentCategory?.id,
                            name: currentCategory?.name,
                          },
                        }
                      );
                    }
                  }}
                >
                  {/* {courses?.data?.batches?.length !== 0
                    ? courses?.data?.batches[0]?.category?.title
                    : slug} */}
                  {currentCategory?.name}
                </span>
                {from == "sub" && (
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
                )}
                {from == "sub" && (
                  <span className="primary_color ">
                    {/* {courses?.data?.batches?.length !== 0
                    ? courses?.data?.batches[0]?.category?.title
                    : slug} */}
                    {from !== "sub"
                      ? courses?.data?.batches[0]?.category?.title
                      : currentCategory?.subCategories?.filter((i) =>
                        location?.state?.name == i.title ? i.title : ""
                      )?.[0]?.title}
                  </span>
                )}
              </p>
              <span id="sub-cat-cont"></span>
              <div className="bottom_header_container">
                <div className="bottom_header_upper ">
                  <h1>
                    Batches for{" "}
                    <span style={{ color: "var(--primaryColor)" }}>
                      {from !== "sub"
                        ? courses?.data?.batches[0]?.category?.title
                        : currentCategory?.subCategories?.filter((i) =>
                          location?.state?.name == i.title ? i.title : ""
                        )?.[0]?.title}
                    </span>
                  </h1>
                  {/* <button className="disappear-btn">Explore Now</button> */}
                </div>

                {/* <div className="bottom_header_lower">
                  <div className="course_details_option_container">
                    <a href="#liveclasses">
                      <div className="option_box">
                        <div className="option_box_upper">
                          <p>Live Classes</p>
                          <MdOutlineCastForEducation className="option_box_icon" />
                        </div>
                        <div className="option_box_lower">
                          <p>
                            Watch free online classes by our best educators.{" "}
                          </p>
                        </div>
                      </div>
                    </a>
                    <a href="#batches">
                      <div className="option_box">
                        <div className="option_box_upper">
                          <p>Batches</p>
                          <MdOutlineFactCheck className="option_box_icon" />
                        </div>
                        <div className="option_box_lower">
                          <p>
                            Curated batches to simplify the learning journey for
                            your goal.
                          </p>
                        </div>
                      </div>
                    </a>
                    <a href="#educators">
                      <div className="option_box">
                        <div className="option_box_upper">
                          <p>Educators</p>
                          <HiOutlineUsers className="option_box_icon" />
                        </div>
                        <div className="option_box_lower">
                          <p>India's top educators to learn from</p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="bottom_header_upper disappear-btn-2">
                    <button>Explore Now</button>
                  </div>
                </div> */}
              </div>
              <div
                className={`${isFixed ? "bottom-category-fix" : "bottom-category-container"
                  }`}
              >
                {" "}
                <SubCategory data={currentCategory} />
                {/* <CategoryTabs /> */}
                {/* <div className="filter-category filter-cat-laptop-view">
                  <p
                    onClick={() => handleTypeChange("all")}
                    className={filter == "all" ? "active-filter" : ""}
                  >
                    All Courses
                  </p>
                  <p
                    onClick={() => {
                      handleTypeChange("free");
                    }}
                    className={filter == "free" ? "active-filter" : ""}
                  >
                    Free Courses
                  </p>
                  <p
                    onClick={() => handleTypeChange("paid")}
                    className={filter == "paid" ? "active-filter" : ""}
                  >
                    Paid Courses
                  </p>
                </div> */}
              </div>
            </Wrapper>
          </div>

          <div
            className={`new-courses-upper-container ${isFixed ? "new-courses-upper-container-fixed" : ""
              }`}
          >
            {" "}
            <div className="category_upper_part">
              <Wrapper>
                {/* <div className="filter-category filter-cat-tab-view">
                  <p
                    onClick={() => handleTypeChange("all")}
                    className={filter == "all" ? "active-filter" : ""}
                  >
                    All Courses
                  </p>
                  <p
                    onClick={() => {
                      handleTypeChange("free");
                    }}
                    className={filter == "free" ? "active-filter" : ""}
                  >
                    Free Courses
                  </p>
                  <p
                    onClick={() => handleTypeChange("paid")}
                    className={filter == "paid" ? "active-filter" : ""}
                  >
                    Paid Courses
                  </p>
                </div> */}
                {/* <div className="search_sort">
                
                  <Select
                    sx={{ height: "25px", width: "100px" }}
                    value={filter}
                  >
                    <MenuItem
                      value="all"
                      onClick={() => handleTypeChange("all")}
                    >
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
                </div>{" "} */}
              </Wrapper>
            </div>{" "}
            <div
              className="new_courses_for_you"
              data-aos="fade-right"
              id="batches"
            >
              <Wrapper>
                <div className="category_upper">
                  {" "}
                  <h2>
                    New Courses <span className="primary_color">For You</span>
                  </h2>
                  {courses?.data?.batches?.length > 0 && (
                    <div
                      // to="./view-all"
                      onClick={() => {
                        if (slug && !subCategorySlug) {
                          navigate("./view-all", {
                            state: {
                              data: courses,
                              slug: slug,
                              name: currentCategory?.name,
                              from: "course",
                            },
                          });
                        } else if (subCategorySlug) {
                          navigate("./view-all", {
                            state: {
                              data: courses,
                              slug: subCategorySlug,
                              name: currentCategory?.name,
                              from: "course",
                            },
                          });
                        }
                      }}
                    >
                      <p>View all</p>
                    </div>
                  )}
                </div>
              </Wrapper>
            </div>
          </div>

          <div className="new_courses_container">
            <Wrapper>
              <Course_Exam_Box
                courses={
                  filter == "all"
                    ? courses?.data?.batches
                    : filter == "free"
                      ? freeCoursesData
                      : paidCoursesData
                }
                slug={slug}
                from={from == "after-login" ? "after-login" : "course"}
              />
            </Wrapper>
          </div>

          {storeProducts?.data1?.products?.length > 0 && (
            <div className="related-exambook">
              <Wrapper>
                <div className="related-exambook-upper">
                  <h1>
                    Related{" "}
                    <span style={{ color: "var(--primaryColor)" }}>
                      Exam Books
                    </span>
                  </h1>
                  <p
                    onClick={() => {
                      window.open(
                        `https://sdpublication.com/product/${storeProducts?.data1?.products?.[0]?.category?.slug}`
                      );
                    }}
                  >
                    View All
                  </p>
                </div>
                <div className="related-exambook-lower">
                  <BookBox books={storeProducts} />
                </div>
              </Wrapper>
            </div>
          )}

          {courses?.data?.faculty && courses?.data?.faculty.length > 0 && (
            <div className="top_educators" id="educators">
              <Wrapper>
                <TopEducators
                  from="Course Details"
                  list={courses?.data?.faculty}
                />
              </Wrapper>
            </div>
          )}

          {/* {ebooks?.ebooks?.length > 0 && (
            <div className="recomm-ebooks">
              <Wrapper>
                <div className="recomm-ebooks-upper">
                  <h3>
                    Recommended{" "}
                    <span style={{ color: "var(--primaryColor)" }}>
                      E-Books
                    </span>
                  </h3>
                  <p>View All</p>
                </div>
                <div className="recomm-ebooks-lower">
                  <E_Book_Box ebooks={ebooks} />
                </div>
              </Wrapper>
            </div>
          )} */}
          <div>
            <Wrapper>
              <TestimonialNew />
            </Wrapper>
          </div>

          <div className="book_counselling_category">
            <Wrapper>
              <BookCounselling />
            </Wrapper>
          </div>

          <div style={{ marginBottom: "2rem", paddingTop: "10px" }}>
            <Wrapper>
              {" "}
              {/* <Faq data={faq} staticData={false} /> */}
              {faq?.length > 0 && <NewAccordian data={faq} />}
            </Wrapper>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default CategoryPage;
