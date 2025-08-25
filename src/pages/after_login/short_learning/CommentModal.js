import * as React from "react";
import Modal from "@mui/material/Modal";
import { FaRegComment } from "react-icons/fa";
import "./CommentModal.css";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Avatar, Button, Popover, Tooltip, Typography } from "@mui/material";
import {
  MdOutlineCancel,
  MdOutlineDeleteForever,
  MdOutlineEdit,
  MdOutlineReportProblem,
} from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import logo from "../../../assets/avatar.jpg";
import { IoMdSend } from "react-icons/io";
import { CoursesData } from "../../../context/courses/Courses";
import { CgMailReply } from "react-icons/cg";
import ConfirmDialog from "./Confirmation";
import { IoClose } from "react-icons/io5";
import cmnt from "../../../assets/short-learning/cmnt.png";

export default function CommentModal({ data, setShowReport, showReport }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const details = JSON.parse(localStorage.getItem("details"));

  //context
  const {
    addCommentToShort,
    getCommentsShorts,
    shortComments,
    replyToCommentsShorts,
    deleteCommentShorts,
    deleteReplyCommentShorts,
    editShortComment,
    editShortReplyComment,
  } = React.useContext(CoursesData);

  //popover
  const [popoverHelper, setPopoverHelper] = React.useState(-1);
  //popover
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);

  const popOverItemStyle = {
    px: 2,
    py: 0.5,
    fontSize: "12px",
    cursor: "pointer",
    "&:hover": {
      background: "rgba(0, 0, 0, 0.1)",
    },
    display: "flex",
    alignItems: "center",
    gap: "5px",
  };

  //pagination
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  //api call for comments
  React.useEffect(() => {
    if (data && open) {
      getCommentsShorts({ shortId: data.id, page: page, pageSize: pageSize });
    }
  }, [data, open]);

  //handling input
  const [msg, setMsg] = React.useState("");
  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  //comment edit
  const [isEditComment, setIsEditComment] = React.useState({
    show: false,
    data: {},
    replyComment: false,
  });

  React.useEffect(() => {
    if (isEditComment?.show) {
      if (!isEditComment?.replyComment) {
        setMsg(isEditComment?.data?.msg);
      } else if (isEditComment?.replyComment) {
        setMsg(isEditComment?.data?.msg);
      }
    }
  }, [isEditComment]);

  //submit
  const onsubmit = () => {
    if (msg !== "") {
      if (!isEditComment?.show) {
        if (replyTo == -1) {
          addCommentToShort({ shortId: data?.id, msg: msg });
        } else {
          replyToCommentsShorts({
            commentId: replyTo?.id,
            replyId: replyTo?.user?.id,
            msg: msg,
            shortId: data?.id,
          });
          setMsg("");
          setReplyTo(-1);
        }
      } else {
        if (isEditComment?.replyComment) {
          editShortReplyComment({
            replyCommentId: isEditComment?.data?.id,
            msg,
            shortId: data?.id,
          });
          setIsEditComment({ show: false, data: {}, replyComment: false });
          setMsg("");
        } else if (isEditComment?.show) {
          editShortComment({
            commentId: isEditComment?.data?.id,
            msg,
            shortId: data?.id,
          });

          setIsEditComment({ show: false, data: {}, replyComment: false });
          setMsg("");
        }
      }
    }
  };

  //reply
  const [replyState, setReplyState] = React.useState({ show: false, id: "" });
  const [replyTo, setReplyTo] = React.useState(-1);
  const handleReplyToComments = (data) => {
    setReplyTo(data);
  };

  const [anchorElReply, setAnchorElReply] = React.useState(null);
  const handleClickReply = (event) => {
    setAnchorElReply(event.currentTarget);
  };

  const handleClosePopoverReply = () => {
    setAnchorElReply(null);
  };

  const openReply = Boolean(anchorElReply);

  const [deleteHelperState, setDeleteHelperState] = React.useState({
    type: "",
    data: {},
    show: false,
  });
  //comment delete
  const handleCommentdelete = (item) => {
    deleteCommentShorts({
      shortId: data?.id,
      commentId: item?.id,
    });
  };

  //reply Comment delete
  const handleReplyCommentDelete = (item) => {
    deleteReplyCommentShorts({
      shortId: data?.id,
      replyCommentId: item?.id,
    });
  };

  return (
    <div>
      <ConfirmDialog
        handleReplyCommentDelete={handleReplyCommentDelete}
        handleCommentdelete={handleCommentdelete}
        deleteHelperState={deleteHelperState}
        setDeleteHelperState={setDeleteHelperState}
      />
      <div onClick={handleOpen}>
        <Tooltip title="Comments" placement="right">
          <div className="micro-icon-container">
            {" "}
            {/* <FaRegComment className="micro-learning-icon" /> */}
            <img src={cmnt} className="cmnt-img-icon" />
          </div>
        </Tooltip>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="comment-modal-wrapper">
          <div className="comment-modal-upper">
            All Comments ({shortComments?.data?.comments?.length}){" "}
            <span style={{ float: "right", cursor: "pointer" }}>
              <IoClose onClick={handleClose} />
            </span>
          </div>
          <p style={{ border: "1px solid #efefef" }}></p>
          <div className="comment-modal-lower">
            {" "}
            <div className="doubt-detail-lower main-comments2">
              {open && shortComments?.data?.comments?.length > 0
                ? shortComments?.data?.comments?.map((item, index) => {
                    return (
                      <>
                        <div className="doubt-detail-cmnts ">
                          <div
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPopoverHelper(item?.id);
                            }}
                            className="doubt-detail-cmnt-inner"
                          >
                            {" "}
                            <div style={{ display: "flex", gap: "8px" }}>
                              {" "}
                              <div className="post-comments-user-profile">
                                <Avatar src={item?.user?.profilePhoto} />
                              </div>
                              <div className="post-comments-user-comment-box detail-cmnt-box">
                                <div>
                                  <div className="post-comments-user-name">
                                    {item?.user?.name}

                                    {item.user.isVerified && (
                                      <RiVerifiedBadgeFill
                                        style={{ color: "var(--primaryColor)" }}
                                      />
                                    )}
                                    <span
                                      style={{
                                        fontWeight: "500",
                                        color: "var(--textGray)",
                                      }}
                                    >
                                      {item?.createdAt}
                                    </span>
                                  </div>
                                  <div className="post-comments-user-comment">
                                    {item?.msg}
                                  </div>
                                  <div className="reply-action-container">
                                    <div
                                      onClick={() =>
                                        handleReplyToComments(item)
                                      }
                                    >
                                      <CgMailReply /> Reply |
                                    </div>{" "}
                                    <div
                                      className="post-comments-user-replies"
                                      onClick={() => {
                                        if (!replyState?.show) {
                                          setReplyState({
                                            show: true,
                                            id: item?.id,
                                          });
                                        } else {
                                          setReplyState({
                                            show: false,
                                            id: "",
                                          });
                                        }
                                      }}
                                    >
                                      {item?.replies?.length} Replies
                                    </div>
                                  </div>
                                </div>

                                <Button
                                  aria-describedby={`comment-${index}`}
                                  sx={{ background: "transparent" }}
                                  onClick={handleClick}
                                >
                                  <BsThreeDotsVertical />
                                </Button>
                                {item?.id == popoverHelper && (
                                  <Popover
                                    // id={`comment-${index}`}
                                    open={openPop}
                                    anchorEl={anchorEl}
                                    onClose={handleClosePopover}
                                    anchorOrigin={{
                                      vertical: "bottom",
                                      horizontal: "left",
                                    }}
                                  >
                                    {item?.isMyComment && (
                                      <Typography
                                        className="post-edit"
                                        onClick={() => {
                                          setAnchorEl(null);
                                          setIsEditComment({
                                            show: true,
                                            data: item,
                                            replyComment: false,
                                          });
                                        }}
                                        sx={{
                                          ...popOverItemStyle,
                                          fontSize: "1rem",
                                        }}
                                      >
                                        <MdOutlineEdit />
                                        Edit{" "}
                                      </Typography>
                                    )}
                                    {item?.isMyComment && (
                                      <Typography
                                        className="post-delete"
                                        onClick={() => {
                                          setAnchorEl(null);
                                          setDeleteHelperState({
                                            type: "comment",
                                            data: item,

                                            show: true,
                                          });
                                        }}
                                        sx={{
                                          ...popOverItemStyle,
                                          fontSize: "1rem",
                                        }}
                                      >
                                        <MdOutlineDeleteForever />
                                        Delete
                                      </Typography>
                                    )}
                                    {!item?.isMyComment && (
                                      <Typography
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setAnchorEl(null);

                                          setShowReport({
                                            show: true,
                                            type: "comment",
                                            data: item,
                                          });
                                        }}
                                        sx={{
                                          ...popOverItemStyle,
                                        }}
                                      >
                                        <MdOutlineReportProblem />
                                        Report
                                      </Typography>
                                    )}
                                  </Popover>
                                )}
                              </div>
                            </div>
                            {item?.replies?.length > 0 &&
                              replyState?.show &&
                              item?.id == replyState?.id && (
                                <div className="doubt-detail-cmnts">
                                  {item?.replies?.map((i, ind) => {
                                    return (
                                      <div
                                        key={ind}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setPopoverHelper(i?.id);
                                        }}
                                        style={{
                                          display: "flex",
                                          gap: "8px",
                                          marginLeft: "10px",
                                        }}
                                      >
                                        {" "}
                                        <div className="post-comments-user-profile">
                                          {/* <Avatar src={logo} /> */}
                                          <Avatar src={i?.user?.profilePhoto} />
                                        </div>
                                        <div className="post-comments-user-comment-box detail-cmnt-box">
                                          <div>
                                            <div className="post-comments-user-name">
                                              {i?.user?.name}

                                              {i.user.isVerified && (
                                                <RiVerifiedBadgeFill
                                                  style={{
                                                    color:
                                                      "var(--primaryColor)",
                                                  }}
                                                />
                                              )}
                                              <span
                                                style={{
                                                  fontWeight: "500",
                                                  color: "var(--textGray)",
                                                }}
                                              >
                                                {i?.createdAt}
                                              </span>
                                              {/* Rahul . 23 min ago */}
                                            </div>
                                            <div className="post-comments-user-comment">
                                              {i.msg}
                                            </div>
                                          </div>

                                          <Button
                                            aria-describedby={index}
                                            sx={{
                                              background: "transparent",
                                            }}
                                            onClick={handleClickReply}
                                          >
                                            <BsThreeDotsVertical />
                                          </Button>
                                          {i?.id == popoverHelper && (
                                            <Popover
                                              id={ind}
                                              open={openReply}
                                              anchorEl={anchorElReply}
                                              onClose={handleClosePopoverReply}
                                              anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "left",
                                              }}
                                            >
                                              {i?.isMyReply && (
                                                <Typography
                                                  onClick={() => {
                                                    setIsEditComment({
                                                      show: true,
                                                      data: i,
                                                      replyComment: true,
                                                    });
                                                  }}
                                                  sx={{
                                                    ...popOverItemStyle,
                                                  }}
                                                >
                                                  <MdOutlineEdit />
                                                  Edit{" "}
                                                </Typography>
                                              )}
                                              {i?.isMyReply && (
                                                <Typography
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    setDeleteHelperState({
                                                      type: "replyComment",
                                                      data: i,

                                                      show: true,
                                                    });
                                                  }}
                                                  sx={{
                                                    ...popOverItemStyle,
                                                  }}
                                                >
                                                  <MdOutlineDeleteForever />
                                                  Delete
                                                </Typography>
                                              )}
                                              {!i?.isMyReply && (
                                                <Typography
                                                  onClick={() => {
                                                    setShowReport({
                                                      show: true,
                                                      type: "replyComment",
                                                      data: i,
                                                    });
                                                  }}
                                                  sx={{
                                                    ...popOverItemStyle,
                                                  }}
                                                >
                                                  <MdOutlineReportProblem />
                                                  Report
                                                </Typography>
                                              )}
                                            </Popover>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                          </div>
                        </div>
                      </>
                    );
                  })
                : "No Comments"}
              {replyTo !== -1 && (
                <div className="reply-to rep-cmnt-to">
                  <p>
                    <span> Reply To : {replyTo?.user?.name} </span>

                    <MdOutlineCancel
                      style={{ cursor: "pointer" }}
                      onClick={() => setReplyTo(-1)}
                      className="reply-close-icon"
                    />
                  </p>{" "}
                </div>
              )}
              {/* {((isEditComment?.show && !isEditComment?.replyComment && isEditComment?.data?.image)) && <div className="cmnt-img-container">
                {" "}
                <div className="image-preview-container">
                  <img
                    src={isEditComment?.data?.image}
                    alt="uploadpic"
                    className="upload-pic-icon"
                  />
                  <button className="remove-btn" onClick={() => setImage('')}>
                    &times;
                  </button>
                </div>
              </div>} */}
              <div className="doubt-detail-cmnt-section">
                {" "}
                <div className="post-comments-user-profile">
                  <Avatar src={details.profilePhoto} />
                </div>
                <div className="doubt-detail-input-container">
                  {" "}
                  <div
                    className="post-comments-user-comment-box"
                    style={{ background: "#fff" }}
                  >
                    <input
                      id="input_box"
                      onChange={handleChange}
                      onKeyDown={(e) => {
                        if (e.key == "Enter") {
                          onsubmit();
                        }
                      }}
                      value={msg}
                      placeholder="Add Comment Heree..."
                    />
                  </div>
                  <div
                    className="doubt-detail-btn-container"
                    onClick={onsubmit}
                  >
                    <IoMdSend />
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </Modal>
    </div>
  );
}
