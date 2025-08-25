import React from "react";
import "./TodayClasses.css";
import { IoMdTime } from "react-icons/io";
import notfoundimg from "../../../../assets/noclassicon.png";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { pushToDataLayer } from "../../../../gtm/gtm";
import lectureImg from "../../../../assets/lecture_default.jpg";
import { LuCalendarClock } from "react-icons/lu";

let dayjs = require("dayjs");
var isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);

function parseDate(dateString) {
  const [day, month, year, hour, minute, second] = dateString.split(/[- :]/);
  return new Date(year, month - 1, day, hour, minute, second);
}

const TodayClasses = ({ todayClasses }) => {
  //today class redirect
  const navigate = useNavigate();
  const handleTodayClass = (item) => {
    const d = new Date();
    const currDateObj = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const curr_date = new Date();
console.log("curr_date", curr_date);
    const startDate = parseDate(item?.starting_date);
    const endDate = parseDate(item?.ending_date);
    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "view_today_class",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),

      // current_stream_id: item?.id,

      item: { ...item },
    });
    if (curr_date >= startDate && curr_date < endDate) {
      if (item?.lecture_type == "TWOWAY") {
        window.open(
          `/live-class/${item?._id}/${item?.batchDetails?.batchSlug}`
        );
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
        window.open(
          `/learning/live-lecture/${item?.batchDetails?.batchSlug}/${hasKeyText}/1`
        );
      }
    } else if (curr_date <= startDate) {
      toast.dismiss();
      toast.error(`Lecture is scheduled for ${item?.starting_time}`);
    } else {
      toast.dismiss();
      // toast.error("Time exceeded..");
      if (item?.lecture_type == "TWOWAY") {
        window.open(
          `/live-class/${item?._id}/${item?.batchDetails?.batchSlug}`
        );
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
        window.open(
          `/learning/live-lecture/${item?.batchDetails?.batchSlug}/${hasKeyText}/1`
        );
      }
      // window.open(`/live/${item?.commonName}`)
    }
  };



  function getTimeDifference(startTime, endTime) {
    // Parse the time strings into Date objects
    const parseTime = (timeStr) => {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (modifier === "PM" && hours !== 12) {
        hours += 12;
      }
      if (modifier === "AM" && hours === 12) {
        hours = 0;
      }

      return new Date(0, 0, 0, hours, minutes);
    };

    const start = parseTime(startTime);
    const end = parseTime(endTime);

    // Calculate the time difference in milliseconds
    const diffMs = end - start;

    // Convert the time difference to hours and minutes
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffHours}h ${diffMinutes}m `;
  }

  return (
    <>
      <div className="today_classes_wrapper" data-aos="fade-left">
        <div className="today_classes">
          <h1>Today’s Classes</h1>
          <p style={{ border: "1px solid #dfdfdf" }}></p>

          <div className="today_classes_container">
            {todayClasses?.length > 0 ? (
              todayClasses?.map((item, index) => (
                <div
                  className="today_class_box"
                  key={index}
                  data-aos="fade-left"
                  onClick={() => {
                    handleTodayClass(item);
                  }}
                >
                  <div>
                    {item.banner ? (
                      <img
                        src={item?.banner}
                        style={{ width: "100%", height: "100%" }}
                        alt="img"
                      />
                    ) : (
                      <img
                        src={lectureImg}
                        style={{ width: "100%", height: "100%" }}
                        alt="img"
                      />
                    )}
                  </div>
                  <div className="class_descrip">
                    <div className="class-time">
                      {!item?.LiveOrRecorded == "Live" ? (
                        <span className="class-live">LIVE</span>
                      ) : (
                        <p>
                          <IoMdTime />
                          {getTimeDifference(
                            item?.starting_time,
                            item?.ending_time
                          )}
                        </p>
                      )}

                      <p>
                        <LuCalendarClock />
                        {item?.starting_time}
                      </p>
                    </div>
                    <h2>
                      {item?.lecture_title?.slice(0, 28)}
                      {item?.lecture_title?.length > 28 ? ".." : ""}
                      {/* {item?.lecture_title
                        ? item?.lecture_title
                        : item?.llecture_title} */}
                    </h2>
                    <p>
                      By:{" "}
                      <span style={{ color: "var(--primaryColor)" }}>
                        {item?.teacher?.FullName ? item?.teacher?.FullName : item?.teacher?.name}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="today_class_box"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  background: "#fff",
                }}
              >
                <div>
                  <img
                    src={notfoundimg}
                    style={{ width: "80px", height: "50%" }}
                    alt="img"
                  />
                </div>
                <div
                  className="class_descrip"
                  style={{ fontSize: "14px", fontWeight: "700" }}
                >
                  No Classes Scheduled for today
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodayClasses;
