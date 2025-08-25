import React, { useContext, useEffect, useState } from "react";
import "./Info.css";
import { MdOutlineFileDownload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import toast, { Toaster } from "react-hot-toast";
import TodayClasses from "../../home/today_classes/TodayClasses";
import UpcomingClasses from "../../home/upcoming_classes/UpcomingClasses";
import { CoursesData } from "../../../../context/courses/Courses";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CancelIcon from "@mui/icons-material/Cancel";
import { pushToDataLayer } from "../../../../gtm/gtm";

const Info = ({ data, setShowShareModal, showShareModal }) => {
  const [expanded, setExpanded] = useState(false);
  const { todayClasses, getTodayClasses } = useContext(CoursesData);

  useEffect(() => {
    getTodayClasses();
  }, []);

  const toggleAccordion = () => {
    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "view_course_description",
      batchName: data?.batchName,
    });
    setExpanded(!expanded);
  };

  const navigate = useNavigate();
  if (!localStorage.getItem("isLoggedIn")) {
    navigate(`/login?source=${window?.location?.href}`);
  }

  const [showShareModalLink, setShowShareModalLink] = useState("");

  const newNumber = '7428394524';

  const updatedDescription = data?.description?.replace(/\b\d{10}\b/, newNumber);


  return (
    <>
      <Toaster />

      {showShareModal && (
        <div className="share_modal_info" style={{}}>
          <CancelIcon
            className="share_modal_cancel"
            onClick={() => {
              setShowShareModal(false);
            }}
          />
          {/* <div className="text_share_modal">{showShareModalLink}</div> */}
          <div className="share_platforms">
            {/* <div>
              {" "}
              <FaWhatsappSquare className="link_share_icon share_wp" /> Whatsapp
            </div>
            <div>
              {" "}
              <RiTwitterXFill className="link_share_icon " /> Twitter
            </div>
            <div>
              {" "}
              <FaFacebookSquare className="link_share_icon  share_fb" />{" "}
              Facebook
            </div> */}
            <div style={{ borderBottom: "none" }}>
              {" "}
              Copy Link
              <ContentCopyIcon
                className="refer_icon refer_copy_icon"
                onClick={() => {
                  setShowShareModal(!showShareModal);
                  setShowShareModalLink(
                    `${window.location.host}
                  /${data?.categoryDetails?.slug || "category"}/${
                      data?.slug || "batch-name"
                    }`
                  );
                  navigator.clipboard.writeText(`${window.location.host}
                  /${data?.categoryDetails?.slug || "category"}/${
                    data?.slug || "batch-name"
                  }`);
                  toast.dismiss();
                  toast.success("Copied");
                }}
              />
            </div>
          </div>
        </div>
      )}
      <div className="info_wrapper">
        <div className={`info_container ${expanded ? "expanded" : ""}`}>
          <div className="info_upper">
            <h2>Course Description</h2>
            <div className="laptop_btn">
              {" "}
              {data?.planner?.fileLoc && data.planner.fileLoc != "" ? (
                <button
                  onClick={() => {
                    pushToDataLayer({
                      ecommerce: null, // Clear the previous ecommerce object.
                    });
                    pushToDataLayer({
                      event: "download_course_planner",
                      batchName: data?.batchName,
                    });
                    window.open(data?.planner?.fileLoc, '_blank');
                  }}
                  className="planner-laptop"
                >
                  <MdOutlineFileDownload
                    size={18}
                    style={{ color: "var(--primaryColor)" }}
                  />
                  <a
                    // href={data?.planner?.fileLoc}
                    download={data?.planner?.fileLoc}
                  >
                    {" "}
                    Download Course Planner{" "}
                  </a>
                </button>
              ) : (
                ""
              )}{" "}
              {!expanded ? (
                <KeyboardArrowDownIcon
                  sx={{ color: "#000" }}
                  onClick={toggleAccordion}
                />
              ) : (
                <KeyboardArrowUpIcon
                  sx={{ color: "#b042f5" }}
                  onClick={toggleAccordion}
                />
              )}
            </div>
          </div>

          {expanded && (
            <div>
              <p
                style={{
                  border: "1px solid #efefef",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              ></p>

              <div className="info_lower">
                {/* <img src={data?.banner} alt="poster" /> */}

                <div className="info_description ">
                  {/* <p>Start Date : {data?.startingDate}</p>
                  <p> Duration : {data?.duration} Days </p> */}
                  <p>Batch Details:</p>

                  <div
                    className="course_description"
                    dangerouslySetInnerHTML={{ __html: updatedDescription?.replace(/For more information or to enroll/gi, 'For any query or support') }}
                  />
                  <div className="phone_btn" style={{ padding: "0px" }}>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <MdOutlineFileDownload size={18} />
                      <a
                        href={data?.planner?.fileLoc}
                        download="My_File.pdf"
                        style={{ color: "var(--primaryColor)" }}
                      >
                        {" "}
                        Download Course Planner{" "}
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          {data?.todayLectures?.length > 0 && (
            <TodayClasses todayClasses={data?.todayLectures} />
          )}
        </div>

        <div>
          {data?.upcomingLectures?.length > 0 && (
            <UpcomingClasses upcomingClasses={data?.upcomingLectures} />
          )}
        </div>
      </div>
    </>
  );
};

export default Info;
