import React from "react";
import "./Resourses.css";
import pdfIcon from "../../../../../assets/live/pdf.png";
import downloadIcon from "../../../../../assets/live/downloadpdf.png";

const Resourses = ({data}) => {
  return (
    <>
      <div className="twoway_resourses">
        <p className="twoway_resourses_title">Resoures shared with you</p>
        <p style={{ border: "1px solid #e7e7e7" }}></p>
        {(data?.material?.fileLoc ||
          data?.dpp?.fileLoc) ? (
          <div className="live_dpp_pdf">
            {data?.material?.fileName && (
              <div className="dpp_notes_download">
                <img src={pdfIcon} alt="pdficon" />
                {data?.material?.fileName}
                <img src={downloadIcon} alt="downloadpdf" />
              </div>
            )}
            {data?.dpp?.fileName && (
              <div className="dpp_notes_download">
                <img src={pdfIcon} alt="pdficon" />
                {data?.dpp?.fileName}
                <img src={downloadIcon} alt="downloadpdf" />
              </div>
            )}
          </div>
        ) : <div className="live_dpp_pdf">

          <div className="dpp_notes_download">
            No Resources Available
          </div>


        </div>}
      </div>



      
    </>
  );
};

export default Resourses;
