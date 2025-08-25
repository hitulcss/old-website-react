import React, { useContext, useEffect, useState } from "react";

import NavBar from "../../../../NavBar/NavBar";
import SideBar from "../../../../../../components/Sidebar/SideBar";
import { CoursesData } from "../../../../../../context/courses/Courses";
import {
  unstable_useViewTransitionState,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import sample from "../../../../../../Sample_Document.pdf";
import "./EbookPdf.css";

// Core viewer
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const EbookPdf = () => {
  //context
  const { getTopic, ebookTopic } = useContext(CoursesData);

  //ebook id from params
  const { ebookId, topicId } = useParams();

  //states
  const [loading, setLoading] = useState(true);

  //api call
  useEffect(() => {
    if (ebookId && topicId) {
      getTopic({ topicId: topicId, ebookId: ebookId });
    }
  }, [ebookId, topicId]);

  //loading
  useEffect(() => {
    if (ebookTopic) {
      setLoading(false);
    }
  }, [ebookTopic]);

  const { isSidebarExpanded } = useContext(CoursesData);

  const [document, setDocument] = useState(sample);
  //navigation
  const navigate = useNavigate();

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    function handleKeyDown(event) {}

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const disableConsole = () => {
      const handler = function (event) {
        event.preventDefault();
        event.stopPropagation();
      };

      // Prevent right-click menu on entire page
      window.addEventListener("contextmenu", handler);

      // Prevent F12 key and Ctrl+Shift+I (Chrome & Firefox)
      window.addEventListener("keydown", function (event) {
        if (
          event.key === "F12" ||
          (event.ctrlKey && event.shiftKey && event.key === "I")
        ) {
          event.preventDefault();
          event.stopPropagation();
        }
        if (
          event.ctrlKey &&
          (event.key === "PrintScreen" ||
            event.key === "p" ||
            event.key === "P")
        ) {
          event.preventDefault();
          event.stopPropagation();
        }
      });

      // Prevent Ctrl+Shift+J (Chrome)
      window.addEventListener("keydown", function (event) {
        if (event.ctrlKey && event.shiftKey && event.key === "J") {
          event.preventDefault();
          event.stopPropagation();
        }
      });

      // Prevent Ctrl+Shift+K (Firefox)
      window.addEventListener("keydown", function (event) {
        if (event.ctrlKey && event.shiftKey && event.key === "K") {
          event.preventDefault();
          event.stopPropagation();
        }
      });

      // Prevent Ctrl+Shift+C (Chrome & Firefox)
      window.addEventListener("keydown", function (event) {
        if (event.ctrlKey && event.shiftKey && event.key === "C") {
          event.preventDefault();
          event.stopPropagation();
        }
      });
    };

    disableConsole();

    return () => {
      // Clean up listeners when component unmounts
      window.removeEventListener("contextmenu", disableConsole);
      window.removeEventListener("keydown", disableConsole);
    };
  }, []);
  return (
    <>
      <NavBar width={isSidebarExpanded ? 250 : 93} />
      <div>
        <SideBar />
        {loading ? (
          <div
            style={{
              width: "100%",
              height: "60vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div
            className={
              isSidebarExpanded
                ? "after-login-mid open-sidebar"
                : "after-login-mid closed-sidebar"
            }
            style={{ marginLeft: isSidebarExpanded ? "250px" : "100px" }}
          >
            {" "}
            {/* hello */}
            <div className="ebook-pdf-reader">
              <Box>
                <div>
                  <Viewer
                    fileUrl={ebookTopic?.fileDetails?.fileUrl}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                  {/* <Viewer fileUrl={sample} plugins={[defaultLayoutPluginInstance]} /> */}
                </div>
              </Box>
            </div>
            .
          </div>
        )}
      </div>
    </>
  );
};

export default EbookPdf;
