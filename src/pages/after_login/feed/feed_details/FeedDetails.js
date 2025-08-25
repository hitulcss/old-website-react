import React, { useContext, useEffect, useState } from "react";
import "./FeedDetails.css";
import { GrView } from "react-icons/gr";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { GoCommentDiscussion } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { CoursesData } from "../../../../context/courses/Courses";
import NavBar from "../../NavBar/NavBar";
import toast, { Toaster } from "react-hot-toast";
import SideBar from "../../../../components/Sidebar/SideBar";
import { useParams } from "react-router-dom";
import { Avatar, CircularProgress, Stack } from "@mui/material";
import { Cancel } from "@material-ui/icons";
import Wrapper from "../../../../components/Wrapper/Wrapper";
import Loader from "../../../../components/Loader/Loader";
import { FaRegComment } from "react-icons/fa";

const FeedDetails = () => {
  //user profile
  const profile = localStorage.getItem("details")
    ? JSON.parse(localStorage.getItem("details"))
    : "";

  //loader
  const [loader, setLoader] = useState(true);

  //PostId
  const { postId } = useParams();

  //delete/edit modal
  const [isOpen, setIsOpen] = useState(false);
  const [commentIdForReply, setCommentIdForReply] = useState("");
  const [commentId, setCommentId] = useState("");
  const [page, setPage] = useState(1);

  //Context data
  const {
    getpostById,
    postData,
    isSidebarExpanded,
    likeOrRemoveLike,
    loading,
    addCommentToPost,
    deleteComment,
    replyToComments,
    deleteReplyComment,
    postComments,
    getCommentsByPostId,
    commentsLoading,
  } = useContext(CoursesData);

  const [allComments, setAllComments] = useState([]);
  useEffect(() => {
    //focus on input field
    if (document.getElementById("input-field")) {
      document.getElementById("input-field").focus();
    }

    //post api
    if (postId) {
      getpostById(postId);
      getCommentsByPostId({ postId, page: 1, pageSize: 10 });
    }
  }, [postId]);
  useEffect(() => {
    if (postData) {
      setLoader(false);
    }
  }, [postData]);

  //pagination

  useEffect(() => {
    if (page > 1 && page <= Math.ceil(postComments?.comments?.count / 10)) {
      getCommentsByPostId({ postId, page: page, pageSize: 10 });
    }
  }, [page]);

  useEffect(() => {
    if (postComments) {
      if (postComments?.comments?.commentList) {
        let helper = [];
        allComments?.map((i) => helper.push(i));
        postComments?.comments?.commentList?.map((i) => helper.push(i));

        setAllComments(helper);
      }
    }
  }, [postComments]);

  //liked
  const [isLiked, setIsLiked] = useState(postData?.isLiked);

  //comment input
  const [comment, setComment] = useState("");
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  //handling enter
  const handlerFuntion = () => {
    if (comment !== "") {
      if (replyTo?.post) {
        addCommentToPost({ msg: comment, postId: postData?.id });
      } else if (replyTo?.comment) {
        replyToComments({
          msg: comment,
          postId: postData?.id,
          commentId: commentIdForReply,
        });
      }
      setComment("");
    } else {
      toast.error("Message can not be empty...");
    }
  };

  //posting comment
  const postComment = (id) => {
    if (comment !== "") {
      if (replyTo?.post) {
        addCommentToPost({ msg: comment, postId: postData?.id });
      } else if (replyTo?.comment) {
        replyToComments({
          msg: comment,
          postId: postData?.id,
          commentId: commentIdForReply,
        });
      }
      setComment("");
    } else {
      toast.error("Message can not be empty...");
    }
  };

  //replyComment
  const [replyTo, setReplyTo] = useState({
    post: true,
    comment: false,
    replyComment: false,
    name: "",
  });

  return (
    <>
      <NavBar from="after-login" width={isSidebarExpanded ? 250 : 93} />
      <Toaster />
      <div>
        {" "}
        <SideBar />
        {!loader ? (
          <div
            className={
              isSidebarExpanded
                ? "after-login-mid open-sidebar"
                : "after-login-mid closed-sidebar"
            }
            style={{ marginLeft: isSidebarExpanded ? "250px" : "100px" }}
          >
            <div className="feed_details_wrapper">
              <Wrapper>
                <div className="feed_detials_container">
                  <div className="feed_details_upper_post">
                    {" "}
                    <img src={postData?.featuredImage} alt="" />
                    <h1>{postData?.title} </h1>
                  </div>

                  <div className="user_detail_cmnt">
                    <div className="user_detail_container">
                      {" "}
                      <Avatar src={postData?.author?.profileIcon} />
                      <div>
                        <p>{postData?.author?.name}</p>
                        <p
                          style={{
                            color: "var(--textGray)",
                            fontSize: "0.9rem",
                          }}
                        >
                          {postData?.createdAt}
                        </p>
                      </div>
                    </div>

                    <div className="feed_post_content">
                      <p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: postData?.description,
                          }}
                        />
                      </p>
                    </div>

                    <div>
                      <p style={{ border: "1px solid #dfdfdf" }}></p>

                      <div className="mid_lower_contents">
                        <div className="post_view">
                          <GrView className="feed_icon" />
                          {postData?.viewsCount}
                        </div>
                        <div
                          className="post_likes"
                          onClick={() => {
                            likeOrRemoveLike(postData?.id);
                            setIsLiked(true);
                            getpostById(postId);
                            if (!postData?.isLiked) {
                              toast.success("Liked the post");
                            } else {
                              toast.success("Like removed");
                            }
                          }}
                        >
                          {postData?.isLiked ? (
                            <IoIosHeart
                              style={{ color: "red" }}
                              className="feed_icon"
                            />
                          ) : (
                            <IoIosHeartEmpty className="feed_icon" />
                          )}
                          {postData?.likeCounts}
                        </div>
                        <div className="post_comments">
                          <FaRegComment className="feed_icon" />
                          {postComments?.comments?.count}
                        </div>
                      </div>

                      <p style={{ border: "1px solid #dfdfdf" }}></p>
                    </div>

                    {/* {!commentsLoading ? ( */}
                    {true ? (
                      <div className="feed_post_cmnt">
                        <p>Comments {postComments?.comments?.count}</p>

                        {allComments?.length > 0 ? (
                          allComments?.map((item, index) => {
                            return (
                              <>
                                <div
                                  className="feed_post_main_cmnts"
                                  key={index}
                                >
                                  {" "}
                                  {/* <RxAvatar className="feed_detail_icon" /> */}
                                  <Avatar src={item?.user?.profileIcon} />
                                  <div className="main_cmnt_container">
                                    <div className="main_cmnt_left">
                                      <div className="cmnt_name_container">
                                        {" "}
                                        <p
                                          style={{
                                            color: item?.myComment
                                              ? "green"
                                              : "",
                                          }}
                                        >
                                          {item?.user?.name} .{" "}
                                        </p>{" "}
                                        <span
                                          style={{
                                            color: "var(--textGray)",
                                            fontSize: "0.9rem",
                                          }}
                                        >
                                          {item?.createdAt}
                                        </span>
                                      </div>

                                      <p className="user_main_cmnt">
                                        {item?.cmntsMsg}
                                      </p>
                                      <p
                                        className="cmnt_lower"
                                        onClick={() => {
                                          document
                                            .getElementById("input-field")
                                            .focus();
                                          setCommentIdForReply(item?.id);
                                          setReplyTo({
                                            post: false,
                                            comment: true,
                                            replyComment: false,
                                            name: item?.user?.name,
                                          });
                                        }}
                                      >
                                        {item?.replies?.length} Reply
                                      </p>
                                    </div>
                                    <div
                                      className="main_cmnt_right"
                                      onClick={() => setCommentId(item?.id)}
                                    >
                                      {item?.myComment && (
                                        <BsThreeDotsVertical
                                          onClick={() => setIsOpen(!isOpen)}
                                        />
                                      )}
                                      {isOpen && commentId == item?.id && (
                                        <div className="edit-update">
                                          <span
                                            style={{
                                              borderBottom:
                                                "1px solid lightgray",
                                            }}
                                          >
                                            Edit
                                          </span>
                                          <span
                                            style={{ color: "red" }}
                                            onClick={() =>
                                              deleteComment({
                                                postId: postData?.id,
                                                commentId: item?.id,
                                              })
                                            }
                                          >
                                            Delete
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {item?.replies?.length > 0 &&
                                  item?.replies?.map((replyItem, index) => {
                                    return (
                                      <>
                                        <div className="reply_cmnt" key={index}>
                                          {/* <RxAvatar className="feed_detail_icon" /> */}
                                          <Avatar
                                            src={replyItem?.user?.profileIcon}
                                          />
                                          <div className="reply_cmnt_container">
                                            <div className="reply_cmnt_left">
                                              <div className="cmnt_name_container">
                                                {" "}
                                                <p
                                                  style={{
                                                    color: item?.myComment
                                                      ? "green"
                                                      : "",
                                                  }}
                                                >
                                                  {replyItem?.user?.name} .{" "}
                                                </p>{" "}
                                                <span>
                                                  {replyItem?.createdAt}
                                                </span>
                                              </div>

                                              <p className="user_main_cmnt">
                                                {replyItem?.cmntsMsg}
                                              </p>
                                              <p className="cmnt_lower">
                                                {replyItem?.likesCount} Likes
                                              </p>
                                            </div>
                                            <div
                                              className="reply_cmnt_right"
                                              onClick={() =>
                                                setCommentId(replyItem?.id)
                                              }
                                            >
                                              {replyItem?.myComment && (
                                                <BsThreeDotsVertical
                                                  onClick={() =>
                                                    setIsOpen(!isOpen)
                                                  }
                                                />
                                              )}
                                              {isOpen &&
                                                commentId == replyItem?.id && (
                                                  <div className="edit-update">
                                                    <span
                                                      style={{
                                                        borderBottom:
                                                          "1px solid lightgray",
                                                      }}
                                                    >
                                                      Edit
                                                    </span>
                                                    <span
                                                      style={{ color: "red" }}
                                                      onClick={() =>
                                                        deleteReplyComment({
                                                          postId: postData?.id,
                                                          commentId:
                                                            replyItem?.id,
                                                        })
                                                      }
                                                    >
                                                      Delete
                                                    </span>
                                                  </div>
                                                )}
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    );
                                  })}
                              </>
                            );
                          })
                        ) : (
                          <>No Comments</>
                        )}
                        {commentsLoading && (
                          <Stack
                            direction="row"
                            justifyContent="center"
                            mt={1}
                            sx={{ width: "100%" }}
                          >
                            {" "}
                            <Loader />
                          </Stack>
                        )}
                        {!commentsLoading &&
                          (page <
                          Math.ceil(postComments?.comments?.count / 10) ? (
                            <p
                              className="read-more"
                              onClick={() => {
                                if (
                                  page <=
                                  Math.ceil(postComments?.comments?.count / 10)
                                ) {
                                  setPage(page + 1);
                                }
                              }}
                            >
                              Load more....
                            </p>
                          ) : (
                            page != 1 && (
                              <p
                                className="read-more"
                                onClick={() => {
                                  // if (page <= postComments?.comments?.count) {
                                  setPage(1);
                                  setAllComments([]);
                                  getCommentsByPostId({
                                    postId,
                                    page: 1,
                                    pageSize: 10,
                                  });
                                  // }
                                }}
                              >
                                Show Less....
                              </p>
                            )
                          ))}
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "50vh",
                        }}
                      >
                        {" "}
                        <Loader />
                      </div>
                    )}
                  </div>
                </div>
              </Wrapper>
              <div className="lower_cmnt_box">
                <div className="lower_cmnt_box_container">
                  {replyTo?.name !== "" && (
                    <div className="to-box">
                      {replyTo?.name}{" "}
                      <Cancel
                        onClick={() => {
                          setReplyTo({
                            post: true,
                            comment: false,
                            replyComment: false,
                            name: "",
                          });
                        }}
                        style={{ fontSize: "10px" }}
                      />
                    </div>
                  )}
                  <Avatar src={profile?.profilePhoto} />

                  <div className="input_box_container">
                    {" "}
                    <input
                      id="input-field"
                      type="text"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={handleChange}
                      onKeyDown={(e) => {
                        if (e.key == "Enter") handlerFuntion();
                      }}
                    />
                  </div>
                  <div className="cmnt_box_btn" onClick={postComment}>
                    <AiOutlineSend />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "90vh",
            }}
          >
            {" "}
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};

export default FeedDetails;
