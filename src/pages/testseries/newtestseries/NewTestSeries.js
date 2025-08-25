import React, { useContext, useEffect, useState } from "react";
import "./NewTestSeries.css";
import { Stack, Typography } from "@mui/material";
import NewTestSeriesCard from "../components/NewTestSeriesCard";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { CoursesData } from "../../../context/courses/Courses";

const NewTestSeries = () => {
  const [size, setSize] = useState(0);
  const [count, setCount] = useState(3);
  let test_series = [1, 2, 3, 4, 5];
  // let count = 3
  const handleClick = (to) => {
    if (to == "forward" && count <= latestTestSeries?.data?.length) {
      setSize(size - 350);
      setCount(count + 1);
    } else if (to == "backward" && count > 3) {
      setSize(size + 350);
      setCount(count - 1);
    }
  };

  const { getLatestTestSeries, latestTestSeries } = useContext(CoursesData);

  useEffect(() => {
    getLatestTestSeries();
  }, []);
  // console.log(latestTestSeries)
  return (
    <div className="new_testseries_parent" data-aos="fade-right">
      <Stack direction="column" mt={5}>
        <div className="newtest_title_arrow">
          <p
            className="new_testseries_title"
            sx={{ fontSize: "30px", fontWeight: "600" }}
          >
            New Test Series{" "}
            <span style={{ color: " rgba(150, 3, 242, 0.75)" }}>for you</span>
          </p>
          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            <KeyboardArrowLeftIcon
              fontSize="large"
              sx={{ border: "1px solid black", borderRadius: "50%" }}
              className="left_icon"
              onClick={() => handleClick("backward")}
            />
            <KeyboardArrowRightIcon
              fontSize="large"
              sx={{
                border: "1px solid black",
                borderRadius: "50%",
                zIndex: 100,
              }}
              className="right_icon"
              onClick={() => handleClick("forward")}
            />
          </div>
        </div>
        <div
          className="new_testseries_card_container"
          style={{ display: "flex", alignItems: "center" }}
        >
          {latestTestSeries?.data?.map((item, index) => (
            <NewTestSeriesCard key={index} size={size} item={item} />
          ))}
        </div>
      </Stack>
    </div>
  );
};

export default NewTestSeries;
