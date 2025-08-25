import React from "react";
// import ValidityModal from "../../../../components/ValidityPopup/ValidityPopup";

const Validity = ({ course, selectedValidity, setSelectedValidity }) => {
  return (
    <>
      <div>
        {" "}
        {course?.data?.validities?.length > 0 && (
          <div className="course_details_info" id={"validity-course-details"}>
            {" "}
            <h2
              style={{
                borderBottom: "3px solid var(--primaryColor)",
              }}
            >
              Select Your Validity
            </h2>
            <div className="validity-container">
              {course?.data?.validities?.map((item, index) => (
                <p
                  key={index}
                  style={{
                    background:
                      (item?.id == selectedValidity?.id || item?.id == selectedValidity?.validityId) && "var(--primaryColor)",
                    color: (item?.id == selectedValidity?.id || item?.id == selectedValidity?.validityId) && "white",
                  }}
                  onClick={() => {
                    setSelectedValidity(item);
                  }}
                >
                  {item?.month} Months
                </p>
              ))}

              {/* <ValidityModal /> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Validity;
