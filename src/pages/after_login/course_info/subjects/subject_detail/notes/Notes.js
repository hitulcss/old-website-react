import React, { useContext, useEffect, useState } from "react";
import "./Notes.css";
import pdfIcon from "../../../../../../assets/live/pdf.png";
import Wrapper from "../../../../../../components/Wrapper/Wrapper";
import { CoursesData } from "../../../../../../context/courses/Courses";
// import { PdfPreview } from "../../../../../../PDFViewer";
import { IoClose } from "react-icons/io5";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

// Core viewer
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { useNavigate } from "react-router-dom";
import { pdfjs } from "react-pdf";
import notesIcon from "./../../../../../../assets/dpp.png";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const Notes = ({ subjectData }) => {
  const [open, setOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false); // Track full-screen mode
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

  const { notesOfBatch, getNotes } = useContext(CoursesData);
  useEffect(() => {
    getNotes(subjectData?.batchSlug, subjectData?.subjectId);
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

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Function to toggle full-screen mode
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullScreen(false);
      }
    }
  };

  const [selectedPdf, setSelectedPdf] = useState(-1);

  return (
    <>
      <div className="notes_wrapper">
        <Wrapper>
          <div className="pdf_download_container">
            {notesOfBatch?.length > 0 ? (
              notesOfBatch.map((item, index) => (
                <div className="pdf_download_box" key={index}>
                  <p className="pdf_heading">{item.title}</p>
                  <p style={{ border: "1px solid #efefef" }}></p>
                  {item?.res?.map((resItem, index2) => {
                    return (
                      <div className="pdf_box">
                        <div className="pdf_left">
                          <img src={pdfIcon} alt="icon" />
                          <div key={index2}>
                            <p className="pdf_title">
                              {resItem?.resource_title}
                            </p>
                            <p className="pdf_size">
                              {resItem?.file?.fileSize}
                            </p>
                          </div>
                        </div>
                        <div className="pdf_right">
                          {/* <img src={downloadIcon ?? ""} alt="icon" onClick={() => handleDownload(resItem?.file?.fileLoc)} /> */}

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
                                {resItem.file.fileLoc &&
                                resItem.file.fileLoc !== "" ? (
                                  <Viewer
                                    fileUrl={resItem?.file?.fileLoc}
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
                              setSelectedPdf(index);
                              openModal();
                            }}
                          >
                            <RemoveRedEyeIcon sx={{ color: "#b142f5" }} />
                          </span>
                          {/* <span style={{ cursor: 'pointer', marginLeft: '20px' }} onClick={toggleFullScreen}>{fullScreen ? "Exit Full Screen" : ""}</span> */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))
            ) : (
              <div className="no-dpp">
                <img src={notesIcon} alt="dpp" loading="lazy" />
                <p>No Notes Available</p>
              </div>
            )}
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default Notes;
