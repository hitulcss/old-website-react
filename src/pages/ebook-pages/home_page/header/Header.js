import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import "./Banner.css";
import Wrapper from "../../../../components/Wrapper/Wrapper";
import { LuMoveRight } from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { div, useNavigate } from "react-router-dom";
import { CoursesData } from "../../../../context/courses/Courses";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

const Header = ({ categoryId, from }) => {
  const category = [
    "UGC NET Books",
    "Govt Entrance Books",
    "School Entrance Books",
    "SD Stationery",
    "Accessories",
    "Civil Exams Books",
  ];

  const settings = {
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  const {
    // getCategory,
    // category,
    getAllStoreBanner,
    banner,
    getAllFeatureVideo,
    storeVideos,
    loading,
  } = useContext(CoursesData);

  useEffect(() => {
    // getCategory();
    // if (categoryId) {
    //   getAllStoreBanner(categoryId);
    // }
    // getAllFeatureVideo();
  }, [categoryId]);

  const [showSubCategory, setShowSubCategory] = useState(false);
  const navigate = useNavigate();
  // console.log('banner', banner)
  const [bannerData, setBannerData] = useState(banner?.data);

  const [hoverId, setHoverId] = useState(false);
  const [size, setSize] = useState(0);
  const [count, setCount] = useState();
  const [initialCount, setInitialCount] = useState(0);

  useEffect(() => {
    setCount(6);
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const [currentChildCat, setCurrentChildCat] = useState(null);
  const [coordinates, setCoordinates] = useState(false);

  const toggleDropdown = (childCat) => {
    setCurrentChildCat(childCat);
    setIsOpen(true);
  };

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;

      if (offset > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [currentIndex, setCurrentIndex] = useState(-1);
  return (
    <>
      <div className="header_wrapper">
        <div className="header_container">
          <Wrapper>
            <div className={isSticky ? "sticky-header" : "category_container"}>
              {category.map((item, index) => (
                <div
                  className="cat_item"
                  // style={{ background: "red" }}
                  onMouseEnter={() => {
                    setCurrentIndex(index);
                    toggleDropdown({
                      cat: {
                        icon: item.icon,
                        title: item.title,
                        slug: item.slug,
                        metaTitle: item.metaTitle,
                      },
                      child: item.childCat,
                    });
                  }}
                  onMouseLeave={() => {
                    setCurrentIndex(-1);
                  }}
                  onClick={() => setIsOpen(!isOpen)}
                  key={index}
                >
                  {/* <img src={item?.icon} alt={item?.title} /> */}
                  <p
                    className="category_title"
                    id={`cat-item-${index}`}
                    onMouseLeave={() => {
                      function getPositionXY(element) {
                        let rect = document
                          .getElementById(`cat-item-${index}`)
                          .getBoundingClientRect();

                        if (window.innerWidth - (rect?.x + 650) <= 0) {
                          setCoordinates(true);
                        } else {
                          setCoordinates(false);
                        }
                      }
                      getPositionXY();
                      setHoverId("");
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => {
                      function getPositionXY(element) {
                        let rect = document
                          .getElementById(`cat-item-${index}`)
                          .getBoundingClientRect();

                        if (window.innerWidth - (rect?.x + 650) <= 0) {
                          setCoordinates(true);
                        } else {
                          setCoordinates(false);
                        }
                      }
                      getPositionXY();
                      setHoverId(item.id);
                      setIsOpen(true);
                    }}
                    onClick={() => {
                      navigate(`/c/${item?.slug}`);

                      setIsOpen(true);
                    }}
                  >
                    {item}

                    {isOpen && item.id == hoverId ? (
                      <FaAngleUp />
                    ) : (
                      <FaAngleDown />
                    )}
                  </p>
                  {index == currentIndex && (
                    <div
                      className="dropdown1"
                      style={{ right: coordinates && "0" }}
                      onMouseLeave={() => {
                        setHoverId("");
                        setIsOpen(false);
                      }}
                      onMouseEnter={() => {
                        setHoverId(item.id);
                        setIsOpen(true);
                      }}
                    >
                      {isOpen && (
                        <div className="dropdown-menu">
                          <div className="dropdown-left">
                            <div className="dropdown-item">
                              <h2
                                onClick={(e) =>
                                  navigate(`/c/${currentChildCat?.cat?.slug}`)
                                }
                              >
                                <a
                                // href={`https://store.sdcampus.com/c/${currentChildCat?.cat?.slug}`}
                                // href={`${process.env.REACT_APP_URL}/c/${currentChildCat?.cat?.slug}`}
                                >
                                  {currentChildCat?.cat?.title}
                                </a>
                              </h2>

                              {currentChildCat?.child?.map((item, index) => (
                                <ul key={index}>
                                  <li
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate(
                                        `/c/${currentChildCat?.cat?.slug}/${item?.slug}`
                                      );
                                    }}
                                  >
                                    <a
                                    // href={`https://store.sdcampus.com/c/${currentChildCat?.cat?.slug}/${item?.slug}`}
                                    // href={`${process.env.REACT_APP_URL}/c/${currentChildCat?.cat?.slug}/${item?.slug}`}
                                    >
                                      {item?.title} <LuMoveRight />
                                    </a>
                                  </li>
                                </ul>
                              ))}
                            </div>
                          </div>
                          <div className="dropdown-right">
                            <img
                              src={currentChildCat?.cat?.icon}
                              alt={currentChildCat?.cat?.title}
                              loading="lazy"
                            />
                            {currentChildCat?.cat?.metaTitle !== "" && (
                              <p style={{ fontWeight: "500" }}>
                                {currentChildCat?.cat?.metaTitle}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Wrapper>
          <p
            style={{ border: "1px solid #dfdfdf" }}
            className="header_line"
          ></p>
        </div>

        <div className="header_bottom">
          <div className="header_bottom_banner" style={{ cursor: "pointer" }}>
            {from != "bookdetails" && banner?.data.length > 0 ? (
              <Slider {...settings}>
                {banner?.data?.map((item) => {
                  // console.log(item)
                  const encoded = btoa(item.linkWith?.id);
                  return (
                    <div className="banner_slider" key={item?.id}>
                      {item.link === "product" ? (
                        <a
                          href={`/p/${item?.category?.slug}/${item?.linkWith.slug}`}
                        >
                          <img
                            src={item?.icon}
                            alt={item?.title}
                            loading="lazy"
                          />
                        </a>
                      ) : item.link === "category" ? (
                        <a
                          onClick={() => {
                            navigate(`/c/${item?.linkWith.slug}`, {
                              state: {
                                id: item?.linkWith?.id,
                                slug: item?.linkWith?.slug,
                                name: item?.linkWith?.title,
                              },
                            });
                            localStorage.setItem(
                              "categoryId",
                              item?.linkWith?.id
                            );
                          }}
                        >
                          <img
                            src={item?.icon}
                            alt={item?.title}
                            loading="lazy"
                          />
                        </a>
                      ) : (
                        <a href="#">
                          <img
                            src={item?.icon}
                            alt={item?.title}
                            loading="lazy"
                          />
                        </a>
                      )}
                    </div>
                  );
                })}
              </Slider>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
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

export default Header;
