import React, { useContext, useEffect, useState } from "react";
// import "./DPP.css";
import pdfIcon from "../../../../assets/live/pdf.png";
import "../CourseDetails.css";

import { useNavigate, useParams } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { IoClose } from "react-icons/io5";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { CoursesData } from "../../../../context/courses/Courses";
import Wrapper from "../../../../components/Wrapper/Wrapper";
import lockPdf from "../../../../assets/lock-pdf.png";
import dppIcon from "../../../../assets/dpp.png";
import toast from "react-hot-toast";
import LockPopupModal from "../lock-popup/LockPopup";
import lockLecture from "../../../../assets/lock-lec.png";
import "./BeforePurchaseDPP.css";

const BeforePurchaseDpp = ({
  subjectId,
  setLockModal,
  lockModal,
  course,
  selectedValidity,
}) => {
  const { subCategorySlug } = useParams();
  const { prePurchaseDpp, getDppDetails } = useContext(CoursesData);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-wrapper")) {
      closeModal();
    }
  };

  useEffect(() => {
    getDppDetails(subCategorySlug, subjectId);
  }, []);

  const handleDownload = (url) => {
    const fileUrl = url;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "downloaded-file";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navigate = useNavigate();
  if (!localStorage.getItem("isLoggedIn")) {
    navigate(`/login?source=${window?.location?.href}`);
  }
  const [selectedPdf, setSelectedPdf] = useState(-1);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <>
      <div className="dpp_wrapper">
        <Wrapper>
          <LockPopupModal
            setLockModal={setLockModal}
            lockModal={lockModal}
            text="dpp"
            selectedValidity={selectedValidity}
            course={course}
          />
          {prePurchaseDpp?.data?.length > 0 ? (
            <div className="dpp_download_container">
              {prePurchaseDpp?.data?.length > 0 ? (
                prePurchaseDpp?.data?.map((item, index) => (
                  <div className="dpp_download_box" key={index}>
                    <p className="dpp_heading">{item?.title}</p>
                    <p style={{ border: "1px solid #efefef" }}></p>

                    <div className="dpp_box" key={index}>
                      <div className="dpp_left">
                        <img src={pdfIcon} alt="icon" loading="lazy" />
                        <div>
                          <p className="dpp_title">
                            {item?.res[0]?.resource_title}
                          </p>
                          <p className="dpp_size">
                            {item?.res[0]?.file?.fileSize}
                          </p>
                        </div>
                      </div>
                      <div className="dpp_right">
                        {isOpen && selectedPdf == index && (
                          <div
                            className="modal-wrapper"
                            onClick={handleOverlayClick}
                          >
                            <div className="modal-container">
                              <IoClose
                                className="close-button"
                                onClick={closeModal}
                              />
                              {item.res[0].file.fileLoc &&
                              item.res[0].file.fileLoc !== "" ? (
                                <Viewer
                                  fileUrl={item.res[0].file.fileLoc}
                                  plugins={[defaultLayoutPluginInstance]}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        )}
                        <span
                          style={{ cursor: "pointer", marginLeft: "20px" }}
                          onClick={() => {
                            if (index == 0) {
                              setSelectedPdf(index);
                              openModal();
                            } else {
                              setLockModal(true);
                              // toast('Puchase Batch')
                            }
                          }}
                        >
                          {!index == 0 ? (
                            <img
                              src={lockLecture}
                              alt="playbtn"
                              className="lock-icon"
                              loading="lazy"
                            />
                          ) : (
                            <RemoveRedEyeIcon sx={{ color: "#b142f5" }} />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    height: "50vh",
                    fontSize: "25px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  No DPP Available
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
                height: "50vh",
                fontSize: "25px",
                display: "flex",
                alignItems: "center",
                width: "100%",

                justifyContent: "center",
              }}
            >
              <div className="no-dpp">
                <img src={dppIcon} alt="dpp" loading="lazy" />
                <p>No DPP Available</p>
              </div>
            </div>
          )}
        </Wrapper>
      </div>
    </>
  );
};

export default BeforePurchaseDpp;
