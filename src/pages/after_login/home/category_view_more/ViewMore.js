import { useContext, useEffect } from "react";
import SideBar from "../../../../components/Sidebar/SideBar";
import "./ViewMore.css";
import NavBar from "../../NavBar/NavBar";
import { CoursesData } from "../../../../context/courses/Courses";
import { useLocation, useParams } from "react-router-dom";
import CourseExamBox from "../../../../components/Course_Exam_Box/Course_Exam_Box";
import { Divider } from "@mui/material";
const ViewMore = () => {
  const { setSidebarExpanded, isSidebarExpanded, getCourses, courses } =
    useContext(CoursesData);

  const { slug } = useParams();

  useEffect(() => {
    getCourses(slug);
  }, []);

  const location = useLocation()

  return (
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
          <div
            className="view_more_wrapper"
            style={{ padding: isSidebarExpanded && "0rem 7rem" }}
          >
            <div className="viewmore-upper">
              <h1>Offering Courses {location.state.category !== '' && `for ${location.state.category}`}</h1>
              <Divider />
              <CourseExamBox
                from="after-login"
                courses={courses?.data?.batches}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewMore;
