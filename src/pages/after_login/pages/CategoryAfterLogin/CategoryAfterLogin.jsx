import React, { useContext, useEffect } from "react";
import { CoursesData } from "../../../../context/courses/Courses";
import NavBar from "../../NavBar/NavBar";
import SideBar from "../../../../components/Sidebar/SideBar";
import CourseExamBox from "../../../../components/Course_Exam_Box/Course_Exam_Box";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./CategoryAfterLogin.css";
import { Divider } from "@mui/material";

const CategoryAfterLogin = () => {
  const { setSidebarExpanded, isSidebarExpanded } = useContext(CoursesData);
  const navigate = useNavigate();
  const { slug, subCategorySlug } = useParams();
  const { dropdownCategory, getCourses, courses } = useContext(CoursesData);

  useEffect(() => {
    if (slug && !subCategorySlug) {
      getCourses(slug, 100, "CategoryPage");
    } else if (subCategorySlug) {
      getCourses(slug, 100, "CategoryPage", subCategorySlug);
    }
  }, [slug, subCategorySlug, dropdownCategory]);

  const location = useLocation();

  return (
    <>
      <NavBar from="after-login" width={isSidebarExpanded ? 250 : 93} />
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
          <div className="offering_courses_wrapper category-after-login">
            <div>
              <h1 style={{ padding: "1em 7rem" }}>
                Offering Courses {location?.state?.name}
                {/* {dropdownCategory !== ""
                                    ? courses?.data?.batches
                                        ? `for ${courses?.data?.batches?.[0]?.category?.title}`
                                        : ""
                                    : ""}{" "} */}
              </h1>
              {/* <div> */}
              <p
                className="after_login_view_more __view_all"
                onClick={() =>
                  navigate(
                    `/learning/home/${dropdownCategory == ""
                      ? courses?.data?.batches?.[0]?.category?.slug
                      : dropdownCategory
                    }/view-more/0`,
                    {
                      state: {
                        category: courses?.data?.batches?.[0]?.category?.title,
                        dropdownCategory: dropdownCategory,
                      },
                    }
                  )
                }
              >
                View all
              </p>
              {/* </div> */}
              <Divider />
            </div>
            <div style={{ padding: isSidebarExpanded && "0rem 7rem" }}>
              <CourseExamBox
                from="after-login"
                source="category-page"
                courses={courses?.data?.batches}
              />
            </div>
          </div>

          {/* <CategoryPage from='after-login' /> */}
        </div>
      </div>
    </>
  );
};

export default CategoryAfterLogin;
