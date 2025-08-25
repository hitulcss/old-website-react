import "./CommunityDetail.css";
import sample from "../../../../assets/after-login-banner.png";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  Button,
  Divider,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  MdOutlineCancel,
  MdOutlineDeleteForever,
  MdOutlineEdit,
  MdOutlineRemoveRedEye,
  MdOutlineReportProblem,
} from "react-icons/md";

import {
  IoIosArrowRoundBack,
  IoIosHeart,
  IoIosHeartEmpty,
} from "react-icons/io";
import { IoAlertCircleOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { CoursesData } from "../../../../context/courses/Courses";
import { CgMailReply } from "react-icons/cg";

import toast from "react-hot-toast";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import ConfirmDialog from "./Confirmation";
import { FaRegComment } from "react-icons/fa";
import uploadPic from "../../../../assets/uploadpic.png";
import { FaRegImage } from "react-icons/fa6";

export default function CommunityDetail({
  setShowReport,
  doubtOpen,
  setDoubtOpen,
  batchId,
  selectedCommunity,
  helperState,
  setHelperState,
  setDoubtPrivacyPolicy,
  doubtPrivacyPolicy,
  deleteHelperState,
  setDeleteHelperState,
  setImgsrc,
  setImgopen,
}) {
  const handleOpen = () => setDoubtOpen(true);
  const handleClose = () => {
    setHelperState(!helperState);
    setDoubtOpen(false);
  };

  const {
    createBatchCommunityComments,
    getBatchCommunity,
    batchCommunityData,
    batchCommunityCommentsData,
    getCommunityComments,
    batchCommunityLikeAndDislike,
    replyToCommentsBatchCommunity,
    deleteCommentBatchCommunity,
    deleteReplyCommentCommunity,
    // replyToCommentsCommunity,
    editReplyComment,
    editComment,
  } = useContext(CoursesData);

  //image
  const [image, setImage] = useState(null);
  const [editImage, setEditImage] = useState(null);
  const [file, setFile] = useState(null);

  const [msg, setMsg] = useState();

  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  const [helperCommentState, setHelperCommentState] = useState(false);
  const onsubmit = () => {
    if (msg !== "" || image) {
      if (!isEditComment?.show) {
        if (replyComment == -1) {
          createBatchCommunityComments(
            {
              msg: msg,
              batchCommunityId: selectedCommunity,
              batchId: batchId,
            },
            file
          );
          setImage(null);
          setEditImage(null);
          setMsg("");
        } else {
          replyToCommentsBatchCommunity({
            msg: msg,
            commentId: replyComment?.commentId,
            batchCommunityId: selectedCommunity,
          });
          setMsg("");
        }
      } else if (isEditComment?.show) {
        if (isEditComment?.replyComment) {
          editReplyComment({
            replyCommentId: isEditComment?.data?.replyId,
            msg,
            batchCommunityId: batchCommunityData?.data?.id,
          });
          setIsEditComment({ show: false, data: {}, replyComment: false });
          setMsg("");
        } else {
          editComment(
            {
              commentId: isEditComment?.data?.commentId,
              msg,
              batchCommunityId: batchCommunityData?.data?.id,
            },
            file
          );
          setImage(null);
          setEditImage(null);
          setIsEditComment({ show: false, data: {}, replyComment: false });
          setMsg("");
        }
      }
    } else {
      toast.dismiss();
      toast.error("Add Something..");
    }
  };

  useEffect(() => {
    if (selectedCommunity !== -1) {
      getBatchCommunity(selectedCommunity);
      getCommunityComments({
        batchCommunityId: selectedCommunity,
        page: 1,
        pageSize: 10,
      });
    }
  }, [selectedCommunity]);

  //handle lik and dislike
  const handleLikeDislike = (id) => {
    batchCommunityLikeAndDislike({ batchCommunityId: id }, "");
  };

  //user info
  const details = JSON.parse(localStorage.getItem("details"));

  //popover
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const [anchorElReply, setAnchorElReply] = useState(null);
  const handleClickReply = (event) => {
    setAnchorElReply(event.currentTarget);
  };

  const handleClosePopoverReply = () => {
    setAnchorElReply(null);
  };

  const openReply = Boolean(anchorElReply);

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

  //COMMENT REPLY STATE
  const [replies, setReplies] = useState({ show: false, replies: [] });
  const [replyComment, setReplyComment] = useState(-1);
  useEffect(() => {
    setReplyComment(-1);
    setMsg("");
    // setImage(null);
    setIsEditComment({
      show: false,
      data: {},
      replyComment: false,
    });
  }, [doubtOpen]);

  const handleReplyToComments = (item) => {
    setReplyComment(item);
  };

  //fetching new replies
  useEffect(() => {
    if (batchCommunityCommentsData) {
      if (replies?.show) {
        batchCommunityCommentsData?.data?.comments?.map((item, index) => {
          if (item?.commentId == replies?.id) {
            setReplies({ show: true, replies: item?.replies });
          }
        });
      }
    }
  }, [batchCommunityCommentsData]);

  //comment edit
  const [isEditComment, setIsEditComment] = useState({
    show: false,
    data: {},
    replyComment: false,
  });

  useEffect(() => {
    if (isEditComment?.show) {
      if (!isEditComment?.replyComment) {
        // setImage(isEditComment?.data?.image)
        setEditImage(isEditComment?.data?.image);
        setMsg(isEditComment?.data?.cmntsMsg);
      } else if (isEditComment?.replyComment) {
        setMsg(isEditComment?.data?.cmntsMsg);
      }
    }
  }, [isEditComment]);

  //comment delete
  const handleCommentdelete = (item) => {
    deleteCommentBatchCommunity({
      batchCommunityId: selectedCommunity,
      commentId: item?.commentId,
      batchId: batchId,
    });
  };

  //reply Comment delete
  const handleReplyCommentDelete = (item) => {
    deleteReplyCommentCommunity({
      batchCommunityId: selectedCommunity,
      replyCommentId: item?.replyId,
      batchId: batchId,
    });
  };

  const [popoverHelper, setPopoverHelper] = useState("");

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFile(file);
        setImage(e.target.result);
        setEditImage(null);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <div className="doubt-detail">
      <ConfirmDialog
        handleReplyCommentDelete={handleReplyCommentDelete}
        handleCommentdelete={handleCommentdelete}
        deleteHelperState={deleteHelperState}
        setDeleteHelperState={setDeleteHelperState}
      />
      <Modal
        open={doubtOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="doubt-detail-wrapper">
          <div className="doubt-detail-title">
            <h2>Post Detail</h2>
            <IoClose className="doubt-detail-icon" onClick={handleClose} />
          </div>{" "}
          <Divider />
          <div className="doubt-detail-parent">
            <div className="post-details">
              <div className="post-details-left">
                <div className="post-details-left-user-profile">
                  <Avatar src={batchCommunityData?.data?.user?.profilePhoto} />
                </div>
                <div className="post-details-left-batch-detail">
                  <div className="post-details-left-batch-name">
                    {batchCommunityData?.data?.user?.name}

                    {batchCommunityData?.data?.user?.isVerified && (
                      <RiVerifiedBadgeFill
                        style={{ color: "var(--primaryColor)" }}
                      />
                    )}
                  </div>
                  <div className="post-details-left-user-name">
                    {batchCommunityData?.data?.createdAt}
                  </div>
                </div>
              </div>

              <div className="post-details-right">
                <Tooltip>
                  <IoAlertCircleOutline
                    className="feed_icon"
                    onClick={() => setDoubtPrivacyPolicy(!doubtPrivacyPolicy)}
                  />
                </Tooltip>
              </div>
            </div>
            <Divider />

            <div className="post-content-middle">
              {" "}
              <div className="post-title detail-post-title">
                {isExpanded
                  ? batchCommunityData?.data?.desc
                  : `${batchCommunityData?.data?.desc.slice(0, 250)}...`}
                {batchCommunityData?.data?.desc.length > 100 && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleText();
                    }}
                    style={{ color: "var(--primaryColor)" }}
                  >
                    {isExpanded ? "See Less" : "See More"}
                  </span>
                )}
              </div>
              {batchCommunityData?.data?.problemImage !== "" && (
                <div
                  className="post-content"
                  onClick={() => setDoubtOpen(true)}
                >
                  <img
                    src={batchCommunityData?.data?.problemImage}
                    onClick={(e) => {
                      e.stopPropagation();
                      setImgopen(true);
                      setImgsrc(batchCommunityData?.data?.problemImage);
                    }}
                  />
                </div>
              )}
            </div>

            <Divider />
            <div className="post-comments">
              <div className="doubt-like">
                {batchCommunityData?.data?.isLiked ? (
                  <IoIosHeart
                    className="doubt_icon heart"
                    onClick={() =>
                      handleLikeDislike(batchCommunityData?.data?.id)
                    }
                  />
                ) : (
                  <IoIosHeartEmpty
                    className="doubt_icon"
                    onClick={() =>
                      handleLikeDislike(batchCommunityData?.data?.id)
                    }
                  />
                )}{" "}
                {batchCommunityData?.data?.likes}
              </div>
              <div className="doubt-view">
                {" "}
                <MdOutlineRemoveRedEye className="doubt_icon" />{" "}
                {batchCommunityData?.data?.views}
              </div>

              <div className="doubt-comment">
                <FaRegComment className="doubt_icon" />
                {batchCommunityCommentsData?.data?.comments?.length}
                {/* {batchCommunityData?.data?.} */}
              </div>
            </div>

            <Divider />
            <div className="doubt-detail-lower">
              {true && batchCommunityCommentsData?.data && (
                <div className="doubt-detail-cmnts main-comments">
                  <h2>
                    Comments(
                    {batchCommunityCommentsData?.data?.comments?.length})
                  </h2>

                  {batchCommunityCommentsData?.data?.comments?.length > 0 ? (
                    batchCommunityCommentsData?.data?.comments?.map(
                      (item, index) => {
                        return (
                          <div
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPopoverHelper(item?.commentId);
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
                                    {item?.user?.name} .{" "}
                                    {item?.user?.isVerified && (
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
                                  <div className="post-comments-user-comment cmnt-with-img">
                                    {item?.cmntsMsg}
                                    {item?.image !== "" && item?.image && (
                                      <img
                                        src={item?.image}
                                        height={20}
                                        width={20}
                                        onClick={() => {
                                          setImgsrc(item?.image);
                                          setImgopen(true);
                                        }}
                                      />
                                    )}
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
                                        // setReplyComment(item)
                                        if (replies?.show) {
                                          setReplies({
                                            show: false,
                                            replies: [],
                                            id: "",
                                          });
                                        } else {
                                          setReplies({
                                            show: true,
                                            replies: item?.replies,
                                            id: item?.commentId,
                                          });
                                        }
                                      }}
                                    >
                                      {item?.replies?.length} Replies
                                    </div>
                                  </div>
                                </div>

                                <Button
                                  //  aria-describedby={`comment-${index}`}
                                  sx={{ background: "transparent" }}
                                  onClick={handleClick}
                                >
                                  <BsThreeDotsVertical />
                                </Button>
                                {item?.commentId == popoverHelper && (
                                  <Popover
                                    // id={`comment-${index}`}
                                    open={open}
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
                                            selectedCommunity:
                                              selectedCommunity,
                                            show: true,
                                          });
                                          // handleCommentdelete(item);
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
                            {replies?.show &&
                              item?.commentId == replies?.id && (
                                <div className="doubt-detail-cmnts">
                                  {/* <h2> <IoIosArrowRoundBack style={{ cursor: 'pointer' }} onClick={() => {
                          setReplyComment(-1)
                          setReplies({ show: false, replies: [] })
                        }} />Replies</h2> */}
                                  {/* {batchCommunityCommentsData?.data?.comments?.length > 0 ? */}
                                  {replies?.replies?.length > 0 ? (
                                    replies?.replies?.map((i, index) => {
                                      return (
                                        <div
                                          key={index}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setPopoverHelper(i?.replyId);
                                          }}
                                          style={{
                                            display: "flex",
                                            gap: "8px",
                                            marginLeft: "10px",
                                          }}
                                        >
                                          {" "}
                                          <div className="post-comments-user-profile">
                                            <Avatar
                                              src={i?.user?.profilePhoto}
                                            />
                                            {/* <Avatar src={item?.user?.profileIcon} /> */}
                                          </div>
                                          <div className="post-comments-user-comment-box detail-cmnt-box">
                                            <div>
                                              <div className="post-comments-user-name">
                                                {i?.user?.name} .{" "}
                                                {i?.user?.isVerified && (
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
                                                {i?.cmntsMsg}
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
                                            {i?.replyId == popoverHelper && (
                                              <Popover
                                                id={index}
                                                open={openReply}
                                                anchorEl={anchorElReply}
                                                onClose={
                                                  handleClosePopoverReply
                                                }
                                                anchorOrigin={{
                                                  vertical: "bottom",
                                                  horizontal: "left",
                                                }}
                                              >
                                                {i?.isMyReplyComment && (
                                                  <Typography
                                                    onClick={() => {
                                                      setAnchorElReply(null);
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
                                                {i?.isMyReplyComment && (
                                                  <Typography
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      setAnchorElReply(null);

                                                      setDeleteHelperState({
                                                        type: "replyComment",
                                                        data: i,
                                                        selectedCommunity:
                                                          selectedCommunity,
                                                        show: true,
                                                      });
                                                      // handleReplyCommentDelete(
                                                      //   i
                                                      // );
                                                    }}
                                                    sx={{
                                                      ...popOverItemStyle,
                                                    }}
                                                  >
                                                    <MdOutlineDeleteForever />
                                                    Delete
                                                  </Typography>
                                                )}
                                                {!i?.isMyReplyComment && (
                                                  <Typography
                                                    onClick={() => {
                                                      setAnchorElReply(null);

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
                                    })
                                  ) : (
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "100%",
                                      }}
                                    >
                                      "No Comments, be the first one to
                                      comment..."
                                    </div>
                                  )}
                                </div>
                              )}
                          </div>
                        );
                      }
                    )
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      {" "}
                      "No Comments, be the first one to comment..."
                    </div>
                  )}
                </div>
              )}{" "}
              {replyComment !== -1 && (
                <div className="reply-to">
                  <p>
                    <span> Reply To : {replyComment?.user?.name} </span>

                    <MdOutlineCancel
                      style={{ cursor: "pointer" }}
                      onClick={() => setReplyComment(-1)}
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
                      placeholder="Add Comment Here..."
                    />
                  </div>
                  {(!isEditComment?.replyComment || replyComment == -1) && (
                    <div
                      className="cmnt-upload-icon"
                      onClick={() =>
                        document.getElementById("file-input").click()
                      }
                    >
                      {/* <CgAttachment /> */}
                      {/* {(!image && <FaRegImage className="upload-pic-icon" />)} */}
                      <FaRegImage className="upload-pic-icon" />
                    </div>
                  )}
                  <input
                    type="file"
                    id="file-input"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                  <div
                    className="doubt-detail-btn-container"
                    onClick={onsubmit}
                  >
                    <IoMdSend />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {(image || editImage) && (
            <div className="cmnt-img-container">
              {" "}
              <div className="image-preview-container">
                <img
                  src={
                    editImage ? editImage : image
                    // isEditComment?.show
                    //   ? isEditComment?.data?.image
                    //     ? uploadPic
                    //     : isEditComment?.data?.image
                    //   : uploadPic
                  }
                  alt="Uploaded"
                  className="uploaded-image"
                />
                <button
                  className="remove-btn"
                  onClick={() => {
                    if (editImage) {
                      setEditImage(null);
                    } else {
                      handleRemoveImage();
                    }
                  }}
                >
                  &times;
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
