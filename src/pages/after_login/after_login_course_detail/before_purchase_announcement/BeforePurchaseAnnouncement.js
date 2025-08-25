import React, { useContext, useEffect } from "react";
// import "./Announcements.css";
// import Wrapper from "../../../../components/Wrapper/Wrapper";
// import { CoursesData } from "../../../../context/courses/Courses";
import { useNavigate } from "react-router-dom";
import { CoursesData } from "../../../../context/courses/Courses";
import Wrapper from "../../../../components/Wrapper/Wrapper";
const BeforePurchaseAnnoucements = ({ batchSlug, data }) => {
  const { announcementsOfBatch, getAnnouncementsOfBatch } =
    useContext(CoursesData);
  useEffect(() => {
    getAnnouncementsOfBatch(batchSlug);
  }, []);

  const navigate = useNavigate();
  if (!localStorage.getItem("isLoggedIn")) {
    navigate(`/login?source=${window?.location?.href}`);
  }

  return (
    <>
      <div className="announce_wrapper">
        <Wrapper>
          <div className="announce_container">
            {announcementsOfBatch?.data?.length > 0
              ? announcementsOfBatch?.data?.map((item, index) => (
                  <div className="announce_box" key={index}>
                    <div className="announce_descrip">
                      <h2>{item.title}</h2>
                      {/* <p>{item.content}</p> */}
                      <div
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      />
                    </div>
                    <p>{item.createdAt}</p>
                  </div>
                ))
              : "No Class Announcements"}
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default BeforePurchaseAnnoucements;
