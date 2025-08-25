import React from "react";
import empty_ebook from "../../../../assets/empty_ebook.png";
import "./Empty_Ebook.css";

const Empty_Ebook = () => {
  return (
    <>
      <div className="empty_ebook_wrapper">
        <div className="empty_ebook_container">
          <img src={empty_ebook} alt="emptyebook" />
          <h1>Oho, No Any Found E-Books</h1>
          <button className="ebook-explore-btn"> Explore Now </button>
        </div>
      </div>
    </>
  );
};

export default Empty_Ebook;
