import React, { useContext, useEffect, useState } from "react";
import "./CourseInfo.css";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import Wrapper from "../../../components/Wrapper/Wrapper";
import MultipleTabs from "../multiple_tabs/MultipleTabs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CoursesData } from "../../../context/courses/Courses";
import { IoShareSocialOutline } from "react-icons/io5";
import BatchExpire from "../../../components/Batch_Expire/BatchExpire";

const CourseInfo = ({ from, test }) => {
  const location = useLocation();
  const {
    getMyCoursesByBatchId,
    myCourseByBatchId,
    todayClasses,
    getTodayClasses,
  } = useContext(CoursesData);

  const { slug } = useParams();
  useEffect(() => {
    // getMyCoursesByBatchId(location?.state?.id)
    getMyCoursesByBatchId(slug);
  }, []);

  const navigate = useNavigate();
  if (!localStorage.getItem("isLoggedIn")) {
    navigate(`/login?source=${window?.location?.href}`);
  }

  //share modal
  const [showShareModal, setShowShareModal] = useState(false);

  //expiry Modal
  const [showExpiry, setShowExpiry] = useState(true);

  return (
    <>
      {from !== "after-login" && <Navbar />}
      {/* {from == 'after-login' && <SideBar />} */}
      {showExpiry && myCourseByBatchId?.daysLeft < 8 && (
        <BatchExpire setShowExpiry={setShowExpiry} data={myCourseByBatchId} />
      )}
      {/* {true && (
        <BatchExpire setShowExpiry={setShowExpiry} data={myCourseByBatchId} />
      )} */}
      <Wrapper>
        <div className="courseinfo_wrapper">
          <p style={{ fontWeight: "500" }}>
            {/* <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span>   {">"} My    <span style={{ cursor: 'pointer' }} onClick={() => navigate('/my-courses')}>Courses</span>   {">"}{" "} */}
            {/* <span className="primary_color">
              {myCourseByBatchId?.batchName}
             
            </span> */}
          </p>

          <div className="tab_header">
            <div className="tab_header_upper">
              {" "}
              <h1> {myCourseByBatchId?.batchName}</h1>
              <IoShareSocialOutline
                className="tab_header_share_icon"
                onClick={() => {
                  setShowShareModal(!showShareModal);
                }}
              />
            </div>

            <div className="multiple_tab_container">
              <MultipleTabs
                test={test}
                data={myCourseByBatchId}
                from={from}
                slug={slug}
                showShareModal={showShareModal}
                setShowShareModal={setShowShareModal}
              />
            </div>
          </div>
        </div>
      </Wrapper>
      {from !== "after-login" && <Footer />}
    </>
  );
};

export default CourseInfo;
