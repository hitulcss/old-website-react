import React, { useContext, useEffect, useState, useRef } from "react";
import "./NavBar.css";
import logo from "../../../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import DropdownOption from ".././../../components/Dropdown_option/DropdownOption";
import hamburgerMenu from "../../../assets/hamburger.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CoursesData } from "../../../context/courses/Courses";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";
import Search_Popup from "../../../components/Search/Search_Popup";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import MobileSidebar from "../../../components/Sidebar/MobileSidebar";
import { Avatar } from "@mui/material";
import avatar from "../../../assets/avatar2.png";
import { FaRegUser } from "react-icons/fa";
import { BiBookReader } from "react-icons/bi";
import { MdOutlineLogout } from "react-icons/md";

const NavBar = ({ from, width }) => {
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
    notifications,
    getNotification,
    updateIsRead,
  } = useContext(CoursesData);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    getAllCategory();
    getNotification();
    // getBlogs();
  }, []);

  //reading notification
  const handleNotificationRead = (id) => {
    updateIsRead(id);
  };

  const [menuOpen, setOpenMenu] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  // const [isMenuOpen, setMenuOpen] = useState(false);
  // const [openSearchInput, setOpenSearchInput] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    getNotification();
  };

  const handleClickOutside = () => {
    setIsVisible(false);
  };

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
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    window.location.reload();
    navigate(`/login?source=${window?.location?.href}`);
  };
  const { setSidebarExpanded, isSidebarExpanded } = useContext(CoursesData);
  const toggleSidebar = () => {
    setSidebarExpanded(!isSidebarExpanded);
  };

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        className="navbar1"
        style={{
          position: "sticky",
          marginLeft: isSmallScreen && `${width}px`,
        }}
      >
        <div className="sidebar-toggle-button" onClick={toggleSidebar}>
          {/* {isSidebarExpanded ? <FaTimes /> : <FaBars />} */}
        </div>
        <div className="left_section2">
          {/* {from !== "after-login" && (
            <div
              className="hamburger hamnew"
              onClick={() => setOpenMenu(!menuOpen)}
            >
         
              <img src={hamburgerMenu} alt="hamburgermenu" />
            </div>
          )} */}

          <div className="mob-sidebar">
            {" "}
            <MobileSidebar />
          </div>
          <div className="logo">
            <NavLink className="title newlogo" to="/">
              {/* <img src={logo} alt="logo"></img> */}
            </NavLink>
          </div>
          <div className="explore_exam_btn explore2">
            <DropdownOption
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              category={category}
              from={from}
            />
          </div>
        </div>

        <div className="right_section" style={{ gap: "1.2rem" }}>
          {/* <div className="search_container" style={{ width: "230px" }}>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyPress}
              />
            </div>
            <div
              className={`search-iconn  ${isExpanded ? "expanded-icon " : ""}`}
              onClick={() => {
                handleSearchClick();
                setIsOpen(!isOpen);
                setIsClicked(!isClicked);
              }}
            >
              <SearchIcon />
            </div>
          </div> */}

          <div className="notification-dropdown-container" ref={popupRef}>
            <div className="menu_section" onClick={toggleVisibility}>
              <ul>
                <li>
                  {/* <IoIosNotificationsOutline size={23} className="noti_icon" /> */}
                  <Stack spacing={2} direction="row">
                    <Badge
                      badgeContent={
                        notifications?.filter((i) => !i?.isRead)?.length
                      }
                      // badgeContent="4"
                      color="secondary"
                    >
                      <NotificationsNoneIcon
                        color="action"
                        className="noti_icon"
                        style={{ fontSize: "1.8rem" }}
                      />
                    </Badge>
                  </Stack>
                </li>
              </ul>
            </div>
            {isVisible && (
              <div
                className="notification-dropdown"
                // onClick={handleClickOutside}
                // ref={popupRef}
              >
                <ul>
                  {notifications?.length > 0 ? (
                    notifications?.map((item, index) => {
                      return (
                        <>
                          <li
                            key={index}
                            style={{
                              backgroundColor: item?.isRead ? "" : "#f5e6fe",
                              borderLeft: item?.isRead
                                ? ""
                                : "2px solid var(--primaryColor)",
                            }}
                            onClick={() => {
                              handleNotificationRead(item?.id);
                            }}
                          >
                            <span
                              style={{
                                fontWeight: "600",

                                display: "block",
                              }}
                              className="noti-ttile"
                            >
                              {item?.title}{" "}
                            </span>

                            <span className="noti-content">
                              {" "}
                              {item?.message} ({item?.createdAt})
                            </span>
                          </li>
                        </>
                      );
                    })
                  ) : (
                    <li>
                      <span
                        style={{
                          fontWeight: 700,

                          display: "block",
                        }}
                        className="noti-ttile"
                      >
                        No Notifications{" "}
                      </span>

                      <span className="noti-content"></span>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {!isLoggedIn && (
            <div className="login_signup">
              <NavLink
                className="login_link"
                to={`/login?ref=${window.location.href}`}
              >
                <p className="reg_btn">Register/Login</p>
              </NavLink>
            </div>
          )}
          {isLoggedIn !== null && (
            <>
              <div
                aria-describedby={id}
                onClick={handleClick}
                className="after-login-name"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <p style={{ fontWeight: "600" }} className="name-in-navbar">
                  {"Hi, "}
                  {name ? name?.split(" ")[0] : "Me"}
                </p>
                <Avatar
                  className="after-login-user-icon"
                  aria-describedby={id}
                  variant="contained"
                  onClick={handleClick}
                  sx={{ width: 35, height: 35, cursor: "pointer" }}
                  src={details.profilePhoto ?? avatar}
                ></Avatar>
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
              style={{ marginTop: "0.5rem" }}
            >
              {isLoggedIn !== null && (
                <>
                  <Typography
                    sx={{ fontWeight: "500" }}
                    className="name-dropdown"
                  >
                    {name ? name.split(" ")[0] : "Me"}
                  </Typography>
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
                      if (from == "after-login") {
                        navigate("/learning/my-profile");
                      } else {
                        navigate("/my-profile");
                      }
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
                    }}
                    onClick={() => {
                      if (from == "after-login") {
                        localStorage.setItem("index", 1);
                        navigate("/learning/my-courses");
                      } else {
                        localStorage.setItem("index", 1);
                        navigate("/learning/my-courses");
                      }
                    }}
                  >
                    <BiBookReader /> My Courses
                  </Typography>
                  <div className="login_signup" onClick={handleLogout}>
                    <p
                      style={{
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <MdOutlineLogout />
                      Logout
                    </p>
                  </div>
                </>
              )}
            </Popover>
          </div>
        </div>
        {isOpen && (
          <div className="search_popp">
            <Search_Popup searchResult={searchResult} />
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
