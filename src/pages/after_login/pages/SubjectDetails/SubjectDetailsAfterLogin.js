import { useContext } from "react";
import SideBar from "../../../../components/Sidebar/SideBar";
// import CourseDetails from "../../../course_details/CourseDetails"
import NavBar from "../../NavBar/NavBar";
import { CoursesData } from "../../../../context/courses/Courses";
import SubjectDetails from "../../course_info/subjects/subject_detail/SubjectDetails";

const SubjectDetailsAfterLogin = () => {
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
            <SubjectDetails from="after-login" />
          </div>
        </div>
      </>
    </>
  );
};
export default SubjectDetailsAfterLogin;
