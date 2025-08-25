import React, { useContext, useEffect, useRef, useState } from "react";
import "./SubCategory.css";
import { useNavigate, useParams } from "react-router-dom";
import { pushToDataLayer } from "../../gtm/gtm";
import { CoursesData } from "../../context/courses/Courses";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";

const SubCategory = ({ data, from }) => {
  //slugs
  const { slug, subCategorySlug } = useParams();

  //context data
  const { setSelectedCategory, setSelectedCategoryId, setDropDownCategory } =
    useContext(CoursesData);

  //active index
  const [index, setIndex] = useState(-1);

  //dummy data
  const subCategorylist = [
    {
      index: 0,
      title: "All",
    },
    {
      index: 1,
      title: "Category 1",
    },
    {
      index: 2,
      title: "Category 1",
    },
    {
      index: 3,
      title: "Category 1",
    },
    {
      index: 4,
      title: "Category 1",
    },
  ];

  //subCategory Data

  //fixed logic
  const [isFixed, setIsFixed] = useState(false);

  // console.log(isAddToCart?.isAddToCart)
  useEffect(() => {
    // setButtonText(isAddToCart?.isAddToCart ? 'Go To Bag' : 'Add To Cart')
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 850;

      setIsFixed(scrollPosition > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //setting default
  useEffect(() => {
    if (data) {
      setSelectedCategory(data?.name);
      setSelectedCategoryId(data?.id);
      setDropDownCategory(data?.slug);

      localStorage.setItem("currentCategoryName", data?.name);
      localStorage.setItem("currentCategoryId", data?.id);
      localStorage.setItem("currentCategorySlug", data?.slug);
    }
  }, [data]);

  //setting active subCategory
  useEffect(() => {
    if (subCategorySlug) {
      setIndex(subCategorySlug);
    }
  }, [subCategorySlug]);

  //navigation
  const containerRef = useRef(null);
  const handleArrowClick = (direction) => {
    if (!containerRef.current) return;

    // Determine the scroll amount
    const scrollAmount = containerRef.current.offsetWidth / 2; // Scroll half the container's width

    // Scroll left or right based on direction
    containerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };
  const navigate = useNavigate();
  return (
    <>
      {data?.subCategories?.length > 2 && <div className="category-left-icon" onClick={() => handleArrowClick("left")}>
        {" "}
        <FaCircleChevronLeft className="category-left-icon" />
      </div>}
      {data?.subCategories?.length > 0 && (
        <div className={`sub_cat_parent ${isFixed ? "sub_cat_fixed" : ""}`} ref={containerRef}>
          <div
            className={index == -1 ? "active_sub_cat" : ""}
            onClick={() => {
              setIndex(-1);

              pushToDataLayer({
                ecommerce: null, // Clear the previous ecommerce object.
              });
              pushToDataLayer({
                event: "select_stream",
                isLoggedIn: localStorage?.getItem("isLoggedIn"),
                current_stream: data?.name,
                current_stream_id: data?.id,

                ecommerce: {},
              });

              setSelectedCategory(data?.name);
              setSelectedCategoryId(data?.id);
              setDropDownCategory(data?.slug);

              localStorage.setItem("currentCategoryName", data?.name);
              localStorage.setItem("currentCategoryId", data?.id);
              localStorage.setItem("currentCategorySlug", data?.slug);
              if (from == "after-login") {
                setSelectedCategoryId(data?.id);
                setDropDownCategory(data?.slug);
                navigate(
                  `/learning/${data?.slug !== "" ? data?.slug : "category"}`,
                  { state: { id: data?.id, name: data?.name } }
                );
              } else {
                navigate(`/${data?.slug !== "" ? data?.slug : "category"}`, {
                  state: { id: data?.id, name: data?.name },
                });
              }
            }}
          >
            {" "}
            <p className="tab-p">All</p>
          </div>
          {data?.subCategories?.map((item, idx) => {
            return (
              <div
                key={idx}
                className={index == item?.slug ? "active_sub_cat" : ""}
                onClick={() => {
                  setIndex(item?.slug);
                  pushToDataLayer({
                    ecommerce: null, // Clear the previous ecommerce object.
                  });
                  pushToDataLayer({
                    event: "select_stream",
                    isLoggedIn: localStorage?.getItem("isLoggedIn"),
                    current_stream: item?.name,
                    current_stream_id: item?.id,

                    ecommerce: {},
                  });

                  setSelectedCategory(data?.name);
                  setSelectedCategoryId(data?.id);
                  setDropDownCategory(data?.slug);

                  localStorage.setItem("currentCategoryName", data?.name);
                  localStorage.setItem("currentCategoryId", data?.id);
                  localStorage.setItem("currentCategorySlug", data?.slug);
                  if (from == "after-login") {
                    setSelectedCategoryId(data?.id);
                    setDropDownCategory(data?.slug);
                    navigate(
                      `/learning/${data?.slug !== "" ? data?.slug : "category"
                      }/${item?.slug !== "" ? item?.slug : "category"}`,
                      { state: { id: item?.id, name: item?.name } }
                    );
                  } else {
                    navigate(
                      `/${data?.slug !== "" ? data?.slug : "category"}/${item?.slug !== "" ? item?.slug : "category"
                      }`,
                      {
                        state: {
                          id: item?.id,
                          name: item?.title,
                          from: "sub",
                        },
                      }
                    );
                  }
                }}
              >
                <p className="tab-p">{item?.title}</p>
              </div>
            );
          })}
        </div>
      )}
      {data?.subCategories?.length > 2 && <div className="category-right-icon" onClick={() => handleArrowClick("right")}>
        <FaCircleChevronRight />
      </div>}
    </>
  );
};

export default SubCategory;
