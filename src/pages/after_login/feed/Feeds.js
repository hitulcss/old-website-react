import React, { useContext, useEffect, useState } from "react";
import "./Feeds.css";
import { GrView } from "react-icons/gr";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { GoCommentDiscussion } from "react-icons/go";
import { NavLink, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import SideBar from "../../../components/Sidebar/SideBar";
import { CoursesData } from "../../../context/courses/Courses";
import { Avatar, CircularProgress, Stack } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "@mui/material/Pagination";
import Loader from "../../../components/Loader/Loader";
import { FaRegComment } from "react-icons/fa";
import { HeadProvider, Title } from "react-head";

const Feeds = () => {
  //loader
  const [loader, setLoader] = useState(true);

  //pagination
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  //Context data
  const { getAllFeed, allFeed, isSidebarExpanded, likeOrRemoveLike } =
    useContext(CoursesData);
  useEffect(() => {
    //Feed Api
    setLoader(true);
    getAllFeed({ page: page, pageSize: 6 });
  }, [page]);

  useEffect(() => {
    if (allFeed) setLoader(false);
  }, [allFeed]);
  const navigate = useNavigate();

  return (
    <>
      <HeadProvider>
        <Title>Feed - SD Campus </Title>
      </HeadProvider>
      {" "}
      <NavBar from="after-login" width={isSidebarExpanded ? 250 : 93} />
      <Toaster />
      <div>
        {" "}
        <SideBar />
        <div
          className={
            isSidebarExpanded
              ? "after-login-mid open-sidebar"
              : "after-login-mid closed-sidebar"
          }
          style={{
            marginLeft: isSidebarExpanded ? "250px" : "100px",
            background: "#fff",
            paddingBottom: "20px",
          }}
        >
          {!loader ? (
            <div className="feed_wrapper">
              <div className="feed_container" data-aos="fade-left">
                {allFeed?.data1?.posts?.length > 0 &&
                  allFeed?.data1?.posts?.map((item, index) => (
                    // <NavLink >
                    <div key={index} className="feed_post">
                      <div
                        className="feed_post_upper"
                        onClick={() => {
                          navigate(`/learning/feed-details/${item?.id}`);
                        }}
                      >
                        <img src={item?.author?.profileIcon} alt="" />
                        <div>
                          <p className="feed_post_title">{item?.title}</p>
                          <p>{item?.createdAt ? item?.createdAt : "3h"}</p>
                        </div>
                      </div>
                      <div className="feed_post_mid">
                        <div
                          className="feed_poster_img"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/learning/feed-details/${item?.id}`);
                          }}
                        >
                          <img src={item.featuredImage} />
                        </div>
                        <div className="mid_lower_contents">
                          <div className="post_view">
                            <GrView className="feed_icon" />
                            {item.viewsCount}
                          </div>
                          <div
                            className="post_likes"
                            onClick={(e) => {
                              e.stopPropagation();
                              likeOrRemoveLike(item?.id);

                              if (!item?.isLiked) {
                                toast.dismiss()
                                toast.success("Liked the post");
                              } else {
                                toast.dismiss()
                                toast.success("Like removed");
                              }
                            }}
                          >
                            {item?.isLiked ? (
                              <IoIosHeart
                                style={{ color: "red" }}
                                className="feed_icon"
                              />
                            ) : (
                              <IoIosHeartEmpty className="feed_icon" />
                            )}
                            {item.likeCounts}
                          </div>
                          <div
                            className="post_comments"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/learning/feed-details/${item?.id}`);
                            }}
                          >
                            <FaRegComment className="feed_icon" />
                            {item.comments?.count}
                          </div>
                        </div>
                      </div>
                      <p style={{ border: "1px solid #dfdfdf" }}></p>
                      {item?.comments?.commentList?.length > 0 ? (
                        item?.comments?.commentList
                          ?.slice(0, 2)
                          ?.map((item2, index) => {
                            return (
                              <>
                                <div
                                  className="feed_post_lower"
                                  key={index}
                                  onClick={() => {
                                    navigate(
                                      `/learning/feed-details/${item?.id}`
                                    );
                                  }}
                                >
                                  <div className="avatar_container">
                                    {" "}
                                    {/* <RxAvatar className="user_avatar" /> */}
                                    <Avatar
                                      alt="Remy Sharp"
                                      src={item2?.user?.profileIcon}
                                      sx={{ width: 35, height: 35 }}
                                    />
                                  </div>

                                  <div className="user_cmnt_detail">
                                    <p className="feed_cmnt_upper">
                                      <span className="feed_username">
                                        {item2?.user?.name}
                                      </span>{" "}
                                      &nbsp;
                                      <span className="feed_cmnt_time">
                                        {item2.createdAt}
                                      </span>
                                    </p>
                                    <p className="user_cmnts">
                                      {item2?.cmntsMsg}
                                    </p>
                                  </div>
                                </div>
                              </>
                            );
                          })
                      ) : (
                        <div className="feed_post_lower no-cmnts">
                          No Comments...
                        </div>
                      )}
                    </div>
                    // </NavLink>
                  ))}
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
          <Pagination
            sx={{ width: "50%", margin: "auto" }}
            count={Math.ceil(allFeed?.data1?.totalCounts / 6)}
            page={page}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default Feeds;
