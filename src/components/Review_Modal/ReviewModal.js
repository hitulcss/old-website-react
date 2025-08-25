import React, { useContext, useEffect, useState } from "react";
import "./ReviewModal.css";
import Modal from "@mui/material/Modal";
import Stars from "../Stars/Stars";
import { IoClose } from "react-icons/io5";
import Textarea from "@mui/joy/Textarea";
import { CoursesData } from "../../context/courses/Courses";
import toast, { Toaster } from "react-hot-toast";

const ReviewModal = ({ modalOpen, setModalOpen, lectureDetails, setValue, postReviewForEbook, from, ebookId }) => {
  const [open, setOpen] = useState(false);

  //title
  const [title, setTitle] = useState('');
  //rating
  const [reviewData, setReviewData] = useState(0)


  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);


  const { postRating } = useContext(CoursesData)

  const handlePostRating = () => {

    if (title !== '' && reviewData?.rating !== 0) {

      if (from !== 'ebook') { postRating({ title: title, lectureId: lectureDetails?._id, rating: (reviewData?.rating).toString() }) }
      else {
        postReviewForEbook({ ebookId: ebookId, title: title, rating: (reviewData?.rating).toString() })
      }
      setReviewData(0)
      setModalOpen(false)
      if (from !== 'ebook') {
        setTimeout(() => {
          setValue(0)
        }, 1000)
      }

    }
    else {
      toast.dismiss()
      toast.error('Add a review and rating...')
    }
  }


  return (
    <>
      {/* <Toaster /> */}
      <div className="modal_wrapper">
        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="review_modal_box">
            <div className="modal_header">
              <h2 id="modal-modal-title">Write a Review</h2>
              <IoClose className="close_icon" onClick={handleClose} />
            </div>

            <p style={{ border: "1px solid #e2e2e2" }}></p>
            <div className="modal_down">
              <p>Your rating help us improve</p>
              <Stars setReviewData={setReviewData} reviewData={reviewData} />

              <p id="modal-modal-description" sx={{ mt: 2 }} >
                Add detailed Review
              </p>
              <Textarea
                minRows={4}
                maxRows={4}
                placeholder="Write your review here"
                onChange={(e) => setTitle(e.target.value)}
              />

              <button className="submit_review_btn" onClick={handlePostRating}>Submit</button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ReviewModal;
