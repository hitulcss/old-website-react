import { useContext, useEffect, useState } from "react";
import SideBar from "../../../../components/Sidebar/SideBar";
// import CourseDetails from "../../../course_details/CourseDetails"
import NavBar from "../../NavBar/NavBar";
import MyCourses from "../../my_courses/MyCourses";
import { CoursesData } from "../../../../context/courses/Courses";
import { useNavigate } from "react-router-dom";
import { HeadProvider, Title } from "react-head";

const MyCoursesAfterLogin = () => {
  const { isSidebarExpanded, loadingForMyCourse, attemptQuiz } =
    useContext(CoursesData);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const navigate = useNavigate();

  let data = localStorage?.getItem("reloadquiz-data");
  useEffect(() => {
    if (data) {
      localStorage.setItem('index', 1)
      navigate("/learning/my-courses");
      attemptQuiz(JSON.parse(data));
      localStorage?.removeItem("reloadquiz-data");
    }
  }, [data]);
  return (
    <>
      <HeadProvider>
        <Title>My Courses - SD Campus </Title>
      </HeadProvider>
      <>
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
            <MyCourses from="after-login" />
          </div>
        </div>
      </>
    </>
  );
};
export default MyCoursesAfterLogin;
