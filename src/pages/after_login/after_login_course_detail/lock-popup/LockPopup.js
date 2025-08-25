import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import lockPopup from "../../../../assets/lockpopup.png";
import "./LockPopup.css";
import { useNavigate, useParams } from "react-router-dom";

export default function LockPopupModal({ setLockModal, lockModal, text, course, selectedValidity }) {

  const { subCategorySlug } = useParams()
  const handleOpen = () => setLockModal(true);
  const handleClose = () => setLockModal(false);

  const navigate = useNavigate()

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={lockModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="lock-popup-container">
          <div className="lock-popup-upper">
            <img src={lockPopup} alt="lock" />
            <h1>Locked!</h1>
            <p>Purchase this batch to unlock all {text}.</p>
          </div>
          <p style={{ border: "1px solid #dfdfdf", width: "100%" }}></p>
          <div className="lock-popup-lower">
            <button className="popup-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button className="popup-buynow" onClick={() => {
              navigate(
                `/learning/${course?.data?.categoryDetails?.slug}/${subCategorySlug}/checkout`,
                {
                  state: {
                    selectedValidity: selectedValidity,
                  },
                }
              );
            }}>Buy now</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
