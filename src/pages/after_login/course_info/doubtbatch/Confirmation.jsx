import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useContext, useState } from "react";
import { CoursesData } from "../../../../context/courses/Courses";
import Modal from "@mui/material/Modal";
import { IoClose } from "react-icons/io5";
import "./Cofirm.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2.5,
  borderRadius: 5,
};

const ConfirmDialog = ({
  handleCommentdelete,
  handleReplyCommentDelete,
  deleteHelperState,
  batchId,
  setDeleteHelperState,
}) => {
  const { deleteBatchDoubt } = useContext(CoursesData);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    if (deleteHelperState?.type == "comment") {
      setDeleteHelperState({ type: "", show: false, data: "" });
      handleCommentdelete(deleteHelperState?.data);
    } else if (deleteHelperState?.type == "replyComment") {
      setDeleteHelperState({ type: "", show: false, data: "" });
      handleReplyCommentDelete(deleteHelperState?.data);
    } else if (deleteHelperState?.type == "post") {
      setDeleteHelperState({ type: "", show: false, data: "" });
      deleteBatchDoubt({
        batchCommunityId: deleteHelperState?.data?.id,
        batchId,
      });
    }
  };
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={deleteHelperState?.show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="confirm-upper">
            {" "}
            <h2> Want to delete?</h2>{" "}
            <IoClose
              onClick={() => {
                setDeleteHelperState({ type: "", show: false, data: "" });
              }}
              className="confirm-close"
            />
          </div>

          <div className="confirm-lower">
            {" "}
            <button
              onClick={() => {
                setDeleteHelperState({ type: "", show: false, data: "" });
              }}
              style={{ color: "var(--primaryColor)" }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleConfirm();
              }}
              style={{ background: "var(--primaryColor)", color: "#fff" }}
            >
              Delete
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ConfirmDialog;
