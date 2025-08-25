import React, { useContext, useState, useEffect } from "react";
import "./Sidebar.css";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { GoLinkExternal } from "react-icons/go";
import { MdOutlineAutoStories } from "react-icons/md";
import { PiBookBookmark } from "react-icons/pi";
import { MdRule } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { IoHeart, IoReceiptOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineErrorOutline } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CoursesData } from "../../context/courses/Courses";
import Tooltip from "@mui/material/Tooltip";
import { LuArrowRightFromLine } from "react-icons/lu";
import { LuArrowLeftFromLine } from "react-icons/lu";
import { pushToDataLayer } from "../../gtm/gtm";
import { MdPlayLesson, MdSlowMotionVideo } from "react-icons/md";
import { Divider } from "@mui/material";
import logo from "../../assets/logo.png";
import { PlayLesson } from "@mui/icons-material";
import homeIcon from "../../assets/svg-icons/Learning.svg";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { setSidebarExpanded, isSidebarExpanded } = useContext(CoursesData);
  const { index } = useParams();
  const index2 = index ? index : localStorage?.getItem("index");
  // useEffect(() => {

  //   setIndex(index ? index : localStorage?.getItem('index'))
  // }, [index, localStorage?.getItem('index')])

  const toggleSidebar = () => {
    // setIsOpen(!isOpen);
    setSidebarExpanded(!isSidebarExpanded);
  };

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 500);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const navigate = useNavigate();
  const setPage = (page) => {
    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "view_page",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
      page: page,
      // current_stream_id: item?.id,

      ecommerce: {},
    });
  };
  return (
    <>
      {!isSmallScreen && (
        <div
          style={{ top: "0" }}
          className={`sidebar3 ${isSidebarExpanded
              ? "open open-responsive visible"
              : "not-open-responsive"
            }`}
        >
          <div className="sidebar-wrapper">
            {isSidebarExpanded && (
              <>
                <div className="sidebar-container">
                  <div className="sidebar-logo-container">
                    {" "}
                    <img
                      src={logo}
                      alt="logo"
                      className="sidebarlogo"
                      onClick={() => navigate("/")}
                      loading="lazy"
                    />
                  </div>
                  <p
                    style={{
                      border: "1px solid #dfdfdf",
                      opacity: "50%",
                      marginTop: "10x",
                    }}
                  ></p>
                  <ul>
                    <li
                      style={{
                        borderBottom: index2 == 0 ? "2px solid #b042f5" : "",
                        background: index2 == 0 ? "#F2ECFF" : "",
                        borderRadius: "5px",
                      }}
                      onClick={() => {
                        setPage("Home");
                        localStorage.setItem("index", 0);
                        navigate("/learning/home");
                      }}
                    >
                      <Link style={{ color: index2 == 0 ? "#b042f5" : "#000" }}>
                        {" "}
                        <GoHome
                          className="drawer_icon"
                          style={{ color: index2 == 0 ? "#b042f5" : "#000" }}
                        />{" "}
                        {/* <img
                          src={homeIcon}
                          alt="learning"
                          className="drawer_icon"
                          style={{ color: index2 == 0 ? "#b042f5" : "#000" }}
                          style={{ color: "blue" }}
                        /> */}
                        <Tooltip title="Home" placement="right-end">
                          Home
                        </Tooltip>
                      </Link>
                    </li>
                    <li
                      style={{
                        borderBottom: index2 == 1 ? "2px solid #b042f5" : "",
                        background: index2 == 1 ? "#F2ECFF" : "",

                        borderRadius: "5px",
                      }}
                      onClick={() => {
                        setPage("My Courses");
                        localStorage.setItem("index", 1);
                        navigate("/learning/my-courses");
                      }}
                    >
                      <Link style={{ color: index2 == 1 ? "#b042f5" : "#000" }}>
                        {" "}
                        <MdOutlineAutoStories
                          className="drawer_icon"
                          style={{ color: index2 == 1 ? "#b042f5" : "#000" }}
                        />{" "}
                        <Tooltip title="My Courses" placement="right-end">
                          My Courses
                        </Tooltip>
                      </Link>
                    </li>

                    <li
                      style={{
                        borderBottom: index2 == 6 ? "2px solid #b042f5" : "",
                        background: index2 == 6 ? "#F2ECFF" : "",
                        borderRadius: "5px",
                      }}
                      onClick={() => {
                        setPage("Short Learning");
                        localStorage.setItem("index", 6);
                        navigate("/learning/short-learning");
                      }}
                    >
                      {" "}
                      <Link style={{ color: index2 == 6 ? "#b042f5" : "#000" }}>
                        {" "}
                        <MdSlowMotionVideo
                          className="drawer_icon"
                          style={{ color: index2 == 6 ? "#b042f5" : "#000" }}
                        />
                        <Tooltip title="Quick Learning" placement="right-end">
                          Quick-Learning
                        </Tooltip>
                      </Link>
                      <span className="new_feature"> New</span>
                    </li>
                    <Divider />
                    {/* <li
                      onClick={() => {
                        navigate("/learning/e-book/3");
                      }}
                    >
                      <Link style={{ color: index2== 3 ? "#b042f5" : "#000" }}>
                        {" "}
                        <PiNotebookDuotone className="drawer_icon" />{" "}
                        <Tooltip title="E-Book" placement="right-end">
                          E-Book
                        </Tooltip>
                      </Link>
                    </li> */}

                    <li
                      style={{
                        borderBottom: index == 2 ? "2px solid #b042f5" : "",
                        background: index == 2 ? "#F2ECFF" : "",
                        borderRadius: "5px",
                      }}
                      onClick={() => {
                        setPage("Test Series");
                        window.open(
                          "https://exams.sdcampus.com?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
                        );
                      }}
                    >
                      <Link>
                        {" "}
                        <PiBookBookmark
                          className="drawer_icon"
                          style={{ color: index2 == 2 ? "#b042f5" : "#000" }}
                        />
                        <Tooltip title="Test Series" placement="right-end">
                          Test Series <GoLinkExternal />
                        </Tooltip>
                      </Link>
                    </li>
                    <li
                      style={{
                        borderBottom: index == 3 ? "2px solid #b042f5" : "",
                        background: index == 3 ? "#F2ECFF" : "",
                        borderRadius: "5px",
                      }}
                      onClick={() => {
                        setPage("Exams");
                        window.open(
                          "https://blog.sdcampus.com/?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
                        );
                      }}
                    >
                      <Link>
                        {" "}
                        <MdRule
                          className="drawer_icon"
                          style={{ color: index2 == 3 ? "#b042f5" : "#000" }}
                        />
                        <Tooltip title="Exams" placement="right-end">
                          Notifications <GoLinkExternal />
                        </Tooltip>
                      </Link>
                    </li>
                    <li
                      style={{
                        borderBottom: index2 == 4 ? "2px solid #b042f5" : "",
                        background: index2 == 4 ? "#F2ECFF" : "",
                        borderRadius: "5px",
                      }}
                      onClick={() => {
                        setPage("Store");
                        window.open("https://sdpublication.com/");
                      }}
                    >
                      <Link>
                        {" "}
                        <MdOutlineShoppingCartCheckout
                          className="drawer_icon"
                          style={{ color: index2 == 4 ? "#b042f5" : "#000" }}
                        />
                        <Tooltip title="Books" placement="right-end">
                          Books <GoLinkExternal />
                        </Tooltip>
                      </Link>
                      <span className="new_feature"> New</span>
                    </li>

                    <Divider />
                    {/* <li
            onClick={() => {
              navigate("/learning/library/5");
            }}
          >
            <Link style={{ color: index2== 5 ? "#b042f5" : "#000" }} >
              {" "}
              <RiFileUserLine className="drawer_icon" />
              <Tooltip title="Library" placement="right-end">Library</Tooltip>
            </Link>
          </li> */}
                    {/* <li
            onClick={() => {
              navigate("/learning/shikshak/6");
            }}
          >
            <Link style={{ color: index2== 6 ? "#b042f5" : "#000" }}>
              {" "}
              <MdOutlineVilla className="drawer_icon" />
              <Tooltip title="Shishak" placement="right-end">Shishak</Tooltip>
            </Link>
          </li> */}
                    {/* <li
                      style={{
                        borderBottom: index2 == 12 ? "2px solid #b042f5" : "",
                        background: index2 == 12 ? "#F2ECFF" : "",
                        borderRadius: "5px",
                      }}
                      onClick={() => {
                        setPage("Our Result");
                        localStorage.setItem("index", 12);
                        navigate("/learning/our-result");
                      }}
                    >
                      <Link
                        style={{ color: index2 == 12 ? "#b042f5" : "#000" }}
                      >
                        {" "}
                        <HiOutlineClipboardDocumentList
                          className="drawer_icon"
                          style={{ color: index2 == 12 ? "#b042f5" : "#000" }}
                        />
                        <Tooltip title="Result" placement="right-end">
                          Our Result
                        </Tooltip>
                      </Link>
                    </li> */}
                    <li
                      style={{
                        borderBottom: index2 == 7 ? "2px solid #b042f5" : "",
                        background: index2 == 7 ? "#F2ECFF" : "",
                        borderRadius: "5px",
                      }}
                      onClick={() => {
                        setPage("Refer and Earn");
                        localStorage.setItem("index", 7);
                        navigate("/learning/refer");
                      }}
                    >
                      <Link style={{ color: index2 == 7 ? "#b042f5" : "#000" }}>
                        {" "}
                        <MdOutlinePayments
                          className="drawer_icon"
                          style={{ color: index2 == 7 ? "#b042f5" : "#000" }}
                        />
                        <Tooltip title="Refer Earn" placement="right-end">
                          Refer Earn
                        </Tooltip>
                      </Link>
                    </li>
                    <li
                      style={{
                        borderBottom: index2 == 8 ? "2px solid #b042f5" : "",
                        background: index2 == 8 ? "#F2ECFF" : "",
                        borderRadius: "5px",
                      }}
                      onClick={() => {
                        setPage("Wallet");
                        localStorage.setItem("index", 8);
                        navigate("/learning/wallet");
                      }}
                    >
                      <Link style={{ color: index2 == 8 ? "#b042f5" : "#000" }}>
                        {" "}
                        <MdOutlineAccountBalanceWallet
                          className="drawer_icon"
                          style={{ color: index2 == 8 ? "#b042f5" : "#000" }}
                        />
                        <Tooltip title="Wallet" placement="right-end">
                          Wallet
                        </Tooltip>
                      </Link>
                    </li>
                    <li
                      style={{
                        borderBottom: index2 == 9 ? "2px solid #b042f5" : "",
                        background: index2 == 9 ? "#F2ECFF" : "",
                        borderRadius: "5px",
                      }}
                      onClick={() => {
                        setPage("Feed");
                        localStorage.setItem("index", 9);
                        navigate("/learning/feed");
                      }}
                    >
                      <Link style={{ color: index2 == 9 ? "#b042f5" : "#000" }}>
                        <IoReceiptOutline
                          className="drawer_icon"
                          style={{ color: index2 == 9 ? "#b042f5" : "#000" }}
                        />
                        <Tooltip title="Feeds" placement="right-end">
                          Feeds
                        </Tooltip>
                      </Link>
                    </li>
                    <li
                      style={{
                        borderBottom: index2 == 10 ? "2px solid #b042f5" : "",
                        background: index2 == 10 ? "#F2ECFF" : "",
                        borderRadius: "5px",
                      }}
                      onClick={() => {
                        setPage("Help & Support");
                        localStorage.setItem("index", 10);
                        navigate("/learning/contact-us");
                      }}
                    >
                      <Link
                        style={{ color: index2 == 10 ? "#b042f5" : "#000" }}
                      >
                        {" "}
                        <MdOutlinePhone
                          className="drawer_icon"
                          style={{ color: index2 == 10 ? "#b042f5" : "#000" }}
                        />
                        <Tooltip title="Help & Support" placement="right-end">
                          Help & Support
                        </Tooltip>
                      </Link>
                    </li>
                    <li
                      style={{
                        borderBottom: index2 == 11 ? "2px solid #b042f5" : "",
                        background: index2 == 11 ? "#F2ECFF" : "",
                        borderRadius: "5px",
                      }}
                      onClick={() => {
                        setPage("About Us");
                        localStorage.setItem("index", 11);
                        navigate("/learning/about-us");
                      }}
                    >
                      <Link
                        style={{ color: index2 == 11 ? "#b042f5" : "#000" }}
                      >
                        {" "}
                        <MdOutlineErrorOutline
                          className="drawer_icon"
                          style={{ color: index2 == 11 ? "#b042f5" : "#000" }}
                        />
                        <Tooltip title="About us" placement="right-end">
                          About US
                        </Tooltip>
                      </Link>
                    </li>

                    {/* <li><LuArrowLeftFromLine className="left-icon" /></li> */}
                  </ul>{" "}
                  {/* <li className="shrink-arrow">
                    <LuArrowLeftFromLine
                      onClick={() => toggleSidebar()}
                      className="left-icon"
                    />
                  </li> */}
                  <Divider />
                  <div className="vande">
                    <h2>!! वंदे मातरम् !!</h2>
                    <p>
                      Made With <IoHeart style={{ color: "red" }} /> in India
                    </p>
                  </div>
                </div>
              </>
            )}
            {!isSidebarExpanded && (
              <>
                <div className="sidebar-container">
                  <div className="sidebar-logo-container">
                    {" "}
                    <img
                      src={logo}
                      alt="logo"
                      className="sidebarlogo"
                      onClick={() => navigate("/")}
                      loading="lazy"
                    />
                  </div>{" "}
                  <p
                    style={{
                      border: "1px solid #dfdfdf",
                      opacity: "50%",
                      marginTop: "10x",
                    }}
                  ></p>
                  <ul className="sidebar-icons">
                    <li
                      onClick={() => {
                        setPage("Home");
                        localStorage.setItem("index", 0);
                        navigate("/learning/home");
                      }}
                    >
                      <Tooltip title="Home" placement="right-end">
                        {" "}
                        <Link
                          style={{ color: index2 == 0 ? "#b042f5" : "#000" }}
                        >
                          {" "}
                          <GoHome
                            className="drawer_icon"
                            style={{ color: index2 == 0 ? "#b042f5" : "#000" }}
                          />
                        </Link>
                      </Tooltip>
                    </li>
                    <li
                      onClick={() => {
                        setPage("My Courses");
                        localStorage.setItem("index", 1);
                        navigate("/learning/my-courses");
                      }}
                    >
                      <Tooltip title="My Courses" placement="right-end">
                        <Link
                          style={{ color: index2 == 1 ? "#b042f5" : "#000" }}
                        >
                          {" "}
                          <MdOutlineAutoStories
                            className="drawer_icon"
                            style={{ color: index2 == 1 ? "#b042f5" : "#000" }}
                          />
                        </Link>
                      </Tooltip>
                    </li>
                    {/* <li
                      onClick={() => {
                        navigate("/learning/e-book/3");
                      }}
                    >
                      <Tooltip title="E-Book" placement="right-end">
                        <Link
                          style={{ color: index2== 3 ? "#b042f5" : "#000" }}
                        >
                          {" "}
                          <PiNotebookDuotone className="drawer_icon" />
                        </Link>
                      </Tooltip>
                    </li> */}

                    <li
                      onClick={() => {
                        setPage("Test Series");
                        window.open(
                          "https://exams.sdcampus.com?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
                        );
                      }}
                    >
                      <Tooltip title="Test Series" placement="right-end">
                        {" "}
                        <Link
                          style={{ color: index2 == 4 ? "#b042f5" : "#000" }}
                        >
                          {" "}
                          <PiBookBookmark
                            className="drawer_icon"
                            style={{ color: index2 == 4 ? "#b042f5" : "#000" }}
                          />
                        </Link>
                      </Tooltip>
                    </li>
                    <li
                      onClick={() => {
                        setPage("Exams");
                        window.open(
                          "https://blog.sdcampus.com/?utm_source=campuswebsite&utm_medium=refer&utm_campaign=shareapp"
                        );
                      }}
                    >
                      <Tooltip title="Exams" placement="right-end">
                        {" "}
                        <Link
                          style={{ color: index2 == 5 ? "#b042f5" : "#000" }}
                        >
                          {" "}
                          <MdRule
                            className="drawer_icon"
                            style={{ color: index2 == 5 ? "#b042f5" : "#000" }}
                          />
                        </Link>
                      </Tooltip>
                    </li>
                    <li
                      onClick={() => {
                        setPage("Store");
                        window.open("https://sdpublication.com/");
                      }}
                    >
                      <Tooltip title="Publication" placement="right-end">
                        {" "}
                        <Link>
                          <MdOutlineShoppingCartCheckout
                            className="drawer_icon"
                            style={{ color: index2 == 5 ? "#b042f5" : "#000" }}
                          />
                        </Link>
                      </Tooltip>
                    </li>

                    <li>
                      <Tooltip title="Micro Learning" placement="right-end">
                        {" "}
                        <Link>
                          <MdPlayLesson
                            className="drawer_icon"
                            style={{ color: index2 == 5 ? "#b042f5" : "#000" }}
                          />
                        </Link>
                      </Tooltip>
                    </li>
                    {/* <li
            onClick={() => {
              navigate("/learning/library/5");
            }}
          >
            <Tooltip title="Library" placement="right-end">
              {" "}
              <Link style={{ color: index2== 5 ? "#b042f5" : "#000" }}>
                <RiFileUserLine className="drawer_icon" />
              </Link>
            </Tooltip>
          </li>
          <li
            onClick={() => {
              navigate("/learning/shikshak/6");
            }}
          >
            <Tooltip title="Shishak" placement="right-end">
              {" "}
              <Link style={{ color: index2== 6 ? "#b042f5" : "#000" }}>
                {" "}
                <MdOutlineVilla className="drawer_icon" />
              </Link>
            </Tooltip>
          </li> */}
                    <li
                      onClick={() => {
                        setPage("Refer And Earn");
                        localStorage.setItem("index", 7);
                        navigate("/learning/refer");
                      }}
                    >
                      <Tooltip title="Refer & Earn" placement="right-end">
                        {" "}
                        <Link
                          style={{ color: index2 == 7 ? "#b042f5" : "#000" }}
                        >
                          {" "}
                          <MdOutlinePayments
                            className="drawer_icon"
                            style={{ color: index2 == 7 ? "#b042f5" : "#000" }}
                          />
                        </Link>
                      </Tooltip>
                    </li>
                    <li
                      onClick={() => {
                        setPage("Wallet");
                        localStorage.setItem("index", 8);
                        navigate("/learning/wallet");
                      }}
                    >
                      <Tooltip title="Wallet" placement="right-end">
                        {" "}
                        <Link
                          style={{ color: index2 == 8 ? "#b042f5" : "#000" }}
                        >
                          {" "}
                          <MdOutlineAccountBalanceWallet
                            className="drawer_icon"
                            style={{ color: index2 == 8 ? "#b042f5" : "#000" }}
                          />
                        </Link>
                      </Tooltip>
                    </li>
                    <li
                      onClick={() => {
                        setPage("Feed");
                        localStorage.setItem("index", 9);
                        navigate("/learning/feed");
                      }}
                    >
                      <Tooltip title="Feeds" placement="right-end">
                        <Link
                          style={{ color: index2 == 9 ? "#b042f5" : "#000" }}
                        >
                          <IoReceiptOutline
                            className="drawer_icon"
                            style={{ color: index2 == 9 ? "#b042f5" : "#000" }}
                          />
                        </Link>
                      </Tooltip>
                    </li>
                    <li
                      onClick={() => {
                        setPage("Help & Support");
                        localStorage.setItem("index", 10);
                        navigate("/learning/contact-us");
                      }}
                    >
                      <Tooltip title="Help & Support" placement="right-end">
                        {" "}
                        <Link
                          style={{ color: index2 == 10 ? "#b042f5" : "#000" }}
                        >
                          {" "}
                          <MdOutlinePhone
                            className="drawer_icon"
                            style={{ color: index2 == 10 ? "#b042f5" : "#000" }}
                          />
                        </Link>
                      </Tooltip>
                    </li>
                    <li
                      onClick={() => {
                        setPage("About Us");
                        localStorage.setItem("index", 11);
                        navigate("/learning/about-us");
                      }}
                    >
                      <Tooltip title="About us" placement="right-end">
                        <Link
                          style={{ color: index2 == 11 ? "#b042f5" : "#000" }}
                        >
                          {" "}
                          <MdOutlineErrorOutline
                            className="drawer_icon"
                            style={{ color: index2 == 11 ? "#b042f5" : "#000" }}
                          />
                        </Link>
                      </Tooltip>
                    </li>
                  </ul>
                  <li className="expand-arrow">
                    <LuArrowRightFromLine
                      onClick={() => toggleSidebar()}
                      className="right-icon"
                    />
                  </li>
                </div>{" "}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
