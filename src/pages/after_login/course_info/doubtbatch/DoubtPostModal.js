import React, { useContext, useState } from "react";
import "./CommunityPostModal.css";
import { Avatar, Button, Divider, Popover, Typography } from "@mui/material";
import { IoIosHeart, IoIosHeartDislike, IoIosHeartEmpty } from "react-icons/io";
import sample from "../../../../assets/after-login-banner.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { CoursesData } from "../../../../context/courses/Courses";
import {
  MdOutlineCancel,
  MdOutlineDeleteForever,
  MdOutlineEdit,
  MdOutlineReportProblem,
} from "react-icons/md";
import toast from "react-hot-toast";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import ConfirmDialog from "./Confirmation";
import { FaRegComment } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { pushToDataLayer } from "../../../../gtm/gtm";

const DoubtPostModal = ({
  batchData,
  prePurchase,
  setShowReport,
  doubtOpen,
  setDoubtOpen,
  batchId,
  data,
  setSelectedCommunity,
  helperState,
  setHelperState,
  isEdit,
  setIsEdit,
  setOpen,
  deleteHelperState,
  setDeleteHelperState,
  setImgsrc,
  setImgopen,
  setLockModal,
}) => {
  const { batchDoubtLikeAndDislike, deleteBatchDoubt } =
    useContext(CoursesData);

  const handleLikeDislike = async (id) => {
    if (!prePurchase) {
      batchDoubtLikeAndDislike({ batchDoubtId: id }, batchId);
    } else {
      toast.dismiss();
      setLockModal(true);
      // toast("Purchase Batch to contribute...");
    }
  };

  //popover
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };



  const [likeState, setLikeState] = useState({
    liked: data?.isLiked,
    id: data?.id,
    count: data?.likes,
  });

  return (
    <div className="doubt-post-parent">
      {deleteHelperState?.data?.id == data?.id && (
        <ConfirmDialog
          deleteHelperState={deleteHelperState}
          setDeleteHelperState={setDeleteHelperState}
          batchId={batchId}
        />
      )}
      <div className="post-details">
        <div
          className="post-details-left"
          onClick={() => {
            setSelectedCommunity(data?.id);
            setDoubtOpen(true);
            pushToDataLayer({
              ecommerce: null, // Clear the previous ecommerce object.
            });
            pushToDataLayer({
              event: "doubt_viewed",
              isLoggedIn: localStorage?.getItem("isLoggedIn"),
              batchId: batchId,
              batchCommunityId: data.id
            });
          }}
        >
          <div className="post-details-left-user-profile">
            <Avatar src={data?.user?.profilePhoto} />
          </div>
          <div className="post-details-left-batch-detail">
            <div className="post-details-left-batch-name">
              {data?.user?.name}{" "}
              {data?.user?.isVerified ? (
                <RiVerifiedBadgeFill style={{ color: "var(--primaryColor)" }} />
              ) : (
                ""
              )}
            </div>
            <div className="post-details-left-user-name">{data?.createdAt}</div>
          </div>
        </div>

        <div className="post-details-right">
          {!prePurchase && (
            <Button
              aria-describedby={data?.id}
              sx={{ background: "transparent" }}
              onClick={handleClick}
            >
              <BsThreeDotsVertical className="feed_icon" />
            </Button>
          )}
          <Popover
            id={data?.id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            {data?.isMyDoubt && (
              <Typography
                sx={{
                  ...popOverItemStyle,
                  fontSize: "1rem",
                }}
                onClick={() => {
                  setAnchorEl(null);
                  setOpen(true);
                  setIsEdit({ show: true, data: data });
                }}
              >
                <MdOutlineEdit /> Edit{" "}
              </Typography>
            )}
            {data?.isMyDoubt && (
              <Typography
                onClick={() => {
                  setAnchorEl(null);
                  setDeleteHelperState({
                    type: "post",
                    show: true,
                    data: data,
                  });
                  // deleteBatchDoubt({ batchCommunityId: data?.id, batchId })
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
            {!data?.isMyDoubt && (
              <Typography
                onClick={() => {
                  setAnchorEl(null);
                  setShowReport({ show: true, type: "post", data: data });
                }}
                sx={{
                  ...popOverItemStyle,
                  fontSize: "1rem",
                }}
              >
                <MdOutlineReportProblem />
                Report
              </Typography>
            )}
          </Popover>
        </div>
      </div>

      <div
        className="post-title doubt-title"
        onClick={() => {
          setSelectedCommunity(data?.id);
          setDoubtOpen(true);
          pushToDataLayer({
            ecommerce: null, // Clear the previous ecommerce object.
          });
          pushToDataLayer({
            event: "doubt_viewed",
            isLoggedIn: localStorage?.getItem("isLoggedIn"),
            batchId: batchId,
            batchCommunityId: data.id
          });
        }}
      >
        <p style={{ color: "var(--primaryColor)" }}>
          {data?.lectureName} | {data?.subject}
        </p>
        {data?.desc !== "" && <p>{data?.desc}</p>}
      </div>
      {data?.problemImage !== "" && (
        <div
          className="post-content"
          onClick={() => {
            setSelectedCommunity(data?.id);
            setDoubtOpen(true);
            pushToDataLayer({
              ecommerce: null, // Clear the previous ecommerce object.
            });
            pushToDataLayer({
              event: "doubt_viewed",
              isLoggedIn: localStorage?.getItem("isLoggedIn"),
              batchId: batchId,
              batchCommunityId: data.id
            });
          }}
        >
          <img
            src={data?.problemImage}
            onClick={(e) => {
              e.stopPropagation();
              setImgopen(true);
              setImgsrc(data?.problemImage);
            }}
          />
        </div>
      )}
      <Divider />
      <div className="post-comments">
        {/* <div className="post-comments-user-profile">
          <Avatar />
        </div>
        <div className="post-comments-user-comment-box">
          <div className="post-comments-user-name">
            Ajay Singh . 5 minutes ago
          </div>
          <div className="post-comments-user-comment">
            Hi, Kindly call at 080-49232873 for purchase related information so
            that team can help you.
          </div>
        </div> */}
        <div className="doubt-like">
          {likeState?.liked ? (
            <IoIosHeart
              className="doubt_icon heart"
              onClick={() => {
                setLikeState({
                  liked: false,
                  id: data.id,
                  count: likeState?.count - 1,
                });
                handleLikeDislike(data?.id)
              }}
            />
          ) : (
            <IoIosHeartEmpty
              className="doubt_icon"
              onClick={() => {
                setLikeState({
                  liked: true,
                  id: data.id,
                  count: likeState?.count + 1,
                });
                handleLikeDislike(data?.id)
              }}
            />
          )}
          {likeState?.count}{" "}
        </div>
        <div
          className="doubt-comment"
          onClick={() => {
            setSelectedCommunity(data?.id);
            setDoubtOpen(true);
            pushToDataLayer({
              ecommerce: null, // Clear the previous ecommerce object.
            });
            pushToDataLayer({
              event: "doubt_viewed",
              isLoggedIn: localStorage?.getItem("isLoggedIn"),
              batchId: batchId,
              batchCommunityId: data.id
            });
          }}
        >
          <FaRegComment className="doubt_icon" />
          {data?.totalComments}
        </div>
        {data?.isResolved ? (
          <div className="doubt-status-resolve">
            {" "}
            <IoCheckmarkCircle />
            Resolved
          </div>
        ) : (
          <div className="doubt-status-pending">
            {" "}
            <MdOutlineAccessTimeFilled />
            Pending
          </div>
        )}
      </div>
    </div>
  );
};

export default DoubtPostModal;
