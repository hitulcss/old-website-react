import React from "react";
import { IoMdCalendar, IoMdTime } from "react-icons/io";
import {
  MdOutlineDownloadForOffline,
  MdOutlineSubscriptions,
} from "react-icons/md";
import VideoPlayer from "../../../../components/VideoPlayer/VideoPlayer";

const Info = ({ course }) => {

  const controls = {
    volume: { volumeProgress: false, volumeLogo: true },
    forward: false,
    backward: false,
    play: true,
    progressBar: true,
    settings: false,
    expand: true

  }

  return (
    <>
      <div>
        {" "}
        <div style={{ marginTop: "1rem", padding: "10px" }}>
          <VideoPlayer
            link={course?.data?.featureVideo?.url}
            type="Recorded"
            title=""
            platform={course?.data?.featureVideo?.videoType}
            showControls={controls}
          // platform="yt"
          />
        </div>
        <div style={{ padding: "10px" }}>
          {" "}
          <div
            className="course_details_info  videotab"
            id="info-course-details"
          >
            <h2>Description</h2>
            <p style={{ border: "1px solid #dfdfdf" }}></p>
            <p className="info_description1">
              <div
                dangerouslySetInnerHTML={{
                  __html: course?.data?.description,
                }}
              />
            </p>
            <div className="course_details_data">
              <div className="batch_start">
                <div className="info_icon_container">
                  {" "}
                  <IoMdCalendar className="course_info_icon" />
                </div>

                <p className="course_para">
                  <p style={{ color: "var(--textGray)" }}>Start on</p>
                  <p>{course?.data?.startingDate}</p>
                </p>
              </div>
              <div className="course_duration">
                <div className="info_icon_container">
                  {" "}
                  <IoMdTime className="course_info_icon" />
                </div>

                <p className="course_para">
                  <p style={{ color: "var(--textGray)" }}>Duration</p>
                  <p>{course?.data?.validity} Months</p>
                </p>
              </div>
              <div className="recorded_classes">
                <div className="info_icon_container">
                  {" "}
                  <MdOutlineSubscriptions className="course_info_icon" />
                </div>

                <p className="course_para">
                  <p style={{ color: "var(--textGray)" }}>Live Classes</p>
                </p>
              </div>
              <div className="course_download">
                <div className="info_icon_container">
                  {" "}
                  <a
                    href={
                      course?.data?.planner?.fileLoc == ""
                        ? null
                        : course?.data?.planner?.fileLoc
                    }
                  >
                    {" "}
                    <MdOutlineDownloadForOffline className="course_info_icon" />
                  </a>
                </div>

                <p className="course_para">
                  <p style={{ color: "var(--textGray)" }}>Planner</p>
                  <p>Download</p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;
