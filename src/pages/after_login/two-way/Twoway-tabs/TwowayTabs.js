import * as React from "react";
import "./TwowayTabs.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TbFileDescription } from "react-icons/tb";
import { MdOutlineSnippetFolder } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import Info from "./info/Info";
import Resourses from "./resourses/Resourses";
import Report from "./report/Report";
import ReviewModal from "../../../../components/Review_Modal/ReviewModal";

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

export default function TwowayTabs({ data }) {
  const [value, setValue] = React.useState(0);
  const [modalOpen, setModalOpen] = React.useState(false);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="secondary"
          indicatorColor="secondary"
          className="tabs_main"
        >
          <Tab
            icon={<TbFileDescription className="tab_icon" />}
            label="Info"
            {...a11yProps(0)}
          />
          <Tab
            icon={<MdOutlineSnippetFolder className="tab_icon" />}
            label="Resources"
            {...a11yProps(1)}
          />
          <Tab
            icon={<FaRegStar className="tab_icon" />}
            label="Rating"
            {...a11yProps(2)}
            onClick={() => setModalOpen(true)}
          />
          <Tab
            icon={<IoWarningOutline className="tab_icon" />}
            label="Report"
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Info data={data} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Resourses data={data} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {/* <Rating data={data} */}
        <ReviewModal modalOpen={modalOpen} setModalOpen={setModalOpen} lectureDetails={data} setValue={setValue} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Report lectureDetails={data} />
      </CustomTabPanel>
    </Box>
  );
}
