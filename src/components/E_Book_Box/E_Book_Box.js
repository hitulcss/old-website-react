import React, { useContext, useEffect, useState } from "react";
import "./E_Book_Box.css";
import eyeBtn from "../../assets/eyebtn.png";
import { PiLightbulbFilamentBold, PiNotebookDuotone } from "react-icons/pi";
import { RiBook2Line } from "react-icons/ri";
import { MdOutlineStar } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Pdf_Popup from "../Pdf_Popup/Pdf_Popup";
import { CoursesData } from "../../context/courses/Courses";
import Loader from "../Loader/Loader";

const E_Book_Box = ({ from, ebooks }) => {
  const navigate = useNavigate();

  //Login drawer
  const { setDrawerOpen } = useContext(CoursesData);

  //loader
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (ebooks) {
      setLoading(false);
    }
  }, [ebooks]);

  return (
    <>
      <div className="ebook_box_wrapper">
        <Pdf_Popup
          url={
            from !== "myebook" ? (ebooks ? ebooks?.ebooks[0]?.preview : "") : ""
          }
          open={open}
          setOpen={setOpen}
        />
        <div className="ebook_box_container">
          {loading ? (
            <div
              style={{
                height: "70vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "250%",
              }}
            >
              <Loader />
            </div>
          ) : (
              from == "myebook" ? ebooks.length > 0 : ebooks?.ebooks?.length > 0
            ) ? (
            (from == "myebook" ? ebooks : ebooks?.ebooks)?.map(
              (item, index) => (
                // ebooks?.map((item, index) => (
                <div className="e-book-box" key={index}>
                  {" "}
                  <div className="ebook_box_upper">
                    <img src={item?.banner} alt="ebookimg" loading="lazy" />
                    {from !== "myebook" ? (
                      <img
                        src={eyeBtn}
                        alt="eyebtn"
                        className="eye-btn"
                        onClick={() => setOpen(true)}
                        loading="lazy"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="ebook_box_mid">
                    <h2>
                      {item?.title.length > 50
                        ? item?.title.slice(0, 50)
                        : item?.title}
                      ...
                    </h2>
                    <div className="book-tags">
                      <div>
                        {" "}
                        <p className="ebook-lang">
                          {item?.language == "hi"
                            ? "Hindi"
                            : item?.language == "en"
                            ? "English"
                            : "Hindi/English"}
                        </p>
                        <p className="ebook-chap">
                          <RiBook2Line />
                          {item?.chapterCount} Chapter
                        </p>
                      </div>

                      <div className="book-keys">
                        {item?.keyFeatures?.length > 0 &&
                          item?.keyFeatures?.map((feature, index) => {
                            return (
                              <p key={index}>
                                <PiLightbulbFilamentBold className="key-icon" />
                                <span>{feature}</span>
                              </p>
                            );
                          })}
                      </div>

                      {from !== "myebook" && (
                        <div className="price-discount">
                          <div className="ebook-rating">
                            <div>
                              {" "}
                              {item?.averageRating}{" "}
                              <MdOutlineStar style={{ color: "#FCA120" }} /> |
                            </div>
                            <div>
                              {item?.reviewCount}{" "}
                              <IoMdCheckmarkCircle
                                style={{ color: "#00A566" }}
                              />
                            </div>
                          </div>
                          <div className="price-dis-lower">
                            <p className="ebook-price">
                              ₹ {item?.salePrice}{" "}
                              <span
                                style={{
                                  color: "var(--textGray)",
                                  fontSize: "0.8rem",
                                }}
                              >
                                <del> ₹ {item?.regularPrice}</del>
                              </span>
                            </p>
                            <p className="ebook-discount">
                              (
                              {(
                                100 -
                                (item?.salePrice / item?.regularPrice) * 100
                              ).toFixed(0)}
                              % OFF)
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <p style={{ border: "1px solid #dfdfdf" }}></p>
                  {from !== "myebook" ? (
                    <div className="ebook_box_lower">
                      <div className="ebook-btns">
                        <button
                          onClick={() =>
                            navigate(`/ebook-details/${item?.slug}`)
                          }
                          className="explore_now"
                        >
                          EXPLORE
                        </button>
                        <button
                          className="buy_now"
                          onClick={() => {
                            if (localStorage?.getItem("isLoggedIn")) {
                              navigate(`/ebook/checkout/${item?.slug}`);
                            } else {
                              setDrawerOpen(true);
                              // navigate(
                              //   `/login?ref=${window.location.origin}/ebook/checkout/${item?.slug}`
                              // );
                            }
                          }}
                        >
                          BUY NOW
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="myebook-btn">
                      <button
                        onClick={() =>
                          navigate(`/ebook-content/${item?.ebookId}`)
                        }
                      >
                        Read Now
                      </button>
                    </div>
                  )}
                </div>
              )
            )
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "40vh",
              }}
            >
              <PiNotebookDuotone className="drawer_icon" />
              <h4>No Ebooks</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default E_Book_Box;
