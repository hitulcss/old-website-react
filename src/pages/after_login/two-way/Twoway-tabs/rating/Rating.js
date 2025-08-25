import React, { useState } from "react";
import "./Rating.css";
import Modal from "@mui/material/Modal";
import Stars from "../../../../../components/Stars/Stars";
import { IoClose } from "react-icons/io5";
import Textarea from "@mui/joy/Textarea";

const Rating = () => {
  return (
    <>
      {/* <div className="rating_wrapper">
        <div className="rating_box">
          <div className="rating-container">
            {" "}
            <div className="modal_header">
              <h2 id="rating-title">Write a Review</h2>
            </div>
            <p style={{ border: "1px solid #e2e2e2" }}></p>
            <div className="modal_down">
              <p>Your rating help us improve</p>
              <Stars />

              <p id="modal-modal-description" sx={{ mt: 2 }}>
                Add detailed Review
              </p>
              <Textarea
                minRows={4}
                maxRows={4}
                placeholder="Write your review here"
              />

              <button className="submit_review_btn">Submit</button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Rating;
