import React from "react";


const StudyMaterials = ({ setShow, show, course, setValue, selectedValidity }) => {




  return (
    <>
      <div>
        {" "}
        <div className="course_details_study" id="study-course-details">
          <h2
            style={{
              borderBottom: "3px solid var(--primaryColor)",
              display: "table",
              textAlign: "center",
              margin: "0 auto",
            }}
          >
            Study Materials
          </h2>

          <div className="study_container">
            {course?.data?.batchFeatures?.filter((i) =>
              ["lecture", "note", "dpp", "announcement", "community", "doubt", "quiz"]?.includes(i?.feature)
            )?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="study_box"
                  onClick={() => {
                    if (item?.feature == 'community' || item?.feature == 'doubt' || item?.feature == 'announcement' || item?.feature == 'quiz') { setShow({ classes: false, home: false, lecture: true, type: item?.feature }) }

                    else {
                      setShow({ classes: true, home: false, lecture: false, type: item?.feature })
                    }
                  }


                  }
                >
                  <img src={item?.icon} />
                  {/* <FaRegAddressCard className="study_box_icon" /> */}
                  <p style={{ textTransform: "capitalize" }}>
                    {item?.feature}
                  </p>
                </div>
              );
            })}
            {/* <div
              className="study_box"
              onClick={() =>
                setShow({ classes: true, home: false, lecture: false })
              }
            >
              <FaRegAddressCard className="study_box_icon" />
              <p>Classes</p>
            </div>
            <div
              className="study_box"
              onClick={() =>
                setShow({ classes: true, home: false, lecture: false })
              }
            >
              <MdOutlineRule className="study_box_icon" />
              <p>Tests</p>
            </div>
            <div
              className="study_box"
              onClick={() =>
                setShow({ classes: true, home: false, lecture: false })
              }
            >
              <MdOutlineNoteAlt className="study_box_icon" />
              <p>Notes</p>
            </div>
            <div className="study_box">
              <FaRegNoteSticky className="study_box_icon" />
              <p>DPP’s</p>
            </div>
            <div
              className="study_box"
              onClick={() =>
                setShow({ classes: true, home: false, lecture: false })
              }
            >
              <MdOutlineCampaign className="study_box_icon" />
              <p>Announcemnets</p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudyMaterials;
