import React, { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import "./ReportBox.css";

import toast from "react-hot-toast";

import Modal from "@mui/material/Modal";
import { CoursesData } from "../../../context/courses/Courses";

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
  const { reportShort, reportCommentShort, reportReplyCommentShort } =
    useContext(CoursesData);

  //reason state
  const [reason, setReason] = useState({ radioField: -1, textField: "" });

  //handling input
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value == 'Other') {
      setShowTellUsMore(true)
    }

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
      const reasonText = `${reason?.radioField}${reason?.textField !== "" ? "----Reason:-" : ""
        }${reason?.textField}`;

      if (showReport?.type == "post") {
        reportShort({ id: showReport?.data?.id, reason: reasonText });
        setReason({ radioField: -1, textField: "" });
      }
      if (showReport?.type == "comment") {
        reportCommentShort({ id: showReport?.data?.id, reason: reasonText });
        setReason({ radioField: -1, textField: "" });
      }
      if (showReport?.type == "replyComment") {
        reportReplyCommentShort({
          id: showReport?.data?.id,
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

  //tell us more input
  const [showTellUsMore, setShowTellUsMore] = useState(false)
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
              <div onClick={() => { setShowTellUsMore(false) }}>
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
              <div onClick={() => { setShowTellUsMore(false) }}>
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
              <div onClick={() => { setShowTellUsMore(false) }}>
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
              <div onClick={() => { setShowTellUsMore(false) }}>
                <label >
                  <p>Adult content</p>
                  <input
                    type="radio"
                    name="option"
                    onChange={handleChange}
                    value="Adult content"
                  />
                </label>
              </div>
              <div onClick={() => { setShowTellUsMore(true) }}>
                <label >
                  {" "}
                  <p>Other</p>
                  <input
                    type="radio"
                    name="option"
                    onChange={handleChange}
                    value="Other"
                  />
                </label>
              </div>
            </div>
            {showTellUsMore && <div className="report-input-box">
              <input
                type="text"
                name="reason"
                onChange={handleChange}
                placeholder="Tell us more about the issue."
              />
            </div>}

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
