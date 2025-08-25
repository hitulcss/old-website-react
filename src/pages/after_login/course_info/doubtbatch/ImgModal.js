import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IoClose } from "react-icons/io5";
import "./ImgModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "90%",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  outline: "none",
  borderRadius: 3,
};

export default function ImgModal({ imgsrc, setImgopen, imgopen }) {
  const handleOpen = () => setImgopen(true);
  const handleClose = () => setImgopen(false);

  return (
    <div>
      <Modal
        open={imgopen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IoClose onClick={handleClose} className="confirm-close img-modal" />{" "}
          <img src={imgsrc} style={{ width: "100%" }} />
        </Box>
      </Modal>
    </div>
  );
}
