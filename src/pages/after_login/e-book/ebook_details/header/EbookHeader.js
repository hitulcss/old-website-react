import React, { useState } from "react";
import "./EbookHeader.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const EbookHeader = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const openPopup = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="ebook_header_wrapper">
        <div className="ebook_header_container">
          <div className="ebook_header_left">
            {" "}
            <FaArrowLeftLong
              className="ebook-header-icon"
              onClick={() => navigate(-1)}
            />
            <h1>SHAKTI Batch for Sainik School E-books English</h1>
          </div>

          <IoShareSocialOutline
            className="ebook-header-icon"
            onClick={openPopup}
          />
          {open && <div className="share-pop-container"></div>}
        </div>
      </div>
    </>
  );
};

export default EbookHeader;
