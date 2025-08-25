import * as React from "react";
import "./SubjectTabs.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Notes from "../notes/Notes";
import DPP from "../dpp/DPP";
import LectureVideos from "../lectures/Lectures";
import { useNavigate } from "react-router-dom";
import { pushToDataLayer } from "../../../../../../gtm/gtm";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  const navigate = useNavigate();
  if (!localStorage.getItem("isLoggedIn")) {
    navigate(`/login?source=${window?.location?.href}`);
  }
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

export default function SubjectTabs({ subjectData, from }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    pushToDataLayer({
      ecommerce: null,  // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "select_lecture_tab",
      active_lecture_tab: value == 0 ? 'Lecture Videos' : value == 1 ? 'Notes' : 'DPP',
      isLoggedIn: localStorage?.getItem('isLoggedIn'),



    });
  }, [value])

  return (
    <>
      <div>
        <Box sx={{ width: "100%" }}>
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
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
            >
              {subjectData?.data?.batchFeatures && subjectData?.data?.batchFeatures?.filter(i => ['lecture', 'dpp', 'note']?.includes((i?.feature)))?.map((item, index) => {

                return <Tab label={item?.feature} sx={{ textTransform: 'capitalize' }} {...a11yProps(index)} onClick={() => { setValue(index) }} />
              })}

            </Tabs>
          </Box>
        </Box>
      </div>

      <div>

        {subjectData?.data?.batchFeatures && subjectData?.data?.batchFeatures?.filter(i => ['lecture', 'dpp', 'note']?.includes((i?.feature)))?.map((item, index) => {

          return (<CustomTabPanel value={value} index={index} style={{ width: "100%" }}>

            {item?.feature == 'lecture' && <LectureVideos from={from} subjectData={subjectData} />}
            {item?.feature == 'note' && <Notes subjectData={subjectData} />}
            {item?.feature == 'dpp' && <DPP subjectData={subjectData} />}
          </CustomTabPanel>)
        })}

      </div>
    </>
  );
}
