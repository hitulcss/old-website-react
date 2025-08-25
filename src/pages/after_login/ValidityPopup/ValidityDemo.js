import Modal from "@mui/material/Modal";
import ReactPlayer from "react-player";
import { IoClose } from "react-icons/io5";

export default function ValidityDemo({
  setDemoVideo,
  setShowDemoVideo,
  showDemoVideo,
  demoVideo,
  handleCloseDemo,
}) {


  return (
    <div>
      <Modal
        open={showDemoVideo}
        onClose={handleCloseDemo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="validty-demo-video-popup">
          <div
            className="validity-demo-close-btn-container"
            onClick={handleCloseDemo}
          >
            {" "}
            <IoClose className="validity-demo-close-btn" />
          </div>

          <ReactPlayer url={demoVideo} width="100%" height="100%" playing={true} />
        </div>
      </Modal>
    </div>
  );
}
