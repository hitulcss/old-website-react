import * as React from "react";
import "./MultipleTabs.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Info from "../course_info/info/Info";
import Subjects from "../course_info/subjects/Subjects";
import Quizzes from "../course_info/quizzes/Quizzes";
import Announcements from "../course_info/announcements/Announcements";
import { useNavigate } from "react-router-dom";
import { pushToDataLayer } from "../../../gtm/gtm";
import Community from "../course_info/doubt/Community";
import Doubt from "../course_info/doubtbatch/Doubt";

function CustomTabPanel(props) {
  const navigate = useNavigate();
  if (!localStorage.getItem("isLoggedIn")) {
    navigate(`/login?source=${window?.location?.href}`);
  }
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

export default function MultipleTabs({
  data,
  test,
  from,
  slug,
  setShowShareModal,
  showShareModal,
}) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    // console.log('newValue', newValue)
    setValue(newValue);
  };

  React.useEffect(() => {
    pushToDataLayer({
      ecommerce: null, // Clear the previous ecommerce object.
    });
    pushToDataLayer({
      event: "select_purchased_batch_tab",
      active_purchased_batch_tab:
        value == 0
          ? "Info"
          : value == 1
            ? "Lectures"
            : value == 2
              ? "Tests"
              : "Announcements",
      isLoggedIn: localStorage?.getItem("isLoggedIn"),
    });
  }, [value]);
  //handling test tab
  React.useEffect(() => {
    if (test) {
      setValue(2);
    }
  }, [test]);



  // console.log('data?.batchFeatures', data?.batchFeatures)
  // console.log(data?.batchFeatures?.filter(i => ['lecture', 'quiz', 'announcement', 'community']?.includes((i?.feature))))

  return (
    <>
      <div style={{ boxShadow: " 1px 2px 10px 1px rgba(0, 0, 0, 0.1)" }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Info" {...a11yProps(0)} />
              {data?.batchFeatures && data?.batchFeatures?.filter(i => ['lecture', 'quiz', 'announcement', 'community', 'doubt']?.includes((i?.feature)))?.map((item, index) => {

                return <Tab label={item?.feature} sx={{ textTransform: 'capitalize' }} {...a11yProps(index + 1)} onClick={() => { setValue(index + 1) }} />
              })}


              {/* {data?.batchFeatures?.find(item => item?.feature == 'lecture') && < Tab label="Lectures" {...a11yProps(1)} onClick={() => { setValue(1) }} />} */}
              {/* {true && < Tab label="Lectures" {...a11yProps(1)} />} */}
              {/* {data?.batchFeatures?.find(item => item?.feature == 'quiz') && <Tab label="Tests" {...a11yProps(2)} onClick={() => { setValue(2) }} />} */}
              {/* {true && <Tab label="Tests" {...a11yProps(2)} />} */}

              {/* {data?.batchFeatures?.find(item => item?.feature == 'announcementt') && <Tab label="Announcements" {...a11yProps(3)} onClick={() => { setValue(3) }} />} */}
              {/* {true && <Tab label="Announcements" {...a11yProps(3)} />} */}
              {/* {data?.batchFeatures?.find(item => item?.feature == 'community') && <Tab label="Community" {...a11yProps(4)} onClick={() => { setValue(4) }} />} */}
              {/* {true && <Tab label="Community" {...a11yProps(4)} />} */}
            </Tabs>
          </Box>
        </Box>
      </div >

      <div style={{ position: "relative" }}>
        <CustomTabPanel value={value} index={0} style={{ width: "100%" }}>
          <Info
            data={data}
            setShowShareModal={setShowShareModal}
            showShareModal={showShareModal}
          />
        </CustomTabPanel>
        {data?.batchFeatures && data?.batchFeatures?.filter(i => ['lecture', 'quiz', 'announcement', 'community', 'doubt']?.includes((i?.feature)))?.map((item, index) => {

          return (<CustomTabPanel value={value} index={index + 1} style={{ width: "100%" }}>
            {item?.feature == 'lecture' && <Subjects
              batchId={data?.batchId}
              batchSlug={data?.slug}
              data={data}
              from={from}
            />}
            {item?.feature == 'quiz' && <Quizzes batchId={data?.batchId} />}
            {item?.feature == 'announcement' && <Announcements batchSlug={data?.slug} data={data} />}
            {item?.feature == 'community' && <Community batchId={data?.batchId} batchSlug={data?.slug} />}
            {item?.feature == 'doubt' && <Doubt batchId={data?.batchId} batchSlug={data?.slug} batchData={data} />}
          </CustomTabPanel>)
        })}

        {/* <CustomTabPanel value={value} index={0} style={{ width: "100%" }}>
          <Info
            data={data}
            setShowShareModal={setShowShareModal}
            showShareModal={showShareModal}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Subjects
            batchId={data?.batchId}
            batchSlug={data?.slug}
            data={data}
            from={from}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Quizzes batchId={data?.batchId} />
        </CustomTabPanel>


        <CustomTabPanel value={value} index={3}>
          <Announcements batchSlug={data?.slug} data={data} />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={4}>
          <Doubt batchId={data?.batchId} batchSlug={data?.slug} />
        </CustomTabPanel> */}
      </div>
    </>
  );
}
