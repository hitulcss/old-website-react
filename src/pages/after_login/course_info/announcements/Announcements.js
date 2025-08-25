import React, { useContext, useEffect } from "react";
import "./Announcements.css";
import Wrapper from "../../../../components/Wrapper/Wrapper";
import { CoursesData } from "../../../../context/courses/Courses";
import { useNavigate } from "react-router-dom";
const Announcements = ({ batchSlug, data }) => {
  const { announcements, getAnnouncements } = useContext(CoursesData);
  useEffect(() => {
    getAnnouncements(batchSlug);
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
            {announcements?.length > 0
              ? announcements?.map((item, index) => (
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

export default Announcements;
