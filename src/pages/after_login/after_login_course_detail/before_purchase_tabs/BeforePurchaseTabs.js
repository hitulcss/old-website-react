import * as React from "react";
// import "./BeforePurchaseTabs.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../CourseDetails.css";

import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import BeforePurchaseLecture from "../before_purchase_lecture/BeforePurchaseLecture";
import BeforePurchaseNotes from "../before_purchase_notes/BeforePurchaseNotes";
import BeforePurchaseDpp from "../before_purchase_dpp/BeforePurchaseDpp";
import { Padding } from "@mui/icons-material";
import PrePurchaseCommunity from "../course_details_tabs/PrePurchaseCommunity";
import PrePurchaseDoubt from "../course_details_tabs/PrePurchaseDoubt";
import BeforePurchaseAnnoucements from "../before_purchase_announcement/BeforePurchaseAnnouncement";
import BeforePurchaseQuiz from "../before_purchase_quiz/BeforePurchaseQuiz";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  const navigate = useNavigate();
  if (!localStorage.getItem("isLoggedIn")) {
    navigate(`/login?source=${window?.location?.href}`);
  }
  return (
    <div
      style={{ padding: "20px", borderRadius: "10px" }}
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

export default function BeforePurchaseTabs({
  setShow,
  subjectId,
  setSubjectId,
  show,
  course,
  selectedValidity,
  setValue
}) {
  // const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { subCategorySlug } = useParams();

  const [lockModal, setLockModal] = React.useState(false);
  return (
    <>
      <div>
        <Box sx={{ width: "100%", paddingTop: "20px" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              bgcolor: "#fff",
              borderRadius: "0px 0px 10px 10px",
              boxShadow: "1px 2px 10px 1px rgba(0, 0, 0, 0.1)",
              marginTop: "-14px",
            }}
          >
            <h1 className="before-purchase-h1">
              <IoArrowBack
                onClick={() => {
                  setValue(1)
                  if (
                    show?.type == "community" ||
                    show?.type == "announcement" ||
                    show?.type == "doubt"
                    || show?.type == "quiz"
                  ) {
                    setShow({
                      classes: false,
                      home: true,
                      lecture: false,
                      type: show?.type,
                    });
                  } else {
                    setShow({
                      classes: true,
                      home: false,
                      lecture: false,
                      type: show?.type,
                    });
                  }
                  // setSubjectId(false)
                }}
                className="back-arrow-btn"
              />
              {show?.type == "community" ||
                show?.type == "announcement" ||
                show?.type == "doubt"
                || show?.type == "quiz"
                ? "Go Back"
                : "All Lectures"}{" "}
            </h1>
            {/* <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Lecture Videos" {...a11yProps(0)} />
              <Tab label="Notes" {...a11yProps(1)} />
              <Tab label="DPP" {...a11yProps(2)} />
            </Tabs> */}
          </Box>
        </Box>
      </div>

      <div>
        {/* <CustomTabPanel value={value} index={0} style={{ width: "100%" }}> */}
        {show?.type == "lecture" && (
          <BeforePurchaseLecture
            selectedValidity={selectedValidity}
            course={course}
            setShow={setShow}
            subjectId={subjectId}
            setSubjectId={setSubjectId}
            lockModal={lockModal}
            setLockModal={setLockModal}
          />
        )}
        {/* </CustomTabPanel> */}
        {/* <CustomTabPanel value={value} index={1}> */}
        {show?.type == "note" && (
          <BeforePurchaseNotes
            subjectId={subjectId}
            lockModal={lockModal}
            setLockModal={setLockModal}
            selectedValidity={selectedValidity}
            course={course}
          />
        )}
        {/* </CustomTabPanel> */}
        {/* <CustomTabPanel value={value} index={2}> */}
        {show?.type == "dpp" && (
          <BeforePurchaseDpp
            subjectId={subjectId}
            lockModal={lockModal}
            setLockModal={setLockModal}
            selectedValidity={selectedValidity}
            course={course}
          />
        )}

        {show?.type == "community" && <PrePurchaseCommunity
          course={course}
          subjectId={subjectId}
          lockModal={lockModal}
          setLockModal={setLockModal}
          selectedValidity={selectedValidity}
        />}
        {show?.type == "doubt" && <PrePurchaseDoubt
          subjectId={subjectId}
          lockModal={lockModal}
          setLockModal={setLockModal}
          selectedValidity={selectedValidity}
          course={course} />}
        {show?.type == "announcement" && (
          <BeforePurchaseAnnoucements batchSlug={subCategorySlug} />
        )}
        {show?.type == 'quiz' && <BeforePurchaseQuiz batchSlug={subCategorySlug} course={course}
          setLockModal={setLockModal}
          lockModal={lockModal}

          selectedValidity={selectedValidity}
        />}
        {/* </CustomTabPanel> */}
      </div>
    </>
  );
}
