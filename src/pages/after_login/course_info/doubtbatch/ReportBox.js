import React, { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import "./ReportBox.css";
import { CoursesData } from "../../../../context/courses/Courses";
import toast from "react-hot-toast";

import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  // p: 4,
};
const ReportBox = ({ setShowReport, showReport }) => {
  //context
  const { reportDoubt, reportDoubtComment, reportReplyComment } =
    useContext(CoursesData);

  //reason state
  const [reason, setReason] = useState({ radioField: -1, textField: "" });

  //handling input
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "option") {
      setReason({
        radioField: value,
        textField: reason?.textField,
      });
    }
    if (name == "reason") {
      setReason({
        radioField: reason?.radioField,
        textField: value,
      });
    }
  };

  //submitting report
  const handleReport = () => {
    if (reason?.radioField !== -1) {
      const reasonText = `${reason?.radioField}${
        reason?.textField !== "" ? "----Reason:-" : ""
      }${reason?.textField}`;

      if (showReport?.type == "post") {
        reportDoubt({ id: showReport?.data?.id, reason: reasonText });
        setReason({ radioField: -1, textField: "" });
      }
      if (showReport?.type == "comment") {
        reportDoubtComment({
          id: showReport?.data?.commentId,
          reason: reasonText,
        });
        setReason({ radioField: -1, textField: "" });
      }
      if (showReport?.type == "replyComment") {
        reportReplyComment({
          id: showReport?.data?.replyId,
          reason: reasonText,
        });
        setReason({ radioField: -1, textField: "" });
      }
      setShowReport({ show: false, type: "", data: "" });
    } else {
      toast.dismiss();
      toast.error("Please Choose A Specific Reason...");
    }
  };
  const handleClose = () => {
    setShowReport({ show: false, type: "", data: "" });
  };
  return (
    <>
      <Modal
        open={showReport?.show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="report-wrapper" style={style}>
          <div className="report-upper">
            <h1>Report</h1>
            <IoClose
              className="report-close"
              onClick={() => setShowReport({ show: false, type: "", data: "" })}
            />
          </div>
          <p style={{ border: "1px solid #dfdfdf" }}></p>

          <div className="report-lower-box">
            <div className="report-options">
              {" "}
              <div>
                <label>
                  <p>Harrasment or hateful speech</p>{" "}
                  <input
                    type="radio"
                    name="option"
                    onChange={handleChange}
                    value="Harrasment or hateful speech"
                  />
                </label>
              </div>
              <div>
                <label>
                  {" "}
                  <p>Violence or physical harm</p>
                  <input
                    type="radio"
                    name="option"
                    onChange={handleChange}
                    value="Violence or physical harm"
                  />
                </label>
              </div>
              <div>
                <label>
                  <p>Suspicious, spam, or fake</p>
                  <input
                    type="radio"
                    name="option"
                    onChange={handleChange}
                    value="Suspicious, spam, or fake"
                  />
                </label>
              </div>
              <div>
                <label>
                  <p>Adult content</p>
                  <input
                    type="radio"
                    name="option"
                    onChange={handleChange}
                    value="Adult content"
                  />
                </label>
              </div>
              <div>
                <label>
                  {" "}
                  <p>Other</p>
                  <input
                    type="radio"
                    name="option"
                    onChange={handleChange}
                    value="5"
                  />
                </label>
              </div>
            </div>
            <div className="report-input-box">
              <input
                type="text"
                name="reason"
                onChange={handleChange}
                placeholder="Tell us more about the issue."
              />
            </div>

            <p style={{ border: "1px solid #dfdfdf" }}></p>
            <div className="report-btn">
              <button
                className="cancel-rep"
                onClick={() =>
                  setShowReport({ show: false, type: "", data: "" })
                }
              >
                Cancel
              </button>
              <button className="rep" onClick={handleReport}>
                Report
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ReportBox;
