import { useContext, useEffect, useState } from "react";
import SideBar from "../../../../components/Sidebar/SideBar";
// import CourseDetails from "../../../course_details/CourseDetails"
import NavBar from "../../NavBar/NavBar";
import { CoursesData } from "../../../../context/courses/Courses";
import Home from "../../home/Home";
import { useNavigate } from "react-router-dom";
import { HeadProvider, Title } from "react-head";
const Adhayayan = () => {
  const {
    setSidebarExpanded,
    isSidebarExpanded,
    getTodayClasses,
    todayClasses,
  } = useContext(CoursesData);

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      //Today Classes
      getTodayClasses();
    } else {
      navigate(`/login?source=${window?.location?.href}`);
    }
  }, []);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <HeadProvider>
        <Title>Learning - SD Campus </Title>
      </HeadProvider>
      <div className="after_login_wrapper">{/* <MyDrawer /> */}</div>
      <NavBar from="after-login" width={isSidebarExpanded ? 250 : 93} />

      {/* <MyCourses from='after-login' /> */}
      <div>
        {" "}
        <SideBar />
        <div
          className={
            isSidebarExpanded
              ? "after-login-mid open-sidebar"
              : "after-login-mid closed-sidebar"
          }
          style={{ marginLeft: isSidebarExpanded ? "250px" : "100px" }}
        >
          <div
            style={{
              padding: isSidebarExpanded && !isSmallScreen && "0rem 6rem",
            }}
          >
            {" "}
            <Home todayClasses={todayClasses} from="after-login" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Adhayayan;
