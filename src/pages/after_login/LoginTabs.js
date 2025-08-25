import * as React from "react";
import "./AfterLogin.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PaidCourses from "./After_login_courses/PaidCourses";
import FreeCourses from "./After_login_courses/FreeCourses";
import "../../pages/after_login/my_courses/MyCourses.css";
import { pushToDataLayer } from "../../gtm/gtm";
import { useNavigate } from "react-router-dom";

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

export default function AfterLoginTabs({ from }) {
  const [value, setValue] = React.useState(0);

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    if (value) {
      pushToDataLayer({
        ecommerce: null, // Clear the previous ecommerce object.
      });
      pushToDataLayer({
        event: "select_batch_type",
        active_batch_type: value == 0 ? "Paid Courses" : "Free Courses",
      });
    }
  }, [value]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <div className="after-login-mycourse-tab">
          <div>
            <h1>My Courses</h1>{" "}
          </div>

          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab
              label="Paid Courses"
              {...a11yProps(0)}
              className="after-login-mycourses-tab"
            />
            <Tab
              label="Free Courses"
              {...a11yProps(1)}
              className="after-login-mycourses-tab"
            />
          </Tabs>
        </div>
      </Box>{" "}
      <CustomTabPanel value={value} index={0}>
        <PaidCourses from={from} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <FreeCourses from={from} />
      </CustomTabPanel>
    </Box>
  );
}
