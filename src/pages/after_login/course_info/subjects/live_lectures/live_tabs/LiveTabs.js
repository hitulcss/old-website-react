import * as React from "react";
import "./LiveTabs.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TbFileDescription } from "react-icons/tb";
import { MdOutlineSnippetFolder } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { LuSendHorizonal } from "react-icons/lu";
import LiveInfo from "../live_info/LiveInfo";
import pdfIcon from "../../../../../../assets/live/pdf.png";
import downloadIcon from "../../../../../../assets/live/downloadpdf.png";
import ReviewModal from "../../../../../../components/Review_Modal/ReviewModal";
import Report from "../../../../two-way/Twoway-tabs/report/Report";
import { Avatar, Stack } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReplyIcon from "@mui/icons-material/Reply";
import ReportIcon from "@mui/icons-material/Report";
import PushPinIcon from "@mui/icons-material/PushPin";
import { Cancel } from "@material-ui/icons";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function LiveTabs({
  markCommentToPin,
  markCommentToReport,
  lectureDetails,
  setCommentIdForReply,
  commentIdForReply,
  setReplyTo,
  replyTo,
  handleChange2,
  msg,
  isChatVisible,
  lectureComments,
  details,
  deleteCommentForLecture,
  Id,
  setShowMoreMenu,
  showMoreMenu,
  avatarimg,
  sendMessage,
}) {
  const [value, setValue] = React.useState(0);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let count = 0
  // lectureComments ? lectureComments?.filter(i => i?.isPin)?.length() : ''


  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          style={{ display: "flex", justifyContent: "space-between" }}
          className="tabs_main"
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            icon={<TbFileDescription className="tab_icon" />}
            label="Info"
            {...a11yProps(0)}
            className="custom-tab"
          />
          {lectureDetails?.LiveOrRecorded == "Recorded" && (
            <Tab
              icon={<TbFileDescription className="tab_icon" />}
              label="Comments"
              {...a11yProps(lectureDetails?.LiveOrRecorded == "Recorded" && 1)}
              className="custom-tab"
            />
          )}
          <Tab
            icon={<MdOutlineSnippetFolder className="tab_icon" />}
            label="Resources"
            {...a11yProps(lectureDetails?.LiveOrRecorded == "Recorded" ? 2 : 1)}
            className="custom-tab"
          />
          <Tab
            icon={<FaRegStar className="tab_icon" />}
            label="Rating"
            {...a11yProps(lectureDetails?.LiveOrRecorded == "Recorded" ? 3 : 2)}
            onClick={() => setModalOpen(true)}
            className="custom-tab"
          />
          <Tab
            icon={<IoWarningOutline className="tab_icon" />}
            label="Report"
            {...a11yProps(lectureDetails?.LiveOrRecorded == "Recorded" ? 4 : 3)}
            className="custom-tab"
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <LiveInfo lectureDetails={lectureDetails} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={lectureDetails?.LiveOrRecorded == "Recorded" && 1}>
        {!isChatVisible && lectureDetails?.LiveOrRecorded == "Recorded" && (
          <div className="chat-box">
            <div className="inner_chat" style={{
              position: 'relative',
              // paddingTop: `${lectureComments?.filter(i => i?.isPin)?.length * 100}px`,
              paddingTop: '10px'

            }}>
              <div
                id="comment-section"
                style={{
                  overflowY: "scroll",
                  padding: "20px",
                  height: "70vh",
                  display: "flex",
                  flexDirection: "column",
                  position: 'relative',


                }}
              >
                <div style={{ position: 'sticky', top: 0, background: '#fff', zIndex: '99' }}> {lectureComments?.filter(i => i?.isPin)?.map((item, index) => {
                  ++count
                  return (
                    <Stack
                      key={index}
                      direction="row"
                      alignItems="center"
                      justifyContent={
                        details?.name == item?.user?.name ? "" : ""
                      }
                      mb={2}
                      sx={{
                        // position: item?.isPin ? 'absolute' : '',
                        // top: '0px',
                        width: "100%",
                        color: details?.name == item?.user?.name ? "green" : "",
                        width: '90%',
                        // borderBottom: item?.isPin ? '1px solid #d3d3d3' : '',
                        // padding: item?.isPin && '10px'
                      }}
                    >
                      <div>
                        <div
                          className="msg-box msg-box-youtube"
                          style={{
                            position: "relative",
                            marginTop: "10px",
                            maxWidth: "100%",
                          }}
                        >
                          <div
                            className="from-to-box"
                            style={{
                              color: details?.name == item?.name ? "green" : "",
                            }}
                          >
                            <Avatar
                              src={item?.user?.profilePhoto}
                              style={{ height: "20px", width: "20px" }}
                            />{" "}
                            {item?.user?.name}  {item?.isPin && <span style={{ fontSize: '8px' }}><PushPinIcon sx={{ fontSize: 15 }} /></span >}
                          </div>
                          <p style={{ marginLeft: "30px", marginTop: "10px" }}>
                            {item?.comment}
                          </p>


                          {showMoreMenu?.state &&
                            showMoreMenu?.id == item?.id && (
                              <div
                                className="comment-options"
                                style={{
                                  position: "absolute",
                                  right: 0,
                                  top: "60%",
                                }}
                              >
                                <ul>
                                  {details?.id == item?.user?.id && (
                                    <li
                                      style={{ color: "red" }}
                                      onClick={() =>
                                        deleteCommentForLecture({
                                          commentId: item?.id,
                                          lectureId: Id,
                                        })
                                      }
                                    >
                                      <DeleteIcon />
                                      <span>Delete</span>
                                    </li>
                                  )}
                                  {details?.id == item?.user?.id && (
                                    <li>
                                      <EditIcon />
                                      <span>Edit</span>
                                    </li>
                                  )}
                                  <li
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
                                    <ReplyIcon /> <span>Reply</span>
                                  </li>
                                  {details?.id !== item?.user?.id && (
                                    <li
                                      onClick={() =>
                                        markCommentToReport(item?.id)
                                      }
                                    >
                                      <ReportIcon />
                                      <span>Report Comment</span>
                                    </li>
                                  )}
                                  {details?.email.includes(
                                    "@sdempire.co.in"
                                  ) && (
                                      <li
                                        onClick={() => markCommentToPin(item?.id)}
                                      >
                                        <PushPinIcon />
                                        <span>Pin Comment</span>
                                      </li>
                                    )}
                                </ul>
                              </div>
                            )}
                          <MoreVertIcon
                            size="small"
                            sx={{
                              position: "absolute",
                              cursor: "pointer",
                              right: 0,
                              top: "16px",
                            }}
                            onClick={() =>
                              setShowMoreMenu({
                                id: item?.id,
                                state: !showMoreMenu?.state,
                              })
                            }
                          />
                        </div>
                        {!item?.isPin && item?.replies?.length > 0 &&
                          item?.replies?.map((i, index2) => {
                            return (
                              <div
                                className="msg-box msg-box-youtube"
                                key={index2}
                                style={{
                                  position: "relative",
                                  marginLeft: "25px",
                                  marginTop: "10px",
                                  maxWidth: "100%",
                                }}
                              >
                                <div
                                  className="from-to-box"
                                  style={{
                                    color:
                                      details?.name == i?.user?.name
                                        ? "green"
                                        : "",
                                  }}
                                >
                                  <Avatar
                                    src={i?.user?.profilePhoto}
                                    style={{ height: "20px", width: "20px" }}
                                  />{" "}
                                  {i?.user?.name}
                                </div>
                                <p
                                  style={{
                                    marginLeft: "30px",
                                    marginTop: "10px",
                                  }}
                                >
                                  {i?.comment}
                                </p>
                                {showMoreMenu?.state &&
                                  showMoreMenu?.id == i?.id && (
                                    <div
                                      className="comment-options"
                                      style={{
                                        position: "absolute",
                                        right: 0,
                                        top: "60%",
                                      }}
                                    >
                                      <ul>
                                        {details?.id == i?.user?.id && (
                                          <li
                                            style={{ color: "red" }}
                                            onClick={() =>
                                              deleteCommentForLecture({
                                                commentId: i?.id,
                                                lectureId: Id,
                                              })
                                            }
                                          >
                                            <DeleteIcon />
                                            <span>Delete</span>
                                          </li>
                                        )}
                                        {details?.id == i?.user?.id && (
                                          <li>
                                            <EditIcon />
                                            <span>Edit</span>
                                          </li>
                                        )}
                                        <li>
                                          <ReplyIcon /> <span>Reply</span>
                                        </li>
                                      </ul>
                                    </div>
                                  )}
                                <MoreVertIcon
                                  size="small"
                                  sx={{
                                    position: "absolute",
                                    cursor: "pointer",
                                    right: 0,
                                    top: "16px",
                                  }}
                                  onClick={() =>
                                    setShowMoreMenu({
                                      id: i?.id,
                                      state: !showMoreMenu?.state,
                                    })
                                  }
                                />
                              </div>
                            );
                          })}
                      </div>
                    </Stack>
                  );
                })}</div>
                {lectureComments?.filter(i => !i?.isPin)?.map((item, index) => {
                  // ++count
                  return (
                    <Stack
                      key={index}
                      direction="row"
                      alignItems="center"
                      justifyContent={
                        details?.name == item?.user?.name ? "" : ""
                      }
                      mb={2}
                      sx={{

                        width: "100%",
                        color: details?.name == item?.user?.name ? "green" : "",
                        width: '90%',
                        // borderBottom: item?.isPin ? '1px solid #d3d3d3' : '',
                        // padding: item?.isPin && '10px'
                      }}
                    >
                      <div>
                        <div
                          className="msg-box msg-box-youtube"
                          style={{
                            position: "relative",
                            marginTop: "10px",
                            maxWidth: "100%",
                          }}
                        >
                          <div
                            className="from-to-box"
                            style={{
                              color: details?.name == item?.name ? "green" : "",
                            }}
                          >
                            <Avatar
                              src={item?.user?.profilePhoto}
                              style={{ height: "20px", width: "20px" }}
                            />{" "}
                            {item?.user?.name}  {item?.isPin && <span style={{ fontSize: '8px' }}><PushPinIcon sx={{ fontSize: 15 }} /></span >}
                          </div>
                          <p style={{ marginLeft: "30px", marginTop: "10px" }}>
                            {item?.comment}
                          </p>


                          {showMoreMenu?.state &&
                            showMoreMenu?.id == item?.id && (
                              <div
                                className="comment-options"
                                style={{
                                  position: "absolute",
                                  right: 0,
                                  top: "60%",
                                }}
                              >
                                <ul>
                                  {details?.id == item?.user?.id && (
                                    <li
                                      style={{ color: "red" }}
                                      onClick={() =>
                                        deleteCommentForLecture({
                                          commentId: item?.id,
                                          lectureId: Id,
                                        })
                                      }
                                    >
                                      <DeleteIcon />
                                      <span>Delete</span>
                                    </li>
                                  )}
                                  {details?.id == item?.user?.id && (
                                    <li>
                                      <EditIcon />
                                      <span>Edit</span>
                                    </li>
                                  )}
                                  <li
                                    onClick={() => {
                                      document
                                        .getElementById("input-field")
                                        .focus();
                                      setCommentIdForReply(item?.id);
                                      // console.log(item)
                                      setReplyTo({
                                        post: false,
                                        comment: true,
                                        replyComment: false,
                                        name: item?.user?.name,
                                      });
                                      setShowMoreMenu({
                                        id: "",
                                        state: false,
                                      })
                                    }}
                                  >
                                    <ReplyIcon /> <span>Reply</span>
                                  </li>
                                  {details?.id !== item?.user?.id && (
                                    <li
                                      onClick={() =>
                                        markCommentToReport(item?.id)
                                      }
                                    >
                                      <ReportIcon />
                                      <span>Report Comment</span>
                                    </li>
                                  )}
                                  {details?.email.includes(
                                    "@sdempire.co.in"
                                  ) && (
                                      <li
                                        onClick={() => markCommentToPin(item?.id)}
                                      >
                                        <PushPinIcon />
                                        <span>Pin Comment</span>
                                      </li>
                                    )}
                                </ul>
                              </div>
                            )}
                          <MoreVertIcon
                            size="small"
                            sx={{
                              position: "absolute",
                              cursor: "pointer",
                              right: 0,
                              top: "16px",
                            }}
                            onClick={() =>
                              setShowMoreMenu({
                                id: item?.id,
                                state: !showMoreMenu?.state,
                              })
                            }
                          />
                        </div>
                        {!item?.isPin && item?.replies?.length > 0 &&
                          item?.replies?.map((i, index2) => {
                            return (
                              <div
                                className="msg-box msg-box-youtube"
                                key={index2}
                                style={{
                                  position: "relative",
                                  marginLeft: "25px",
                                  marginTop: "10px",
                                  maxWidth: "100%",
                                }}
                              >
                                <div
                                  className="from-to-box"
                                  style={{
                                    color:
                                      details?.name == i?.user?.name
                                        ? "green"
                                        : "",
                                  }}
                                >
                                  <Avatar
                                    src={i?.user?.profilePhoto}
                                    style={{ height: "20px", width: "20px" }}
                                  />{" "}
                                  {i?.user?.name}
                                </div>
                                <p
                                  style={{
                                    marginLeft: "30px",
                                    marginTop: "10px",
                                  }}
                                >
                                  {i?.comment}
                                </p>
                                {showMoreMenu?.state &&
                                  showMoreMenu?.id == i?.id && (
                                    <div
                                      className="comment-options"
                                      style={{
                                        position: "absolute",
                                        right: 0,
                                        top: "60%",
                                      }}
                                    >
                                      <ul>
                                        {details?.id == i?.user?.id && (
                                          <li
                                            style={{ color: "red" }}
                                            onClick={() =>
                                              deleteCommentForLecture({
                                                commentId: i?.id,
                                                lectureId: Id,
                                              })
                                            }
                                          >
                                            <DeleteIcon />
                                            <span>Delete</span>
                                          </li>
                                        )}
                                        {details?.id == i?.user?.id && (
                                          <li>
                                            <EditIcon />
                                            <span>Edit</span>
                                          </li>
                                        )}
                                        <li>
                                          <ReplyIcon /> <span>Reply</span>
                                        </li>
                                      </ul>
                                    </div>
                                  )}
                                <MoreVertIcon
                                  size="small"
                                  sx={{
                                    position: "absolute",
                                    cursor: "pointer",
                                    right: 0,
                                    top: "16px",
                                  }}
                                  onClick={() =>
                                    setShowMoreMenu({
                                      id: i?.id,
                                      state: !showMoreMenu?.state,
                                    })
                                  }
                                />
                              </div>
                            );
                          })}
                      </div>
                    </Stack>
                  );
                })}
              </div>
              <p
                style={{
                  border: "1px solid #e7e7e7",
                  marginTop: "1.5rem",
                }}
              ></p>

              <div className="inner_chat_lower">
                {replyTo?.name !== "" && (
                  <div className="to-box" style={{ top: '-23px', left: '60px' }}>
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
                <Avatar alt="Remy Sharp" src={avatarimg} />
                <div className="chat_input_box">
                  <input
                    id="input-field"
                    type="text"
                    placeholder="Comment"
                    value={msg}
                    maxlength="200"
                    onChange={(e) => {
                      handleChange2(e);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMessage(msg, "recorded");
                      }
                    }}
                  />
                  <LuSendHorizonal
                    className="send_icon"
                    onClick={() => sendMessage(msg, "recorded")}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={lectureDetails?.LiveOrRecorded == "Recorded" ? 2 : 1}>
        {lectureDetails?.material?.fileLoc || lectureDetails?.dpp?.fileLoc ? (
          <div className="live_dpp_pdf">
            {lectureDetails?.material?.fileName && (
              <div className="dpp_notes_download">
                <img src={pdfIcon} alt="pdficon" />
                {lectureDetails?.material?.fileName}
                <img src={downloadIcon} alt="downloadpdf" />
              </div>
            )}
            {lectureDetails?.dpp?.fileName && (
              <div className="dpp_notes_download">
                <img src={pdfIcon} alt="pdficon" />
                {lectureDetails?.dpp?.fileName}
                <img src={downloadIcon} alt="downloadpdf" />
              </div>
            )}
          </div>
        ) : (
          <div className="live_dpp_pdf">
            <div className="dpp_notes_download">No Resources Available</div>
          </div>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={lectureDetails?.LiveOrRecorded == "Recorded" ? 3 : 2}>
        <ReviewModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          lectureDetails={lectureDetails}
          setValue={setValue}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={lectureDetails?.LiveOrRecorded == "Recorded" ? 4 : 3}>
        <Report lectureDetails={lectureDetails} />
      </CustomTabPanel>
    </Box>
  );
}
