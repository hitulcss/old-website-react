import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../../../assets/logo.png";
import Wrapper from "../../../../components/Wrapper/Wrapper.js";
import { AiOutlineHeart } from "react-icons/ai";
import { LuPackage } from "react-icons/lu";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { AiOutlineSearch } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Search_Popup from "../../../../components/Search_Popup/Search_Popup.js";
import { Badge } from "@mui/material";
import { FaCaretDown } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import toast from "react-hot-toast";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  //Token
  //Popover
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openSearchInput, setOpenSearchInput] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  // for sticky navbar ------------ ///

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

  // for sticky navbar end ------------ ///

  const handleExamClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleHover = () => {
    setMenuOpen(true);
  };

  const handleLeave = () => {
    setMenuOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const navigate = useNavigate();
  // let isLoggedIn = localStorage.getItem("isLoggedIn");
  const userDetails = isLoggedIn
    ? JSON.parse(localStorage.getItem("userDetails"))
    : "";
  // const userDetails = ''
  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("userDetails");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    toast.success("Logged Out");
    window.location.reload();
  };

  //   const {
  //     storeAlert,
  //     getAlerts,
  //     wishlist,
  //     cart,
  //     addUpdateWishlist,
  //     getAllStoreOrders,
  //     addToCart,
  //     getSearch,
  //     searchResult,
  //     storeOrders,
  //     setCartQuantity,
  //     cartQuantity,
  //   } = useContext(StoreData);

  useEffect(() => {
    // getAlerts();
    // getAllStoreOrders();
    // addUpdateWishlist();
    // addToCart();
  }, []);
  const [searchText, setSearchText] = useState();

  //   const handleSearchChange = (e) => {
  //     getSearch(searchText);
  //   };

  useEffect(() => {
    const data = setTimeout(() => {
      //   handleSearchChange();
    }, 2000);

    return () => clearTimeout(data);
  }, [searchText]);
  // console.log(wishlist?.data?.length);
  // console.log(cart);
  // const [searchText, setSearchText] = useState();
  const handleSearchOnClick = () => {
    navigate(`/searchpage/${searchText}`);
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      //console.log("enter");
      navigate(`/searchpage/${searchText}`);
    }
  };
  return (
    <>
      <div>
        <div className={isSticky ? "sticky" : "nav_wrapper"}>
          <Wrapper>
            <nav>
              <div className="nav_left_side">
                {/* <NavLink to={`${process.env.REACT_APP_URL}`}> */}
                <NavLink to={`/`}>
                  <img src={logo} alt="logo" loading="lazy" />
                </NavLink>
              </div>
              <div className="nav_mid">
                <div
                  className="search_bar"
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setIsClicked(!isClicked);
                  }}
                  // style={{
                  //   border: isClicked
                  //     ? "2px solid var(--primaryColor)"
                  //     : "2px solid gray ",
                  // }}
                >
                  <input
                    type="search"
                    placeholder="Search for Product"
                    name="search"
                    autoComplete="off"
                    // onKeyDown={handleKeyPress}
                    // onChange={(e) => handleSearchChange(e)}
                    // onChange={(e) => setSearchText(e.target.value)}
                  />
                  <div className="search_icon_container">
                    {" "}
                    <AiOutlineSearch
                      className="nav_icon"
                      onClick={() => handleSearchOnClick()}
                    />
                  </div>
                </div>
              </div>

              <div className="nav_right_side">
                <div className="right_collection">
                  <div className="icons">
                    <AiOutlineSearch
                      className="search_icon"
                      size={22}
                      onClick={() => setOpenSearchInput((prev) => !prev)}
                    />

                    <NavLink
                      to="/cart"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#000",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "2px",
                        }}
                      >
                        <Badge color="secondary">
                          <ShoppingBagOutlinedIcon
                            style={{ cursor: "pointer" }}
                            className="nav_icon"
                          />
                        </Badge>
                        <p className="cart_text primary_color">Cart</p>
                      </div>
                    </NavLink>
                  </div>
                  {/* {isLoggedIn ? <button className="login_btn" onClick={handleLogout}>Logout</button> : <button className="login_btn">Login</button>} */}
                  {!isLoggedIn && (
                    <div onClick={handleExamClick}>
                      <div
                        className="login_signup"
                        // className="hover_menu"
                      >
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "3px",
                            color: "var(--primaryColor)",
                          }}
                        >
                          <NavLink
                            to={`/login?ref=${window.location.origin}/learning${window?.location?.pathname}&source=${window.location.href}`}
                          >
                            <span
                              className=" login"
                              onMouseEnter={handleHover}
                              style={{ color: "#fff" }}
                            >
                              Login{" "}
                            </span>
                          </NavLink>
                          <FaCaretDown
                            size={18}
                            onClick={handleExamClick}
                            onMouseEnter={handleHover}
                            style={{ color: "#fff" }}
                          />
                        </p>
                      </div>
                      {isMenuOpen && (
                        <div
                          className="dropdown_menus"
                          onMouseLeave={handleLeave}
                        >
                          <div className="menu-items">
                            {/* <span className="drop_down_nav_menu newuser">

                              <LoginIcon />
                              <NavLink to="/login">
                                <p
                                  className="primary_color "
                                  style={{ cursor: "pointer" }}
                                >
                                  Login
                                </p>
                              </NavLink>
                            </span> */}
                            <span className="drop_down_nav_menu newuser">
                              {/* <p>New User?</p> */}
                              <AppRegistrationIcon />
                              <NavLink
                                to={`/login?ref=${window?.location?.origin}/learning${window.location.pathname}`}
                              >
                                <p
                                  className="primary_color "
                                  style={{ cursor: "pointer" }}
                                >
                                  Login
                                </p>
                              </NavLink>
                            </span>

                            <NavLink to="/wishlist">
                              <div className="drop_down_nav_menu">
                                {" "}
                                <Badge badgeContent={5} color="secondary">
                                  <AiOutlineHeart
                                    style={{
                                      cursor: "pointer",
                                      color: "#000",
                                    }}
                                    className="nav_icon"
                                  />
                                </Badge>
                                <p className="primary_color">Wishlist</p>
                              </div>
                            </NavLink>
                            <NavLink to="/orders">
                              <div className="drop_down_nav_menu">
                                {" "}
                                <Badge badgeContent={5} color="secondary">
                                  <LuPackage
                                    className="nav_icon"
                                    style={{ cursor: "pointer", color: "#000" }}
                                  />{" "}
                                </Badge>
                                <p className="primary_color">Orders</p>
                              </div>
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {(userDetails || isLoggedIn) && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "2px",
                          cursor: "pointer",
                        }}
                      >
                        <AccountCircleIcon
                          aria-describedby={id}
                          variant="contained"
                          onClick={handleClick}
                          sx={{ fontSize: 27 }}
                        />{" "}
                        <p className="orders_text">
                          {" "}
                          {userDetails
                            ? userDetails?.name?.split(" ")[0]
                            : "Me"}
                        </p>
                      </div>
                    </>
                  )}
                  <div>
                    <Popover
                      sx={{ marginRight: "20px" }}
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <Typography
                        sx={{
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        {" "}
                        <FaRegUserCircle size={20} /> Akash
                      </Typography>
                      <NavLink to="/my-profile">
                        <div
                          className="drop_down_nav_menu"
                          style={{ padding: "0 1rem", marginBottom: "20px" }}
                        >
                          {" "}
                          <Badge
                            // badgeContent={wishlist?.data?.length}
                            color="secondary"
                          >
                            <FaRegUser size={20} />
                          </Badge>
                          <p className="primary_color">My Profile</p>
                        </div>
                      </NavLink>

                      {isLoggedIn !== null && (
                        <div
                          className="login_signup logout"
                          onClick={() => handleLogout()}
                        >
                          <p
                            style={{
                              fontSize: "14px",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              marginLeft: "5px",
                              color: "#fff",
                            }}
                          >
                            {" "}
                            <MdLogout size={20} />
                            Logout
                          </p>
                        </div>
                      )}
                    </Popover>
                  </div>
                </div>
              </div>
            </nav>
          </Wrapper>
          {isOpen && (
            <div className="search_pop">
              <Search_Popup setIsOpen={setIsOpen} />
            </div>
          )}

          {openSearchInput && (
            <div
              className="mobile_search"
              onClick={() => {
                setIsOpen(!isOpen);
                setIsClicked(!isClicked);
              }}
            >
              <div className="mobile_search_input">
                <input
                  type="search"
                  placeholder="Search for Product"
                  onKeyDown={handleKeyPress}
                  //   onChange={(e) => handleSearchChange(e)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
