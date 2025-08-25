import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";
import { Height } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 600,
  p: 4,
  borderRadius: 5,
};

export default function VideoModal({ setOpen, open, link }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const controls = {
    volume: { volumeProgress: true, volumeLogo: true },
    forward: true,
    backward: true,
    play: true,
    progressBar: true,
    settings: true,
    expand: true

  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <VideoPlayer
            link={link}
            type="Recorded"
            title="Demo Videos"
            platform="yt"
            showControls={controls}
          />
        </Box>
      </Modal>
    </div>
  );
}
