import React, { useContext, useEffect, useState } from "react";
import "../../pages/auth/stream/Stream.css";
// import Wrapper from "../../components/Wrapper/Wrapper";
// import { CoursesData } from "../../../context/courses/Courses";
import { NavLink, useSearchParams } from "react-router-dom";
import { CoursesData } from "../../context/courses/Courses";
import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const style = {
  position: "fixed",
  display: "flex",
  overflowX: "scroll",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "white",
  // border: '3px solid lightgray',
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

const StreamUpdate = ({ updateStream, setUpdateStream }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const refer = searchParams.get("refer");

  const { updateUserStream, updateUserlanguage, getAllCategory, category } =
    useContext(CoursesData);
  const handleOpen = () => setUpdateStream(true);
  const handleClose = () => setUpdateStream(false);
  const [language, setLanguage] = useState("");
  const [streamList, setStreamList] = useState([]);

  useEffect(() => {
    getAllCategory();
  }, []);
  const handleStreammList = (data) => {
    setStreamList(data?.name);
    // if (streamList?.includes(data?.title)) {
    //   let newArr = streamList?.filter((item) => item !== data?.title);
    //   setStreamList(newArr);
    // } else {
    //   setStreamList(data?.title);
    // }
  };

  const handleSave = () => {
    updateUserStream(streamList, refer);
    // updateUserlanguage(language, refer);
    setTimeout(() => {
      handleClose();
    }, 1500);
  };
  return (
    <>
      <Modal
        open={updateStream}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <span className="cancel-modal" onClick={handleClose}>
            Later
            <CloseIcon />
          </span>
          <div className="stream_wrapper">
            {/* <div className="lang_wrapper">
                            <h2>Update Your medium</h2>
                            <div className="lang_container">
                                <div className="english" style={{ border: language == 'en' ? '2px solid black' : '' }} onClick={() => setLanguage("en")}>
                                    <p className="lang">A</p>
                                    <p>English</p>
                                </div>
                                <div className="hindi" style={{ border: language == 'hi' ? '2px solid black' : '' }} onClick={() => setLanguage("hi")}>
                                    <p className="lang">अ</p>
                                    <p>Hindi</p>
                                </div>
                            </div>
                        </div> */}

            <div className="select_stream">
              <h2>Select Your Exams Category</h2>
              <div className="stream_container">
                {category?.data?.map((item, index) => (
                  <div
                    className="stream_box"
                    key={index}
                    style={{
                      border: item?.name == streamList ? "2px solid black" : "",
                    }}
                    onClick={() => {
                      handleStreammList(item);
                    }}
                  >
                    <img src={item?.banner} alt="img" loading="lazy" />
                    <p>{item?.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <NavLink to="/">
              <div className="stream_btn">
                <button onClick={() => handleSave()}>Update & Continue</button>
              </div>
            </NavLink>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default StreamUpdate;
