import React from "react";
import "./SubjectDetails.css";
import Navbar from "../../../../../components/Navbar/Navbar";
import Footer from "../../../../../components/Footer/Footer";
import Wrapper from "../../../../../components/Wrapper/Wrapper";

import SubjectTabs from "./subject_tabs/SubjectTabs";
import { useLocation, useNavigate } from "react-router-dom";

const SubjectDetails = ({ from }) => {
  const location = useLocation();
  const navigate = useNavigate();
  if (!localStorage.getItem("isLoggedIn")) {
    navigate(`/login?source=${window?.location?.href}`);
  }
  return (
    <>
      {from !== "after-login" && <Navbar />}
      {/* <SideBar /> */}
      <div className="sub_detail_wrapper">
        <Wrapper>
          <div className="sub_detail_container">
            <div className="tab_header">
              <h3>{location?.state?.subjectName}</h3>
              <div className="multiple_tab_container">
                <SubjectTabs from={from} subjectData={location?.state} />
              </div>
            </div>
          </div>
        </Wrapper>
      </div>

      {from !== "after-login" && <Footer />}
    </>
  );
};

export default SubjectDetails;
