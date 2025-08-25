import React from "react";
import "./BatchExpire.css";
import bellIcon from "../../assets/bell.svg";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";

const BatchExpire = ({ setShowExpiry, data }) => {
  //navigation to extend validity page
  const navigate = useNavigate();

  //batch-slug
  const { slug } = useParams();
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          onClose={handleClose}
        >
          <div className="batch-expire-wrapper">
            <div className="batch-expire-container">
              <div className="batch-expire-uppper">
                {" "}
                <img src={bellIcon} alt="bellIcon" />
                <h1>Batch Expiring in {data?.daysLeft} Days</h1>
                <p>Upgrade this batch to unlock all Classes.</p>
              </div>
              <p style={{ border: "1px solid #dfdfdf" }}></p>
              <div className="batch-expire-btns">
                <button
                  className="batch-expire-cancel"
                  onClick={() => {
                    setShowExpiry(false);
                    handleClose();
                  }}
                >
                  cancel
                </button>
                <button
                  className="batch-expire-continue"
                  onClick={() => {
                    // if (data?.daysLeft < 8) {
                    navigate(`/learning/${slug}/add-validity`);
                    // }
                  }}
                >
                  continue
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default BatchExpire;
