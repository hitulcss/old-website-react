import React, { useEffect, useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import "./ValidityPopup.css";
import { IoClose } from "react-icons/io5";
import bulbIcon from "../../../assets/bulb.svg";
import available from "../../../assets/available.png";
import notAvailable from "../../../assets/notavailable.png";
import recomm from "../../../assets/recomm.svg";
import { MdOutlineSyncAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import ValidityDemo from "./ValidityDemo";

export default function ValidityModal({
  data,
  course,
  state,
  selectedValidity,
  setSelectedValidity,
  subCategorySlug,
  from,
  handleClickOpen,
  freePurchaseCourses,
  setValidityState,
  validityState,
}) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (from == "pre-login") {
      setValidityState(false);
    }
  };

  const [activeDuration, setActiveDuration] = useState(null); // State to track active column

  const handleDurationClick = (index) => {
    setActiveDuration(index); // Set the clicked duration as active
  };

  // const durations = ["06 Months", "12 Months", "18 Months"];

  // Create refs for each validity section
  const validityRefs = useRef([]);

  useEffect(() => {
    if (from == "checkout" || from == "add-validity") {
      setOpen(state);
    }
    if (from == "pre-login") {
      setOpen(validityState);
    }
  }, [state, validityState]);

  const navigate = useNavigate();

  useEffect(() => {
    const selectedIndex = data?.findIndex(
      (item) =>
        item.validityId === selectedValidity.validityId ||
        item.validityId === selectedValidity?.id
    );
    if (selectedIndex !== -1 && validityRefs.current[selectedIndex]) {
      validityRefs.current[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    setActiveDuration(selectedIndex);
  }, [selectedValidity, data]);

  const [demoVideo, setDemoVideo] = useState(false);
  const [showDemoVideo, setShowDemoVideo] = useState(false);
  const handleCloseDemo = () => {
    setShowDemoVideo(false);
    setDemoVideo(false);
  };

  const convertResponseToFeatures = (response) => {
    const allFeatures = {};

    data?.forEach((plan) => {
      plan.features.forEach((feature) => {
        const { featureName, info, isEnable } = feature;
        if (!allFeatures[featureName]) {
          allFeatures[featureName] = {
            name: featureName,
            tooltip: info,
            available: [],
          };
        }
      });
    });

    data?.forEach((plan) => {
      Object.keys(allFeatures).forEach((featureName) => {
        const feature = plan.features.find(
          (f) => f.featureName === featureName
        );
        allFeatures[featureName].available.push(
          feature ? feature.isEnable : false
        );
      });
    });

    // Convert the features object into an array
    return Object.values(allFeatures);
  };

  const [features, setFeatures] = useState([]);

  useEffect(() => {
    if (data) {
      // setFeatures(convertResponseToFeatures(data))
    }
  }, [data]);

  return (
    <div>
      {/* <ValidityDemo
        setDemoVideo={setDemoVideo}
        setShowDemoVideo={setShowDemoVideo}
        showDemoVideo={showDemoVideo}
        demoVideo={demoVideo}
        handleCloseDemo={handleCloseDemo}
      /> */}
      <Modal
        open={showDemoVideo}
        onClose={handleCloseDemo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="teacher-popup-modal">
          <MdOutlineClose
            onClick={handleCloseDemo}
            className="video_popup_close"
          />
          <VideoPlayer
            source="knowmore"
            link={demoVideo}
            type="Recorded"
            title="Batch fearure video"
            platform="yt"
          />
        </div>
      </Modal>
      {from !== "checkout" && from !== "pre-login" && (
        <div
          onClick={handleOpen}
          style={{
            color: "var(--primaryColor)",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "pointer",
          }}
        >
          <MdOutlineSyncAlt />
          Change Validity{" "}
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="validity-modal-container">
          <div className="validity-modal-upper">
            {" "}
            <h1>{course?.data?.batchName} </h1>
            <IoClose className="validity-close-icon" onClick={handleClose} />
          </div>
          <p style={{ border: "1px solid #D9D9D9" }}></p>
          <div className="validity-modal-lower">
            <div className="plans-button">
              {data?.map((item, index) => {
                return (
                  <>
                    <div style={{ position: "relative" }}>
                      {" "}
                      <button
                        key={index}
                        className="beginner"
                        style={{
                          backgroundColor:
                            (item?.validityId == selectedValidity.validityId ||
                              item?.validityId == selectedValidity?.id) &&
                            "#D2FFD6",

                          border:
                            (item?.validityId == selectedValidity.validityId ||
                              item?.validityId == selectedValidity?.id) &&
                            "2px solid #fecd3d",
                        }}
                        onClick={() => {
                          handleDurationClick(index);
                          setSelectedValidity(item);
                        }}
                      >
                        {item?.name}
                        {item?.isRecommended && (
                          <img
                            src={recomm}
                            alt="recomm"
                            className="recomm-img"
                          />
                        )}
                      </button>
                      <div class="custom-checkbox-container" onClick={() => {
                        setSelectedValidity(item)
                      }}>
                        <input
                          type="checkbox"
                          name="option"
                          value="1"
                          // id={`customCheckbox-${index}`}

                          class="custom-checkbox"
                          checked={
                            item?.validityId == selectedValidity.validityId ||
                            item?.validityId == selectedValidity?.id
                          }

                        />
                        <label
                          for="customCheckbox"
                          class="custom-label"
                        ></label>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>

            <div className="validity-modal-middle">
              <h2 style={{ fontSize: "1.2rem" }}>Package includes</h2>
              <div className="validity-modal-middle-content-inner">
                <div className="validity-middle-inner">
                  {" "}
                  <div className="validity-middle-left">
                    <div className="validity-middle-left-inner">
                      {" "}
                      {data[0]?.features?.map((item, index) => (
                        <span className="key-feature-container">
                          {" "}
                          <p key={index}>{item?.featureName}</p>
                          {item?.info !== "" && (
                            <Tooltip title={item?.info} placement="right">
                              <IconButton
                                style={{ color: "#dfdfdf", fontSize: "13px" }}
                              >
                                {" "}
                                <IoIosInformationCircleOutline />
                              </IconButton>
                            </Tooltip>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    className="validity-middle-right"
                    style={{ background: "#1b1b21" }}
                  >
                    {data?.map((item, index) => {
                      return (
                        <div
                          ref={(el) => (validityRefs.current[index] = el)}
                          key={index}
                          className="validity-middle-right-inner"
                          onClick={() => setSelectedValidity(item)}
                          style={{
                            backgroundColor:
                              (item?.validityId ==
                                selectedValidity.validityId ||
                                item?.validityId == selectedValidity?.id) &&
                              "#101015",
                            border:
                              (item?.validityId ==
                                selectedValidity.validityId ||
                                item?.validityId == selectedValidity?.id) &&
                              "1px solid #fecd3d",
                            border: "1px solid #17171c;",
                          }}
                        >
                          <div>
                          {item?.month > 0 && (
                            <p>
                              {item.month === 12
                                ? `Till Exam (${item.month} Month)`
                                : item.month === 5
                                ? `${item.month} Days`
                                : `${item.month} Months (Achiever)`}
                            </p>
                          )}
                          </div>
                          <div>
                          {" "}
                          <span className="validity-img-container">
                            {item?.features?.map((i, ind) => (
                              <>
                                <div key={ind}>
                                  {" "}
                                  {i?.isEnable ? (
                                    <img src={available} alt="available" />
                                  ) : (
                                    <img
                                      className="notavailable"
                                      src={notAvailable}
                                      alt="notAvailable"
                                    />
                                  )}
                                </div>
                              </>
                            ))}
                          </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {course?.data?.demoVideo?.length > 0 && (
              <div style={{ padding: "0px 15px" }}>
                {" "}
                <div className="keypoint">
                  <img src={bulbIcon} alt="bulbIcon" />
                  <p>
                    {/* Discover the benefits of {course?.data?.batchName}{" "} */}
                    Discover the benefits of {selectedValidity?.name}{" "}
                    {selectedValidity?.month} Months{" "}
                    <span
                      style={{
                        color: "#FECD3D",
                        cursor: "pointer",
                        borderBottom: "1px solid #efcd3d",
                        fontSize: "0.8rem",
                      }}
                      onClick={() => {
                        setDemoVideo(course?.data?.featureVideo?.url);
                        setShowDemoVideo(true);
                      }}
                    >
                      Know More
                    </span>{" "}
                  </p>
                </div>
              </div>
            )}

            <p style={{ border: "1px solid #D9D9D9" }}></p>
            <div className="validity-modal-bottom">
              <div>
                <span>
                  <h2 className="validity-modal-price">
                    {" "}
                    ₹{selectedValidity?.salePrice}
                  </h2>
                  <p style={{ color: "var(--textGray)" }}>
                    <del> ₹{selectedValidity?.regularPrice}</del>
                  </p>
                </span>
                <p className="validity-off">
                  (
                  {(
                    ((selectedValidity?.regularPrice -
                      selectedValidity?.salePrice) /
                      selectedValidity?.regularPrice) *
                    100
                  ).toFixed(0)}
                  % Off)
                </p>
              </div>
              <button
                className="validity-modal-butNow"
                onClick={() => {
                  if (from == "after-login") {
                    navigate(
                      `/learning/${course?.data?.categoryDetails?.slug}/${subCategorySlug}/checkout`,
                      {
                        state: {
                          selectedValidity: selectedValidity,
                        },
                      }
                    );
                  } else if (from == "pre-login") {
                    if (course?.data?.amount == 0) {
                      freePurchaseCourses(course?.data?.id);
                      setTimeout(() => {
                        localStorage.setItem("index", 1);
                        navigate("/learning/my-courses");
                      }, 1500);
                    } else {
                      handleClickOpen();
                    }
                  } else if (from == "checkout" || from == "add-validity") {
                    handleClose();
                  }
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
