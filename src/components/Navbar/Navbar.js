import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, useNavigate } from "react-router-dom";
import DropdownOption from "../Dropdown_option/DropdownOption";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CoursesData } from "../../context/courses/Courses";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";
import Search_Popup from "../Search/Search_Popup";
import giftIcon from "../../assets/gift.png";
import LoginDrawer from "../../pages/auth/loginDrawer/LoginDrawer";
import { pushToDataLayer } from "../../gtm/gtm";
import { RiMenu2Line } from "react-icons/ri";
import { Avatar } from "@mui/material";
import avatar from "../../assets/avatar2.png";
import { FaRegUser } from "react-icons/fa";
import { BiBookReader } from "react-icons/bi";
import { MdOutlineLogout } from "react-icons/md";

const Navbar = ({ from, campaign }) => {
  const {
    getAllCategory,
    category,
    selectedCategory,
    setSelectedCategory,
    categoryBlogs,
    getBlogs,
    getSearch,
    searchResult,
    stickyNav,
  } = useContext(CoursesData);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    getAllCategory();
    // getBlogs();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 400) {
        if (from == "courseDetails") {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
        // setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [menuOpen, setOpenMenu] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  // const [isMenuOpen, setMenuOpen] = useState(false);
  // const [openSearchInput, setOpenSearchInput] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  // const handleExamClick = () => {
  //   setMenuOpen(!isMenuOpen);
  // };

  // const handleHover = () => {
  //   setMenuOpen(true);
  // };
  // const handleLeave = () => {
  //   setMenuOpen(false);
  // };

  const handleSearchClick = () => {
    if (searchText == "") {
      setIsExpanded(!isExpanded);
    } else {
      getSearch(searchText);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);
    if (searchResult !== "") {
      getSearch(value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (searchResult == "") {
        toast.dismiss();
        toast("Enter Something");
      } else {
        navigate(`/search/${searchText}`);

        getSearch(searchText);
      }
    }
  };

  const token = localStorage.getItem("token");
  const details = JSON.parse(localStorage.getItem("details"));
  const name = details?.name;

  //Popover
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const menuOptions = [
    {
      title: "Test Series",
      path: "https://exams.sdcampus.com?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp",
      icon: null,
    },
    {
      title: "Publication",
      path: token
        ? `https://sdpublication.com/?token=${token}&utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp`
        : `https://sdpublication.com/?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp`,
      icon: <MdOutlineShoppingCartCheckout size={18} />,
    },
    {
      title: "Exams",
      path: "https://blog.sdcampus.com/?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp",
    },
    // {
    //   title: "E-Book",
    //   path: "/ebook-page",
    // },
  ];

  const navigate = useNavigate();
  var previousPageURL = document.referrer;
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  const userDetails = isLoggedIn
    ? JSON.parse(localStorage.getItem("userDetails"))
    : "";
  // const userDetails = ''
  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("userDetails");
    localStorage.removeItem("currentCategoryName");
    localStorage.removeItem("currentCategoryId");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar" style={{ position: !isScrolled ? "sticky" : "" }}>
        <div className="left_section">
          <div className="hamburger" onClick={() => setOpenMenu(!menuOpen)}>
            <RiMenu2Line className="hamburger-icon" />
          </div>
          <div className="logo">
            <NavLink className="title" to="/">
              <img src={logo} alt="logo" loading="lazy"></img>
            </NavLink>
          </div>
          <div className="explore_exam_btn">
            <DropdownOption
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              category={category}
              campaign={campaign}
            />
          </div>
        </div>

        <div className="right_section">
          <div
            className="search_container"
            style={{ width: "230px", display: "none" }}
          >
            <div className={`search-box ${isExpanded ? "expanded" : ""}`}>
              <input
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyPress}
              />
            </div>
            <div
              className={`search-icon ${isExpanded ? "expanded-icon" : ""}`}
              onClick={() => {
                handleSearchClick();
                setIsOpen(!isOpen);
                setIsClicked(!isClicked);
              }}
            >
              <SearchIcon />
            </div>
          </div>

          <div className="menu_section">
            <ul className={menuOpen ? "open" : ""}>
              {menuOptions.map((item, index) => (
                <React.Fragment key={index}>
                  {item.title === "Publication" && "Search" ? (
                    <>
                      <li
                        className="mobile_li"
                        onClick={() => {
                          pushToDataLayer({
                            ecommerce: null, // Clear the previous ecommerce object.
                          });
                          pushToDataLayer({
                            event: "view_store",
                            isLoggedIn: localStorage?.getItem("isLoggedIn"),
                            ecommerce: {},
                          });
                        }}
                      >
                        <div className="store_icon">
                          {item?.icon ? item.icon : null}
                        </div>
                        <NavLink className="title" to={item.path}>
                          {item.title}
                        </NavLink>
                      </li>
                      {/* <li className="mobile_search-container" >
                        <div className="mobile_search">
                          <input type="text" placeholder="Search here..." />
                        </div>
                      </li> */}
                    </>
                  ) : (
                    <li
                      key={index}
                      onClick={() => {
                        pushToDataLayer({
                          ecommerce: null, // Clear the previous ecommerce object.
                        });
                        pushToDataLayer({
                          event:
                            item?.title == "Test Series"
                              ? "view_test_series"
                              : "view_exams",
                          isLoggedIn: localStorage?.getItem("isLoggedIn"),
                          ecommerce: {},
                        });
                      }}
                    >
                      <div>{item?.icon ? item.icon : null}</div>
                      <NavLink className="title" to={item.path} target="_blank">
                        {item.title}
                      </NavLink>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>

          <NavLink
            to={
              token
                ? `https://sdpublication.com/?token=${token}&utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp`
                : `https://sdpublication.com/?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp`
            }
            target="_blank"
          >
            <div
              className="nav_store"
              onClick={() => {
                pushToDataLayer({
                  ecommerce: null, // Clear the previous ecommerce object.
                });
                pushToDataLayer({
                  event: "view_store",
                  isLoggedIn: localStorage?.getItem("isLoggedIn"),
                  ecommerce: {},
                });
              }}
            >
              <MdOutlineShoppingCartCheckout
                className={campaign ? "camp_store_icon" : "store_icon "}
              />
              <span
                className={campaign ? "camp_store_icon" : "store_icon "}
                style={{ fontSize: "16px" }}
              >
                {" "}
                Books
              </span>
            </div>
          </NavLink>
          <div className="gift_container">
            <NavLink
              to="https://play.google.com/store/apps/details?id=com.sdcampus.app&utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
              target="_blank"
            >
              <img
                src={giftIcon}
                alt="gifticon"
                height="28px"
                onClick={() => {
                  pushToDataLayer({
                    ecommerce: null, // Clear the previous ecommerce object.
                  });
                  pushToDataLayer({
                    event: "view_application",
                    isLoggedIn: localStorage?.getItem("isLoggedIn"),
                    ecommerce: {},
                  });
                }}
                loading="lazy"
              />
            </NavLink>
          </div>
          <LoginDrawer />
          {!isLoggedIn && (
            <div
              className="login_signup"
              style={{ background: campaign ? "rgba(10, 75, 122, 1)" : "" }}
            >
              <NavLink
                className="login_link"
                // to={`/login?ref=${window.location.href}`}
                to={`/login?ref=${window?.location?.origin}/learning${window.location.pathname}&source=${window.location.href}`}
              >
                <p className="reg_btn ">Register/Login</p>
              </NavLink>
            </div>
          )}
          {isLoggedIn !== null && (
            <>
              <div
                aria-describedby={id}
                onClick={handleClick}
                className="navbar-username"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <p
                  style={{ fontWeight: "600" }}
                  className="navbar-username-text"
                >
                  {"Hi, "}
                  {name ? name?.split(" ")[0] : "Me"}
                </p>
                <Avatar
                  aria-describedby={id}
                  variant="contained"
                  onClick={handleClick}
                  className=""
                  sx={{ height: 35, width: 35, cursor: "pointer" }}
                  src={details?.profilePhoto ?? avatar}
                />{" "}
              </div>
              {/* <div className="login_signup" onClick={() => handleLogout()}>
                <NavLink className="login_link" >
                  <p className="reg_btn">Logout</p>
                </NavLink>
              </div> */}
            </>
          )}

          {/* {userDetails && (
            <>
              <AccountCircleIcon
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                sx={{ fontSize: 30, cursor: "pointer" }}
              />{" "}
            </>
          )} */}

          <div>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              sx={{ padding: "10px" }}
              style={{ marginTop: "0.5rem" }}
            >
              {isLoggedIn !== null && (
                <>
                  {/* <Typography sx={{ p: 2, fontWeight: "500" }}>
                    {name ? name.split(" ")[0] : "Me"}
                  </Typography> */}
                  <Typography
                    sx={{
                      padding: "10px",
                      fontWeight: "500",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "6px",
                    }}
                    onClick={() => {
                      pushToDataLayer({
                        ecommerce: null, // Clear the previous ecommerce object.
                      });
                      pushToDataLayer({
                        event: "view_my_profile",
                        isLoggedIn: localStorage?.getItem("isLoggedIn"),
                        ecommerce: {},
                      });
                      navigate("/learning/my-profile");
                    }}
                  >
                    <FaRegUser />
                    My Profile
                  </Typography>
                  <Typography
                    sx={{
                      padding: "8px",
                      fontWeight: "500",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "9px",
                    }}
                    onClick={() => {
                      pushToDataLayer({
                        ecommerce: null, // Clear the previous ecommerce object.
                      });
                      pushToDataLayer({
                        event: "view_my_courses",
                        isLoggedIn: localStorage?.getItem("isLoggedIn"),
                        ecommerce: {},
                      });
                      localStorage.setItem("index", 1);
                      navigate("/learning/my-courses");
                    }}
                  >
                    <BiBookReader />
                    My Courses
                  </Typography>
                  <div
                    className="login_signup  "
                    style={{ padding: "10px" }}
                    onClick={handleLogout}
                  >
                    <p
                      style={{
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <MdOutlineLogout style={{ fontSize: "1.2rem" }} />
                      Logout
                    </p>
                  </div>
                </>
              )}
            </Popover>
          </div>
        </div>
        {isOpen && (
          <div className="search_pop">
            <Search_Popup searchResult={searchResult} />
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
