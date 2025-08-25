import React, { useContext, useEffect, useState, useRef } from "react";
import "./DropdownOption.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { NavLink, useNavigate } from "react-router-dom";
import { CoursesData } from "../../context/courses/Courses";
import { pushToDataLayer } from "../../gtm/gtm";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";

const DropdownOption = ({
  selectedCategory,
  setSelectedCategory,
  category,
  from,
  campaign,
}) => {
  const contentEl = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

  const submenu = ["BPSC", "UTET", "JBT", "BPSC TRE", "UPTET"];

  const divRef = useRef(null);

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // console.log(isOpen);

  const { setDropDownCategory, setSelectedCategoryId } =
    useContext(CoursesData);
  useEffect(() => {
    // setDropDownCategory('')
    // setSelectedCategory('')
  }, []);

  //sub-category show state
  const [subCategoryShow, setSubCategoryShow] = useState({
    data: "",
    show: false,
  });

  const navigate = useNavigate();
  return (
    <>
      <div className="dropdown" ref={divRef}>
        {/* {selectedCategory != "" && selectedCategory !== "All"
          ? selectedCategory
          : "All Courses"}{" "} */}
        <button
          onClick={toggleDropdown}
          className="dropdown-button"
          style={{
            color: campaign ? "rgba(10, 75, 122, 1)" : "",
            borderColor: campaign ? "rgba(10, 75, 122, 1)" : "",
          }}
        >
          {selectedCategory != "" &&
          selectedCategory !== "All" &&
          selectedCategory !== null
            ? selectedCategory
            : "All Courses"}{" "}
          <ArrowDropDownIcon className="arrow_down" />
        </button>
        {isOpen && (
          <div className="dropdown-content">
            {/* <NavLink to="/railway">Railway </NavLink> */}
            {/* {category?.data?.map((item, index) => {
              return (
                <div
                  key={index}
                  // to={`/category/${item?.name}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
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

                    setSelectedCategory(item?.name);
                    setSelectedCategoryId(item?.id);
                    setDropDownCategory(item?.slug);
                    toggleDropdown();
                    localStorage.setItem("currentCategoryName", item?.name);
                    localStorage.setItem("currentCategoryId", item?.id);
                    localStorage.setItem("currentCategorySlug", item?.slug);
                    if (from == "after-login") {
                      setSelectedCategoryId(item?.id);
                      setDropDownCategory(item?.slug);
                      navigate(
                        `/learning/${
                          item?.slug !== "" ? item?.slug : "category"
                        }`,
                        { state: { id: item?.id, name: item?.name } }
                      );
                    } else {
                      navigate(
                        `/${item?.slug !== "" ? item?.slug : "category"}`,
                        { state: { id: item?.id, name: item?.name } }
                      );
                    }
                  }}
                >
                  {item?.name}
                </div>
              );
            })} */}

            <div
              className="explore-container"
              onMouseLeave={() => {
                if (window.innerWidth > 500) {
                  setSubCategoryShow({ data: "", show: false });
                }
              }}
            >
              {" "}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {category?.data?.map?.((item, index) => {
                  return (
                    <>
                      <div className="category_list_inner" key={index}>
                        <div
                          className="explore_left"
                          onMouseEnter={() => {
                            if (window.innerWidth > 500)
                              setSubCategoryShow({ data: item, show: true });
                          }}
                        >
                          <div
                            className="explore-left-inner"
                            onClick={() => setShow(!show)}
                          >
                            <div>
                              {" "}
                              <div>
                                {" "}
                                <img
                                  src={item?.banner}
                                  alt="img"
                                  loading="lazy"
                                />
                              </div>
                              <div
                                className="explore-mid"
                                onClick={() => {
                                  pushToDataLayer({
                                    ecommerce: null, // Clear the previous ecommerce object.
                                  });
                                  pushToDataLayer({
                                    event: "select_stream",
                                    isLoggedIn:
                                      localStorage?.getItem("isLoggedIn"),
                                    current_stream: item?.name,
                                    current_stream_id: item?.id,

                                    ecommerce: {},
                                  });

                                  setSelectedCategory(item?.name);
                                  setSelectedCategoryId(item?.id);
                                  setDropDownCategory(item?.slug);
                                  toggleDropdown();
                                  localStorage.setItem(
                                    "currentCategoryName",
                                    item?.name
                                  );
                                  localStorage.setItem(
                                    "currentCategoryId",
                                    item?.id
                                  );
                                  localStorage.setItem(
                                    "currentCategorySlug",
                                    item?.slug
                                  );
                                  if (from == "after-login") {
                                    setSelectedCategoryId(item?.id);
                                    setDropDownCategory(item?.slug);
                                    navigate(
                                      `/learning/${
                                        item?.slug !== ""
                                          ? item?.slug
                                          : "category"
                                      }`,
                                      {
                                        state: {
                                          id: item?.id,
                                          name: item?.name,
                                        },
                                      }
                                    );
                                  } else {
                                    navigate(
                                      `/${
                                        item?.slug !== ""
                                          ? item?.slug
                                          : "category"
                                      }`,
                                      {
                                        state: {
                                          id: item?.id,
                                          name: item?.name,
                                        },
                                      }
                                    );
                                  }
                                }}
                              >
                                <h2>{item?.name}</h2>
                                {/* <p>{item?.subCategories?.length > 0 && item?.subCategories?.map((subCat) => `${subCat?.title}, `)} </p> */}
                              </div>
                            </div>

                            {item?.subCategories?.length > 0 && (
                              <div>
                                {show &&
                                window.innerWidth < 500 &&
                                subCategoryShow?.data?.id == item?.id ? (
                                  <FaAngleDown
                                    className="explore-icon"
                                    onClick={() => {
                                      if (window.innerWidth < 500)
                                        setSubCategoryShow({
                                          data: "",
                                          show: false,
                                        });
                                    }}
                                  />
                                ) : (
                                  <FaAngleRight
                                    className="explore-icon"
                                    onClick={() => {
                                      if (window.innerWidth < 500)
                                        setSubCategoryShow({
                                          data: item,
                                          show: true,
                                        });
                                    }}
                                  />
                                )}
                              </div>
                            )}
                          </div>
                          {/* <div className="explore_right">
                          <div className="explore-right-inner">
                            {submenu.map((item, index) => (
                              <p key={index}>{item}</p>
                            ))}
                          </div>
                        </div> */}

                          {item?.subCategories?.length > 0 &&
                            window?.innerWidth < 500 &&
                            subCategoryShow?.data?.id == item?.id && (
                              <div>
                                {" "}
                                <div
                                  className="explore-right-inner-phone"
                                  style={{
                                    height: show
                                      ? contentEl?.current?.scrollHeight + 20
                                      : "0px",
                                    overflow: "hidden",
                                    padding: show ? "10px" : "0px",
                                  }}
                                  ref={contentEl}
                                >
                                  {item?.subCategories?.length > 0 &&
                                    item?.subCategories?.map((i, idx) => {
                                      return (
                                        <p
                                          key={idx}
                                          onClick={() => {
                                            pushToDataLayer({
                                              ecommerce: null, // Clear the previous ecommerce object.
                                            });
                                            pushToDataLayer({
                                              event: "select_stream",
                                              isLoggedIn:
                                                localStorage?.getItem(
                                                  "isLoggedIn"
                                                ),
                                              current_stream: item?.name,
                                              current_stream_id: item?.id,

                                              ecommerce: {},
                                            });

                                            setSelectedCategory(
                                              subCategoryShow?.data?.name
                                            );
                                            setSelectedCategoryId(
                                              subCategoryShow?.data?.id
                                            );
                                            setDropDownCategory(
                                              subCategoryShow?.data?.slug
                                            );

                                            localStorage.setItem(
                                              "currentCategoryName",
                                              subCategoryShow?.data?.name
                                            );
                                            localStorage.setItem(
                                              "currentCategoryId",
                                              subCategoryShow?.data?.id
                                            );
                                            localStorage.setItem(
                                              "currentCategorySlug",
                                              subCategoryShow?.data?.slug
                                            );
                                            if (from == "after-login") {
                                              setSelectedCategoryId(
                                                subCategoryShow?.data?.id
                                              );
                                              setDropDownCategory(
                                                subCategoryShow?.data?.slug
                                              );
                                              navigate(
                                                `/learning/${
                                                  subCategoryShow?.data
                                                    ?.slug !== ""
                                                    ? subCategoryShow?.data
                                                        ?.slug
                                                    : "category"
                                                }/${
                                                  item?.slug !== ""
                                                    ? item?.slug
                                                    : "category"
                                                }`,
                                                {
                                                  state: {
                                                    id: item?.id,
                                                    name: item?.name,
                                                  },
                                                }
                                              );
                                            } else {
                                              navigate(
                                                `/${
                                                  subCategoryShow?.data
                                                    ?.slug !== ""
                                                    ? subCategoryShow?.data
                                                        ?.slug
                                                    : "category"
                                                }/${
                                                  i?.slug !== ""
                                                    ? i?.slug
                                                    : "category"
                                                }`,
                                                {
                                                  state: {
                                                    id: i?.id,
                                                    name: i?.name,
                                                  },
                                                }
                                              );
                                            }
                                          }}
                                        >
                                          {i?.title}
                                        </p>
                                      );
                                    })}
                                </div>
                              </div>
                            )}

                          <p
                            style={{
                              border: "1px solid #dfdfdf",
                            }}
                          ></p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
              {subCategoryShow?.data?.subCategories?.length > 0 &&
                window?.innerWidth > 500 && (
                  <div
                    className="explore_right"
                    style={{
                      display: subCategoryShow?.show ? "block" : "none",
                    }}
                    onMouseEnter={() => {
                      if (window.innerWidth > 500)
                        setSubCategoryShow((prev) => ({ ...prev }));
                    }}
                  >
                    <div className="explore-right-inner">
                      {subCategoryShow?.data?.subCategories?.map(
                        (item, index) => (
                          <p
                            key={index}
                            onClick={() => {
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

                              setSelectedCategory(subCategoryShow?.data?.name);
                              setSelectedCategoryId(subCategoryShow?.data?.id);
                              setDropDownCategory(subCategoryShow?.data?.slug);

                              localStorage.setItem(
                                "currentCategoryName",
                                subCategoryShow?.data?.name
                              );
                              localStorage.setItem(
                                "currentCategoryId",
                                subCategoryShow?.data?.id
                              );
                              localStorage.setItem(
                                "currentCategorySlug",
                                subCategoryShow?.data?.slug
                              );
                              if (from == "after-login") {
                                setSelectedCategoryId(
                                  subCategoryShow?.data?.id
                                );
                                setDropDownCategory(
                                  subCategoryShow?.data?.slug
                                );
                                navigate(
                                  `/learning/${
                                    subCategoryShow?.data?.slug !== ""
                                      ? subCategoryShow?.data?.slug
                                      : "category"
                                  }/${
                                    item?.slug !== "" ? item?.slug : "category"
                                  }`,
                                  { state: { id: item?.id, name: item?.name } }
                                );
                              } else {
                                navigate(
                                  `/${
                                    subCategoryShow?.data?.slug !== ""
                                      ? subCategoryShow?.data?.slug
                                      : "category"
                                  }/${
                                    item?.slug !== "" ? item?.slug : "category"
                                  }`,
                                  { state: { id: item?.id, name: item?.name } }
                                );
                              }
                            }}
                          >
                            {item?.title}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DropdownOption;
