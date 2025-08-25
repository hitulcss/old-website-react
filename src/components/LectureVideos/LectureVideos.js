import React from "react";
import "./LectureVideos.css";
import playbtn from "../../assets/YT/playbtn.png";
import { NavLink, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
import NotFound from "../NotFound/NotFound";
import { pushToDataLayer } from "../../gtm/gtm";
import lectureImg from "../../assets/lecture_default.jpg";

function parseDate(dateString) {
  const [day, month, year, hour, minute, second] = dateString?.split(/[- :]/);
  return new Date(year, month - 1, day, hour, minute, second);
}

const LectureVideos = ({ lecturesOfBatch, batchSlug, from }) => {
  const navigate = useNavigate();
  function formatDateTime(inputDateTimeString) {
    // var date = new Date(inputDateTimeString);
    var date = moment(inputDateTimeString, "DD-MM-YYYY HH:mm:ss").format(
      "MMM Do YYYY, h:mm A"
    );
    var options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      hour12: true,
    };
    var formattedDate = date.toLocaleString("en-US", options);

    // return formattedDate;
    return date;
  }

  const handleClick = (e, item) => {
    e.preventDefault();
    const d = new Date();
    const curr_date = new Date();

    const startDate = parseDate(item?.starting_date);
    // const endDate = parseDate(item?.ending_date);

    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "view_lecture",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),

      lecture_title: item?.lectureTitle,
      lecture_type: item?.lecture_type,
      // current_stream_id: item?.id,
    });
    if (curr_date >= startDate) {
      if (item?.lecture_type == "TWOWAY") {
        window.open(`/live-class/${item?._id}/${batchSlug}`);
        // window.open('https://play.google.com/store/apps/details?id=com.sdcampus.app&pcampaignid=web_share&pli=1')
      }

      if (item?.lecture_type == "YT") {
        let secretKey = "SDCAMPUS";
        let hashKey = CryptoJS.AES.encrypt(
          String(item?._id),
          secretKey
        ).toString();
        const hasKeyText = CryptoJS.enc.Base64.stringify(
          CryptoJS.enc.Utf8.parse(hashKey)
        );
        window.open(`/learning/live-lecture/${batchSlug}/${hasKeyText}/1`);
      }
    } else if (curr_date <= startDate) {
      toast.dismiss();
      toast.error(`Lecture is scheduled for ${item?.starting_date}`);
    } else {
      toast.dismiss();
      toast.error("Time exceeded..");
      // window.open(`/live/${item?.commonName}`)
    }

    // currentDate = currentDate.getDate()
  };

  return (
    <>
      <div className="top_educators_yt" data-aos="fade-left">
        <div className="top_educators_yt_container">
          {lecturesOfBatch?.length !== 0 ? (
            lecturesOfBatch?.map((item, index) => {
              let secretKey = "SDCAMPUS";
              let hashKey = CryptoJS.AES.encrypt(
                String(item?._id),
                secretKey
              ).toString();
              const hasKeyText = CryptoJS.enc.Base64.stringify(
                CryptoJS.enc.Utf8.parse(hashKey)
              );
              return (
                <NavLink key={index} onClick={(e) => handleClick(e, item)}>
                  {/* <div className="yt_box" key={index}>
                    <div style={{ height: "40%" }}>
                      <img
                        src={playbtn}
                        alt="playbtn"
                        className="play_btn_lecture"
                      />
                      <img
                        src={item?.teacher?.profilePhoto}
                        alt="playbtn"
                        className="faculty_icon"
                      />
                    </div>
                    <div className="yt_description" style={{ height: "60%" }}>
                      <h1 style={{ color: "#000" }}>
                        {item.lectureTitle?.slice(0, 65)}
                        {item.lectureTitle?.length > 65 ? "..." : ""}
                      </h1>

                      <div className="descrip_mid">
                        <div className="left_descrip">
                          <span>
                            <span style={{ color: "#000" }}>
                              {formatDateTime(item?.starting_date)}{" "}
                            </span>
                          </span>
                          <span>
                            By:{" "}
                            <span style={{ color: "#000" }}>
                              {item?.teacher?.name}{" "}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className="lecture-box" key={index}>
                    {/* <img src={ytposter} alt="ytPoster" /> */}
                    <div style={{ position: "relative" }}>
                      {/* <img
                        src={
                          item?.teacher?.profilePhoto
                            ? item?.teacher?.profilePhoto
                            : lectureImg
                        }
                        alt="banner"
                        className="main-lecture-img purchase-lec-banner"
                      /> */}

                      <img
                        src={item?.banner ? item?.banner : lectureImg}
                        alt="banner"
                        className="main-lecture-img purchase-lec-banner"
                        loading="lazy"
                      />
                    </div>
                    <div className="lecture-descrip" style={{ height: "60%" }}>
                      <h1 style={{ color: "#000" }}>
                        {" "}
                        {item.lectureTitle?.slice(0, 55)}
                        {item.lectureTitle?.length > 55 ? "..." : ""}
                      </h1>
                      <div className="lecture-descrip-lower">
                        <div className="lec-right-descrip">
                          {" "}
                          <span>
                            By:{" "}
                            <span style={{ color: "var(--primaryColor)" }}>
                              {item?.teacher?.name}{" "}
                            </span>
                            {/* <span style={{ color: "#000" }}>
                              {item?.teacher ? item?.teacher : ""}
                            </span> */}
                          </span>
                        </div>
                        <div className="lec-left-descrip">
                          <span style={{ color: "#000" }}>
                            {formatDateTime(item?.starting_date)}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavLink>
              );
            })
          ) : (
            <NotFound title="Lecture" />
          )}
        </div>
        {/* <Toaster /> */}
      </div>
    </>
  );
};

export default LectureVideos;
