import React, { useContext, useEffect, useState } from "react";
import "./SavedPosts.css";
import { CoursesData } from "../../../context/courses/Courses";
import Loader from "../../../components/Loader/Loader";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SavedPosts = ({ url }) => {
  //context
  const { savedShortVideosData, mySaved } = useContext(CoursesData);

  //api call
  useEffect(() => {
    mySaved();
  }, []);

  //loading
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (savedShortVideosData) {
      setLoading(false);
    }
  }, [savedShortVideosData]);

  const navigate = useNavigate();
  return (
    <>
      <div>
        {loading && <Loader />}
        <div className="saved-post-parent">
          {!loading &&
            (savedShortVideosData?.shorts?.length > 0 ? (
              savedShortVideosData?.shorts?.map((item, index) => {
                return (
                  <>
                    <div
                      key={index}
                      onClick={() => {
                        navigate(`/learning/short-learning/short/${item?.id}`);
                      }}
                    >
                      <div className="reel-container">
                        {" "}
                        <div className="saved-page-video-container">
                          {" "}
                          <video
                            src={item?.urls[2]?.url}
                            className="saved-particular-video"
                          />
                          {/* <img src={item.poster} alt="poster" /> */}
                          <div className="black-shadow2"></div>
                          <div className="reel-detail">
                            {" "}
                            <p>{item.title}</p>
                            <p
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <IoEye />
                              {item.views}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <img src={url} alt="nosave" style={{ width: "8rem" }} />
                <p>No Save Post Found!</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SavedPosts;
