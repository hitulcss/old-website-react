import React, { useContext, useEffect, useState } from "react";
import "./NavBar.css";
import hamburgerMenu from "../../../assets/hamburger.png";
import logo from "../../../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { CoursesData } from "../../../context/courses/Courses";
import { MdOutlineArrowDropDown } from "react-icons/md";

const NavBar = () => {
  const { getAllCategory, getBlogs, categoryBlogs } = useContext(CoursesData);

  useEffect(() => {
    getAllCategory();
    getBlogs();
  }, []);

  const [menuOpen, setOpenMenu] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleExamClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleHover = () => {
    setMenuOpen(true);
  };

  const handleLeave = () => {
    setMenuOpen(false);
  };

  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
  };

  const token = localStorage.getItem("token");
  const details = JSON.parse(localStorage.getItem("details"));
  const name = details?.name;
  // console.log('token', token)

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
  ];

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
  };
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="left_section">
          <div className="hamburger" onClick={() => setOpenMenu(!menuOpen)}>
            <img src={hamburgerMenu} alt="hamburgermenu" loading="lazy" />
          </div>
          <div className="logo">
            <NavLink className="title" to="/">
              <img src={logo} alt="logo" loading="lazy"></img>
            </NavLink>
          </div>
        </div>

        <div className="right_section">
          <div className="menu_section">
            <ul className={menuOpen ? "open" : ""}>
              {menuOptions.map((item, index) => (
                <>
                  <li
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <NavLink className="title" to={item.path}>
                      {item.title}
                    </NavLink>
                  </li>
                </>
              ))}

              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "10px",
                  cursor: "pointer",
                  color: "var(--primaryColor)",
                  fontWeight: "600",
                }}
                className="hover_menu li_exams"
                onClick={handleExamClick}
                onMouseEnter={handleHover}
              >
                Exams <MdOutlineArrowDropDown />
              </li>

              {isMenuOpen && (
                <div className="dropdown_menus" onMouseLeave={handleLeave}>
                  {categoryBlogs?.map((item, index) => {
                    return (
                      <div className="menu-items" key={index}>
                        <p>{item.title}</p>
                        {item.data.map((item2, index2) => {
                          return (
                            <div
                              key={index2}
                              onClick={() =>
                                navigate(
                                  `/exams/${item2?.category?.slug}/${item2?.slug}`,
                                  {
                                    state: {
                                      id: item2?.id,
                                    },
                                  }
                                )
                              }
                            >
                              {item2.title}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </ul>
          </div>

          {!isLoggedIn && (
            <div className="login_signup">
              <NavLink className="login_link" to="/login">
                <p>Login | Signup</p>
              </NavLink>
            </div>
          )}

          {isLoggedIn && (
            <>
              <AccountCircleIcon
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                sx={{ fontSize: 30, cursor: "pointer" }}
              />{" "}
            </>
          )}
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
            >
              <Typography sx={{ p: 2, fontWeight: "500" }}>
                {name ? name?.split(" ")[0] : "Me"}
              </Typography>
              {isLoggedIn !== null && (
                <div className="login_signup" onClick={() => handleLogout()}>
                  <p style={{ color: "#fff" }}>Logout</p>
                </div>
              )}
            </Popover>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
