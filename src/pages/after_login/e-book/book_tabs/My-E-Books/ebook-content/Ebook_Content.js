import React, { useContext, useEffect, useState } from "react";
import "./Ebook_Content.css";
import NavBar from "../../../../NavBar/NavBar";
import SideBar from "../../../../../../components/Sidebar/SideBar";
import { CoursesData } from "../../../../../../context/courses/Courses";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
  IoMdArrowDropdown,
  IoMdArrowDropup,
  IoMdArrowUp,
} from "react-icons/io";
import { IoBulbOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Ebook_Content = () => {
  const [loader, setLoader] = useState(true);

  //context
  const { getMyEbookById, myEbookById } = useContext(CoursesData);

  //ebook id from params
  const { ebookId } = useParams();

  //states
  const [loading, setLoading] = useState(true);
  const [showDropDown, setShowDrpDown] = useState({ id: "", state: false });

  //api call
  useEffect(() => {
    if (ebookId) {
      getMyEbookById({ id: ebookId });
    }
  }, [ebookId]);

  //loading
  useEffect(() => {
    if (myEbookById) {
      setLoading(false);
    }
  }, [myEbookById]);

  const { isSidebarExpanded } = useContext(CoursesData);

  //navigation
  const navigate = useNavigate();

  //dropdown
  const [active, setActive] = useState(0);

  return (
    <>
      <NavBar width={isSidebarExpanded ? 250 : 93} />
      <div>
        <SideBar />
        {loading ? (
          <div
            style={{
              width: "100%",
              height: "60vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div
            className={
              isSidebarExpanded
                ? "after-login-mid open-sidebar"
                : "after-login-mid closed-sidebar"
            }
            style={{ marginLeft: isSidebarExpanded ? "250px" : "100px" }}
          >
            {" "}
            <div className="ebook-content-wrapper">
              <div className="ebook-content-wrapper">
                <div className="ebook-content-header">
                  <div className="content-header-upper">
                    <div>
                      <FaArrowLeftLong
                        className="uppper-icon"
                        onClick={() => {
                          navigate(-1);
                        }}
                      />
                      <h1>{myEbookById?.title}</h1>
                    </div>
                    <IoShareSocialOutline className="uppper-icon" />
                  </div>
                  <div className="content-header-lower">
                    <div>
                      <IoDocumentTextOutline className="conten-header-icon" />
                      {myEbookById?.language == "en"
                        ? "English"
                        : myEbookById?.language == "hi"
                        ? "Hindi"
                        : "English/Hindi"}
                    </div>
                    <div>
                      <HiOutlineViewGrid className="conten-header-icon" />
                      10 PDFs
                    </div>
                    <div>
                      <MdOutlineRemoveRedEye className="conten-header-icon" />
                      Ncert QA
                    </div>
                  </div>
                </div>
                {myEbookById?.chapterWithTopics?.length > 0 ? (
                  myEbookById?.chapterWithTopics?.map((item, index) => (
                    <div className="ebook-sub" key={index}>
                      <div
                        className="ebook-sub-upper"
                        onClick={(e) => {
                          e.preventDefault();

                          if (index == active) {
                            setActive(-1);
                          } else setActive(index);

                          // setShowDrpDown({ id: item?.chapterId, state: false })
                        }}
                      >
                        <div>
                          <h3>{item?.chapterTitle}</h3>
                          <p>{item?.topic?.length} Chapters </p>
                        </div>

                        {active == index ? (
                          <IoMdArrowDropup />
                        ) : (
                          <IoMdArrowDropdown />
                        )}
                      </div>

                      <p style={{ border: "1px solid #dfdfdf" }}></p>

                      <div className="ebook-sub-lower">
                        {active == index &&
                          item?.topics?.map((i, index2) => (
                            <div className="lower-box" key={index2}>
                              <div>
                                {" "}
                                <div className="lower-box-left">
                                  <div className="chapter-icon-container">
                                    <IoBulbOutline className="chapter-icon" />
                                  </div>
                                  <div className="chap-left-detail">
                                    <h2>{i?.topicTitle}</h2>
                                    <p>
                                      <span>10 Pages</span> |{" "}
                                      <span>{i?.details?.size} </span>
                                    </p>
                                  </div>
                                </div>
                                <div className="lower-box-right">
                                  <MdOutlineRemoveRedEye
                                    className="chapter-icon"
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) => {
                                      navigate(
                                        `/ebook-pdf/${ebookId}/${i?.topicId}`
                                      );
                                    }}
                                  />
                                </div>
                              </div>

                              <p style={{ border: "1px solid #dfdfdf" }}></p>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="ebook-sub-upper">
                    <div>
                      <h3 style={{ textAlign: "center" }}>NO Chapters</h3>
                      <p> </p>
                    </div>
                  </div>
                )}

                {/* <div className="ebook-sub-upper">
                <div>
                  <h3>Grammar</h3>
                  <p>10 Chapters </p>
                </div>

                <IoMdArrowDropdown />
              </div>

              <div className="ebook-sub-upper">
                <div>
                  <h3>Grammar</h3>
                  <p>10 Chapters </p>
                </div>

                <IoMdArrowDropdown />
              </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Ebook_Content;
