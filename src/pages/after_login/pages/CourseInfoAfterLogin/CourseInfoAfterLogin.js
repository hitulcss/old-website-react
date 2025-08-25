import { useContext } from "react";
import SideBar from "../../../../components/Sidebar/SideBar";
// import CourseDetails from "../../../course_details/CourseDetails"
import NavBar from "../../NavBar/NavBar";
import Course_Details from "../../course_details/Course_Details";
import MyCourses from "../../my_courses/MyCourses";
import { CoursesData } from "../../../../context/courses/Courses";
import CourseInfo from "../../course_info/CourseInfo";
import { useLocation } from "react-router-dom";

const CourseInfoAfterLogin = () => {
  const location = useLocation();

  const { setSidebarExpanded, isSidebarExpanded } = useContext(CoursesData);
  return (
    <>
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
            <CourseInfo test={location?.state?.test} from="after-login" />
          </div>
        </div>
      </>
    </>
  );
};
export default CourseInfoAfterLogin;
