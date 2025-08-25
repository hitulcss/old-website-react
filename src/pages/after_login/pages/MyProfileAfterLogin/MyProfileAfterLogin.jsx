import { useContext, useEffect, useState } from "react";
import SideBar from "../../../../components/Sidebar/SideBar";
// import CourseDetails from "../../../course_details/CourseDetails"
import NavBar from "../../NavBar/NavBar";
import { CoursesData } from "../../../../context/courses/Courses";
import MyProfile from "../../../my_profile/MyProfile";

const MyProfileAfterLogin = () => {
  const { isSidebarExpanded, loadingForMyCourse } = useContext(CoursesData);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
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
            <MyProfile from="after-login" />
          </div>
        </div>
      </>
    </>
  );
};
export default MyProfileAfterLogin;
