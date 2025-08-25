import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Info from "./Info";
import Validity from "./Validity";
import StudyMaterials from "./StudyMaterials";
import DemoVideos from "./DemoVideos";
import Educators from "./Educators";
import PrePurchaseCommunity from "./PrePurchaseCommunity";
import { FaCommentsDollar } from "react-icons/fa";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

export default function CourseDetailsTabs({
  size,
  setSize,
  course,
  setShowDemoVideo,
  showDemoVideo,
  demoVideo,
  setDemoVideo,
  selectedValidity,
  setSelectedValidity,
  show,
  setShow,
  setstaffData,
  staffData,
  showPopup,
  setShowPopup,
  value,
  setValue,
}) {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          style={{}}
        >
          <Tab label="Info" {...a11yProps(0)} />
          {/* <Tab label="Validity" {...a11yProps(1)} /> */}
          <Tab label="Resources" {...a11yProps(1)} />
          <Tab label="Demo Videos" {...a11yProps(2)} />
          <Tab label="Top Educators" {...a11yProps(3)} />
          {/* <Tab label="Community" {...a11yProps(4)} /> */}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Info course={course} />
        {/* <Validity
          course={course}
          setSelectedValidity={setSelectedValidity}
          selectedValidity={selectedValidity}
        /> */}
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={1}>
        <Validity
          course={course}
          setSelectedValidity={setSelectedValidity}
          selectedValidity={selectedValidity}
        />
      </CustomTabPanel> */}
      <CustomTabPanel value={value} index={1}>
        <StudyMaterials
          course={course}
          setShow={setShow}
          show={show}
          setValue={setValue}
          selectedValidity={selectedValidity}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <DemoVideos
          setShowDemoVideo={setShowDemoVideo}
          showDemoVideo={showDemoVideo}
          demoVideo={demoVideo}
          setDemoVideo={setDemoVideo}
          course={course}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Educators
          setSize={setSize}
          size={size}
          setstaffData={setstaffData}
          staffData={staffData}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          course={course}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        {/* <PrePurchaseCommunity course={course} /> */}
      </CustomTabPanel>
    </Box>
  );
}
