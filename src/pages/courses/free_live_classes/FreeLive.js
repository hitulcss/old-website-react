import React, { useContext, useEffect } from "react";
import "./FreeLive.css";
import freeliveimg from "../../../assets/freelive.png";
import { CoursesData } from "../../../context/courses/Courses";
import NotFound from "../../../components/NotFound/NotFound";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { FaCirclePlay } from "react-icons/fa6";
import Modal from "@mui/material/Modal";
import ReactPlayer from "react-player";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  height: 380,
  // backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: 24,
};

const FreeLive = ({ Id }) => {
  const [open, setOpen] = React.useState(false);
  const [demoLink, setDemoLink] = React.useState("");
  const [lectTitle, setlectTitle] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { lectures } = useContext(CoursesData);

  useEffect(() => {
    // getLecturesByBatchId(Id);
  }, []);

  //console.log('line65', lectures)
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style} className="video_player_box">
          <Container maxWidth="md">
            <div className="video_player_header">
              <p>{lectTitle ? lectTitle : "You Are Watching"} </p>
              <span onClick={handleClose}>
                <CloseIcon />
              </span>
            </div>

            <div className="playerDiv">
              <ReactPlayer width={"100%"} height={300} url={demoLink} />
            </div>
          </Container>
        </div>
      </Modal>

      <div className="free_live_wrapper" data-aos="fade-right">
        <h1>
          {" "}
          <span className="free">FREE</span> &nbsp; Demo Classes{" "}
        </h1>
        <div className="free_live">
          {lectures?.data?.batchLectures?.length > 0 ? (
            lectures?.data?.batchLectures?.map((item, index) => (
              <div className="free_live_class_box" key={index}>
                <span className="free2">{index === 0 ? "FREE" : "PAID"}</span>
                &nbsp;
                <span className="free_live_name">{item?.subjects}</span>
                <div className="name_details">
                  <div
                    className="live_class_left_side"
                    style={{ overflow: "hidden" }}
                  >
                    <h1>
                      {/* {item?.name?.slice(0, 100)}{" "} */}

                      {item.name?.slice(0, 80)}
                      {item.name?.length > 80 ? "..." : ""}
                    </h1>

                    <p style={{ width: "100%" }}>
                      Start On: &nbsp;
                      <span className="live_date">
                        {item?.startingDate?.date}
                      </span>
                      <span className="live_time">
                        {item?.startingDate?.time}
                      </span>
                    </p>
                  </div>
                  <div className="live_class_right_side">
                    <img
                      src={
                        item?.teachers[0]?.profilePhoto
                          ? item?.teachers[0]?.profilePhoto
                          : freeliveimg
                      }
                      alt="freeliveicon"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="live_class_buttons">
                  <button
                    style={{
                      color: "var(--primaryColor)",
                      border: "1px solid var(--primaryColor)",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <FaUnlockKeyhole /> Lecture {index}
                  </button>

                  <button
                    style={{
                      color: "var(--primaryColor)",
                      border: "1px solid var(--primaryColor)",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                    onClick={() => {
                      handleOpen();
                      setlectTitle(item?.name);
                      setDemoLink(item?.link);
                    }}
                  >
                    <FaCirclePlay /> Watch Demo
                  </button>
                </div>
              </div>
            ))
          ) : (
            <NotFound title={"Demo Classes"} />
          )}
        </div>
      </div>
    </>
  );
};

export default FreeLive;
