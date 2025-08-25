import * as React from "react";
import PropTypes from "prop-types";
import "./OurResult.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MainResultPage from "./MainResultPage";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CoursesData } from "../../../context/courses/Courses";

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

export default function ResultTabs() {
  const [year, setYear] = React.useState(0);
  const [newCategory, setNewCategory] = React.useState();

  const {
    getAllCategory,
    category,

    selectedCategory,
    setSelectedCategory,

    selectedCategoryId,
  } = React.useContext(CoursesData);

  const handleChange2 = (value) => {
    setYear(value);
    console.log(value);
  };

  const handleChange1 = (value) => {
    setNewCategory(value);
    console.log(value);
  };

  console.log("category", category?.data?.name);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <div className="result-tab-main">
          <div className="result-tab-upper">
            <h1>Our Results</h1>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={year}
                  label="Results"
                  onChange={handleChange2}
                >
                  <MenuItem value={2023}>2023</MenuItem>
                  <MenuItem value={2024}>2024</MenuItem>
                  <MenuItem value={2025}>2025</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>{" "}
          <div className="result-tab-lower">
            {" "}
            <Tabs
              onChange={handleChange1}
              aria-label="basic tabs example"
              textColor="secondary"
              indicatorColor="secondary"
              centered
              style={{ position: "sticky", borderBottom: "none" }}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              className="result-tab-container"
            >
              {category?.data?.map((item, index) => (
                <Tab
                  key={index}
                  label={item?.title}
                  {...a11yProps(0)}
                  value={item?.id}
                  // onClick={() => setNewCategory(item?.id)}
                />
              ))}
              {/* 
              <Tab label="UP Police" {...a11yProps(1)} />
              <Tab label="JNV School" {...a11yProps(2)} />
              <Tab label="Delhi Police" {...a11yProps(3)} />
              <Tab label="UPTET" {...a11yProps(4)} />
              <Tab label="Haryana Bharti" {...a11yProps(5)} /> */}
            </Tabs>
          </div>{" "}
        </div>
      </Box>
      <div index={0}>
        <MainResultPage newCategory={newCategory} year={year} />
      </div>
    </Box>
  );
}
