import React, { useContext } from "react";
import "./NoSavedPost.css";
import NavBar from "../NavBar/NavBar";
import SideBar from "../../../components/Sidebar/SideBar";
import { CoursesData } from "../../../context/courses/Courses";
import noSave from "../../../assets/short-learning/nosave.png";
import SavedPosts from "./SavedPosts";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const NoSavedPost = () => {
  const { isSidebarExpanded } = useContext(CoursesData);

  const navigate = useNavigate();
  return (
    <>
      <NavBar from="after-login" width={isSidebarExpanded ? 250 : 93} />
      <div>
        <SideBar />
        <div
          className={
            isSidebarExpanded
              ? "after-login-mid open-sidebar"
              : "after-login-mid closed-sidebar"
          }
          style={{ marginLeft: isSidebarExpanded ? "250px" : "100px" }}
        >
          <div className="saved-post-wrapper">
            <div className="saved-post-container">
              <div className="saved-box">
                <div className="saved-box-upper">
                  <IoMdArrowRoundBack
                    onClick={() => navigate(-1)}
                    style={{ cursor: "pointer" }}
                  />
                  <p> All Saved Posts</p>
                </div>
                <p style={{ border: "1px solid #dfdfdf" }}></p>

                <div className="saved-box-lower">
                  <SavedPosts url={noSave} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoSavedPost;
