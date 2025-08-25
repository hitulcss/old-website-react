import React, { useContext, useState } from "react";
import "./Course_Exam_Box.css";
import { IoCalendarOutline, IoTimer } from "react-icons/io5";
import NotFound from "../NotFound/NotFound";
import { useNavigate } from "react-router-dom";
import { CoursesData } from "../../context/courses/Courses";
import toast from "react-hot-toast";
import { Skeleton, Stack } from "@mui/material";
import { MdOutlineTrackChanges } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CancelIcon from "@mui/icons-material/Cancel";
import { FaFacebookSquare } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaWhatsappSquare } from "react-icons/fa";
import Cookies from "js-cookie";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { pushToDataLayer } from "../../gtm/gtm";
import english from "../../assets/ribben/english_badge.png"
import hindi from "../../assets/ribben/hindi_badge.png"
import hinglish from "../../assets/ribben/hinglish_badge.png"
import validty_feature from "../../assets/validity_feature.png"
const CourseExamBox = ({ courses, slug, from, filter, source }) => {
  const navigate = useNavigate();
  const { freePurchaseCourses, loading, setDrawerOpen } =
    useContext(CoursesData);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showShareModalLink, setShowShareModalLink] = useState("");
  const [index, setIndex] = useState("");

  const title = "";
  const shareUrl = "https://sdcampus.onelink.me/rnhk/SDCampusApp";


  const getBatchLanguage = (lang) => {
    // console.log("BADGE", lang)
    switch (lang) {
      case "hi":
        return hindi;
      case "en":
        return english;
      case "enhi":
        return hinglish;
      default:
        return hinglish;
    }
  };
  return (
    <div style={{ width: "100%" }}>
      {courses?.length > 0 ? (
        <div className="quality_courses">
          {loading}

          {from !== "search" &&
            (from !== "myCourses" ? (
              !loading ? (
                courses?.length > 0 ? (
                  courses?.map((item, idx) => (
                    // console.log( '47' , item) ,
                    <div
                      className="quality_course_box"
                      key={idx}
                      style={{ position: "relative", cursor: "pointer" }}
                      onClick={() => {
                        if (from !== "test") {
                          navigate(
                            `${from == "after-login" ? "/learning" : ""}/${item?.category?.slug || "category"
                            }/${item?.batchSlug || "batch-name"}`,
                            { state: { id: item?.id } }
                          );
                        }
                      }}
                    >
                      <span className="__batch__badge"><img src={getBatchLanguage(item.language)}></img></span>
                      {showShareModal && idx == index && (
                        <div className="share_modal" style={{}}>
                          <CancelIcon
                            className="share_modal_cancel"
                            onClick={() => {
                              setShowShareModal(false);
                            }}
                          />
                          {/* <div className="text_share_modal">{showShareModalLink}</div> */}
                          <div className="share_platforms">
                            <div>
                              {" "}
                              <WhatsappShareButton
                                url={showShareModalLink}
                                title={title}
                                separator="Download Now : "
                                className="Demo__some-network__share-button"
                              >
                                <FaWhatsappSquare className="link_share_icon share_wp" />{" "}
                                Whatsapp
                              </WhatsappShareButton>
                            </div>
                            <div>
                              {" "}
                              <TwitterShareButton
                                url={showShareModalLink}
                                title={title}
                                separator=":"
                                className="Demo__some-network__share-button"
                              >
                                <RiTwitterXFill className="link_share_icon " />{" "}
                                Twitter
                              </TwitterShareButton>
                            </div>
                            <div>
                              {" "}
                              <FacebookShareButton
                                url={showShareModalLink}
                                title={title}
                                separator=":"
                                className="Demo__some-network__share-button"
                              >
                                <FaFacebookSquare className="link_share_icon  share_fb" />{" "}
                                Facebook
                              </FacebookShareButton>
                            </div>
                            <div>
                              {" "}
                              Copy Link
                              <ContentCopyIcon
                                className="refer_icon refer_copy_icon"
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    showShareModalLink
                                  );
                                  toast.dismiss();
                                  toast.success("Copied");
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="course_box_upper">
                        <h1>
                          {item.batchName?.slice(0, 23)}
                          {item.batchName?.length > 23 ? ".." : ""}
                        </h1>

                        <div
                          className="share_box_container"
                          onClick={() => {
                            setIndex(idx);

                            pushToDataLayer({
                              ecommerce: null, // Clear the previous ecommerce object.
                            });
                            pushToDataLayer({
                              event: "share_batch",
                              isLoggedIn: localStorage?.getItem("isLoggedIn"),
                            });

                            setShowShareModal(true);
                            setShowShareModalLink(
                              `${window.location.host}${from == "after-login" ? "" : ""
                              }/${item?.category?.slug || "category"}/${item?.batchSlug || "batch-name"
                              }`
                            );
                          }}
                        >
                          <IoShareSocialOutline />
                        </div>
                      </div>
                      <img
                        src={item.banner}
                        alt="posterImg"
                        height={323}
                        width={400}
                        loading="lazy"
                      />
                      <div className="course_box_description">
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <MdOutlineTrackChanges />Batch for{" "}
                          <strong>{item?.subCategories[0]?.title}</strong>
                          {/* {(item?.subCategories
                            ?.map(curr => curr.title)
                            .reduce((acc, curr) => acc + curr + ", ", "")
                            .substring(0, 25) + "..." || "")} */}
                        </p>
                        <p className="validty_feature_strip">
                          {(item?.validity?.length > 1) ?
                            <img src={validty_feature}></img>
                            : <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                              }}
                            >
                              <IoCalendarOutline />
                              <span style={{ textWrap: "wrap" }}>
                                Start on{" "}
                                <span
                                  style={{ fontWeight: "600", color: "#000" }}
                                >
                                  {item?.startingDate}
                                </span>
                                {from !== "test" && " | End on "}
                                {from !== "test" && (
                                  <span
                                    style={{ fontWeight: "600", color: "#000" }}
                                  >
                                    {item?.endingDate}
                                  </span>
                                )}
                              </span>

                            </span>
                          }
                        </p>

                        <p className="price_discount">
                          {item?.realPrice === "0" ? (
                            <p
                              className="course_price"
                              style={{
                                color:
                                  source == "campaign2"
                                    ? "rgba(228, 110, 48, 1) "
                                    : "var(--primaryColor)",
                                fontSize: "18px",
                                fontWeight: "600",
                              }}
                            >
                              Free
                            </p>
                          ) : (
                            <p className="course_price">
                              <span
                                style={{
                                  color:
                                    source == "campaign2"
                                      ? "rgba(228, 110, 48, 1) "
                                      : "var(--primaryColor)",
                                  fontSize: "17px",
                                }}
                              >
                                {item?.validity?.length > 0
                                  ? `₹${item.validity[item?.validity?.length - 1]
                                    ?.salePrice
                                  } `
                                  : `₹${item.salePrice} `}
                              </span>
                              <span>
                                <del>
                                  {" "}
                                  {item?.validity?.length > 0
                                    ? `₹${item.validity[
                                      item?.validity?.length - 1
                                    ]?.regularPrice
                                    } `
                                    : `₹${item.realPrice} `}{" "}
                                </del>
                              </span>
                            </p>
                          )}
                          <p className="course_discount">
                            {(
                              ((item?.realPrice - item?.salePrice) /
                                item?.realPrice) *
                              100
                            ).toFixed(0) > 0
                              ? (
                                ((item?.realPrice - item?.salePrice) /
                                  item?.realPrice) *
                                100
                              ).toFixed(0) + "% OFF"
                              : "Free"}
                          </p>
                        </p>
                      </div>
                      <p style={{ border: "1px solid #dfdfdf" }}></p>
                      <div className="courses_btns">
                        <button
                          style={{
                            background:
                              source == "campaign2"
                                ? "  rgba(10, 75, 122, 0.08)"
                                : "",
                            color:
                              source == "campaign2"
                                ? "rgba(10, 75, 122, 1) "
                                : "",
                          }}
                          className="explore_now"
                          onClick={() => {
                            if (from !== "test") {
                              navigate(
                                `${from == "after-login" ? "/learning" : ""}/${item?.category?.slug || "category"
                                }/${item?.batchSlug || "batch-name"}`,
                                { state: { id: item?.id } }
                              );
                            }
                          }}
                        >
                          Explore
                        </button>
                        <button
                          className="buy_now"
                          style={{
                            background:
                              source == "campaign2"
                                ? "rgba(10, 75, 122, 1)"
                                : "",
                          }}
                          onClick={() => {
                            if (from !== "test") {
                              if (localStorage.getItem("isLoggedIn")) {
                                // console.log(item)

                                if (item?.salePrice === "0") {
                                  freePurchaseCourses(item?.id);
                                  // toast.success("Course Purchased Successfully!");
                                  // setTimeout(() => {
                                  //   navigate('/my-courses');
                                  // }, 1500);
                                } else {
                                  if (from == "after-login") {
                                    navigate(
                                      `/learning/${item?.category?.slug}/${item?.batchSlug || "batch-name"
                                      }/checkout`,
                                      {
                                        state: {
                                          id: item?.id,
                                          payModal: true,
                                          selectedValidity: item?.validity[
                                            item?.validity?.length - 1
                                          ]
                                            ? item?.validity[
                                            item?.validity?.length - 1
                                            ]
                                            : {
                                              id: "",
                                              salePrice: item?.salePrice,
                                              regularPrice: item?.realPrice,
                                            },
                                        },
                                      }
                                    );
                                  } else {
                                    navigate(
                                      `${from == "after-login" ? "/learning" : ""
                                      }/${item?.category?.slug || "category"}/${item?.batchSlug || "batch-name"
                                      }`,
                                      {
                                        state: {
                                          id: item?.id,
                                          payModal: true,
                                          selectedValidity:
                                            item?.validity[
                                            item?.validity?.length - 1
                                            ],
                                        },
                                      }
                                    );
                                  }
                                }
                              } else {
                                // navigate(
                                Cookies.set("utm_campaign", "sdcampusweb");
                                Cookies.set(
                                  "utm_medium",
                                  `${window.location.origin}/${item?.category?.slug}/${item?.batchSlug}`
                                );

                                Cookies.set(
                                  "utm_source",
                                  `${window.location.origin}/${item?.category?.slug}/${item?.batchSlug}`
                                );

                                setDrawerOpen(true);
                                // `/login?ref=${window.location.href}${item?.category?.slug}/${item?.batchSlug}`
                                // );
                              }
                            }
                          }}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <NotFound title={"Course"} />
                )
              ) : (
                [1, 2, 3, 4].map((i) => {
                  return (
                    <Stack direction="column" key={i}>
                      <Skeleton variant="rounded" width={210} height={200} />
                      <Skeleton
                        variant="text"
                        height={30}
                        width={170}
                        sx={{ fontSize: "1rem" }}
                      />
                      <Skeleton
                        variant="text"
                        height={20}
                        width={140}
                        sx={{ fontSize: "1rem" }}
                      />
                      <Skeleton
                        variant="text"
                        height={10}
                        width={110}
                        sx={{ fontSize: "1rem" }}
                      />
                      <Stack direction="row" spacing={1}>
                        <Skeleton
                          variant="text"
                          height={60}
                          width={100}
                          sx={{ fontSize: "1rem" }}
                        />
                        <Skeleton
                          variant="text"
                          height={60}
                          width={100}
                          sx={{ fontSize: "1rem" }}
                        />
                      </Stack>
                    </Stack>
                  );
                })
              )
            ) : from === "myCourses" && courses?.length !== 0 ? (
              !loading ? (
                courses?.map((item, idx) => (
                  <div className="quality_course_box" key={idx}>
                    <img
                      src={item.banner}
                      alt="posterImg"
                      height={150}
                      width={400}
                      loading="lazy"
                    />
                    <div className="course_box_description">
                      <h1>
                        {item.batchName?.slice(0, 23)}
                        {item.batchName?.length > 23 ? "..." : ""}
                      </h1>
                      <p>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <IoCalendarOutline />
                          <span>
                            Start on{" "}
                            <span style={{ fontWeight: "600", color: "#000" }}>
                              {item?.startingDate}
                            </span>
                            {from !== "test" && " | End on "}
                            {from !== "test" && (
                              <span
                                style={{ fontWeight: "600", color: "#000" }}
                              >
                                {item?.endingDate}
                              </span>
                            )}
                          </span>
                        </span>
                      </p>
                      <p className="course_duration">
                        <IoTimer /> Duration :{" "}
                        <span style={{ fontWeight: "600", color: "#000" }}>
                          {item.duration} Days
                        </span>
                      </p>
                      <p className="price_discount">
                        {item?.realPrice === "0" ? (
                          <p className="course_price">Free</p>
                        ) : (
                          <p className="course_price">
                            <span
                              style={{
                                color:
                                  source == "campaign2"
                                    ? "rgba(228, 110, 48, 1) "
                                    : "var(--primaryColor)",
                                fontSize: "17px",
                              }}
                            >
                              ₹
                              {
                                item.validity[item?.validity?.length - 1]
                                  ?.salePrice
                              }{" "}
                            </span>
                            <span>
                              <del>
                                {" "}
                                ₹
                                {
                                  item.validity[item?.validity?.length - 1]
                                    ?.regularPrice
                                }
                              </del>
                            </span>
                          </p>
                        )}
                        <p className="course_discount">
                          {(
                            ((item.validity[item?.validity?.length - 1]
                              ?.regularPrice -
                              item.validity[item?.validity?.length - 1]
                                ?.salePrice) /
                              item.validity[item?.validity?.length - 1]
                                ?.regularPrice) *
                            100
                          ).toFixed(0)}
                          % OFF
                        </p>
                      </p>
                    </div>
                    <div className="courses_btns">
                      <button
                        className="explore_now"
                        onClick={() => {
                          if (from !== "test") {
                            if (item?.salePrice === "0") {
                              freePurchaseCourses(item?.id);

                              // toast.success("Course Purchased Successfully!");
                              // setTimeout(() => {
                              //   navigate('/my-courses');
                              // }, 1500);
                            } else {
                              navigate(
                                `${from == "after-login" ? "/learning" : ""}/${item?.category?.slug || "category"
                                }/${item?.batchSlug || "batch-name"}`,
                                { state: { id: item?.id } }
                              );
                            }
                          }
                        }}
                      >
                        Explore
                      </button>
                      <button
                        className="buy_now"
                        onClick={() => {
                          if (from !== "test") {
                            if (localStorage.getItem("isLoggedIn")) {
                              navigate(
                                `${from == "after-login" ? "/learning" : ""}/${item?.category?.slug || "category"
                                }/${item?.batchSlug || "batch-name"}`,
                                {
                                  state: {
                                    id: item?.id,
                                    payModal: true,
                                    selectedValidity: item?.validity[
                                      item?.validity?.length - 1
                                    ]
                                      ? item?.validity[
                                      item?.validity?.length - 1
                                      ]
                                      : {
                                        id: "",
                                        salePrice: item?.salePrice,
                                        regularPrice: item?.realPrice,
                                      },
                                  },
                                }
                              );
                            } else {
                              // navigate(
                              Cookies.set("utm_campaign", "sdcampusweb");
                              Cookies.set(
                                "utm_medium",
                                `${window.location.origin}/${item?.category?.slug}/${item?.batchSlug}`
                              );
                              Cookies.set(
                                "utm_source",
                                `${window.location.origin}/${item?.category?.slug}/${item?.batchSlug}`
                              );

                              setDrawerOpen(true);
                              // `/login?ref=${window.location.href}${item?.category?.slug}/${item?.batchSlug}`
                              // );
                            }
                          }
                        }}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <NotFound title={"New Courses"} />
              )
            ) : (
              [1, 2, 3, 4].map((i) => {
                return (
                  <Stack direction="column" key={i}>
                    <Skeleton variant="rounded" width={210} height={200} />
                    <Skeleton
                      variant="text"
                      height={30}
                      width={170}
                      sx={{ fontSize: "1rem" }}
                    />
                    <Skeleton
                      variant="text"
                      height={20}
                      width={140}
                      sx={{ fontSize: "1rem" }}
                    />
                    <Skeleton
                      variant="text"
                      height={10}
                      width={110}
                      sx={{ fontSize: "1rem" }}
                    />
                    <Stack direction="row" spacing={1}>
                      <Skeleton
                        variant="text"
                        height={60}
                        width={100}
                        sx={{ fontSize: "1rem" }}
                      />
                      <Skeleton
                        variant="text"
                        height={60}
                        width={100}
                        sx={{ fontSize: "1rem" }}
                      />
                    </Stack>
                  </Stack>
                );
              })
            ))}

          {from == "search" &&
            (courses?.length !== 0 ? (
              !loading ? (
                courses?.map((item, index) => (
                  <div className="quality_course_box" key={index}>
                    <img
                      src={item?.banner[0]?.fileLoc}
                      alt="posterImg"
                      height={150}
                      width={400}
                      loading="lazy"
                    />
                    <div className="course_box_description">
                      <h1>
                        {item.batch_name?.slice(0, 23)}
                        {item.batch_name?.length > 23 ? "..." : ""}
                      </h1>

                      <p>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <IoCalendarOutline />
                          <span>
                            Start on{" "}
                            <span style={{ fontWeight: "600", color: "#000" }}>
                              {item?.starting_date}
                            </span>
                            {from !== "test" && " | End on "}
                            {from !== "test" && (
                              <span
                                style={{ fontWeight: "600", color: "#000" }}
                              >
                                {item?.ending_date}
                              </span>
                            )}
                          </span>
                        </span>
                      </p>
                      <p className="course_duration">
                        <IoTimer /> Duration :{" "}
                        <span style={{ fontWeight: "600", color: "#000" }}>
                          {item?.validity} Days
                        </span>
                      </p>
                      <p className="price_discount">
                        {item?.realPrice === "0" ? (
                          <p
                            className="course_price"
                            style={{
                              color:
                                source == "campaign2"
                                  ? "rgba(228, 110, 48, 1)"
                                  : "var(--primaryColor)",
                              fontSize: "17px",
                              fontWeight: "600",
                            }}
                          >
                            Free
                          </p>
                        ) : (
                          <p className="course_price">
                            <span
                              style={{
                                color:
                                  source == "campaign2"
                                    ? "rgba(228, 110, 48, 1) "
                                    : "",
                                fontSize: "17px",
                                fontWeight: "600",
                              }}
                            >
                              ₹{item.discount}{" "}
                            </span>
                            <span>
                              <del>₹{item?.charges}</del>
                            </span>
                          </p>
                        )}
                        <p className="course_discount">
                          {(
                            ((item?.charges - item?.discount) / item?.charges) *
                            100
                          ).toFixed(0)}
                          % OFF
                        </p>
                      </p>
                    </div>
                    <div className="courses_btns">
                      <button
                        className="explore_now"
                        onClick={() => {
                          if (from !== "test") {
                            if (item?.charges === "0") {
                              freePurchaseCourses(item?.id);
                              // toast.success("Course Purchased Successfully!");
                              // setTimeout(() => {
                              //   navigate('/my-courses');
                              // }, 1500);
                            } else {
                              navigate(
                                `${from == "after-login" ? "/learning" : ""}/${item?.category?.slug || "category"
                                }/${item?.slug || "batch-name"}`,
                                { state: { id: item?.id } }
                              );
                            }
                          }
                        }}
                      >
                        Explore Now
                      </button>
                      <button
                        className="buy_now"
                        onClick={() => {
                          if (from !== "test") {
                            if (localStorage.getItem("isLoggedIn")) {
                              navigate(
                                `${from == "after-login" ? "/learning" : ""}/${item?.category?.slug || "category"
                                }/${item?.slug || "batch-name"}`,
                                { state: { id: item?.id, payModal: true } }
                              );
                            } else {
                              // navigate(
                              Cookies.set("utm_campaign", "sdcampusweb");
                              Cookies.set(
                                "utm_medium",
                                `${window.location.origin}/${item?.category?.slug}/${item?.slug}`
                              );
                              Cookies.set(
                                "utm_source",
                                `${window.location.origin}/${item?.category?.slug}/${item?.slug}`
                              );

                              setDrawerOpen(true);
                              // `/login?ref=${window.location.href}${item?.category?.slug}/${item?.slug}`
                              // );
                            }
                          }
                        }}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <NotFound title={"New Courses"} />
              )
            ) : (
              [1, 2, 3, 4].map((i) => {
                return (
                  <Stack direction="column" key={i}>
                    <Skeleton variant="rounded" width={210} height={200} />
                    <Skeleton
                      variant="text"
                      height={30}
                      width={170}
                      sx={{ fontSize: "1rem" }}
                    />
                    <Skeleton
                      variant="text"
                      height={20}
                      width={140}
                      sx={{ fontSize: "1rem" }}
                    />
                    <Skeleton
                      variant="text"
                      height={10}
                      width={110}
                      sx={{ fontSize: "1rem" }}
                    />
                    <Stack direction="row" spacing={1}>
                      <Skeleton
                        variant="text"
                        height={60}
                        width={100}
                        sx={{ fontSize: "1rem" }}
                      />
                      <Skeleton
                        variant="text"
                        height={60}
                        width={100}
                        sx={{ fontSize: "1rem" }}
                      />
                    </Stack>
                  </Stack>
                );
              })
            ))}
        </div>
      ) : (
        <NotFound title="Courses" from={from} />
      )}{" "}
    </div>
  );
};

export default CourseExamBox;
