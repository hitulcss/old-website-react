import React, { useEffect, useState, Suspense, useContext } from "react";
import "./TestSeriesCategory.css";
import { Stack, Typography, Skeleton } from "@mui/material";
import "../../home/popularExams/PopularExam.css";
import exams from "../../../assets/exams.png";
import NotFound from "../../../components/NotFound/NotFound";
import { Button } from "@mui/material";
import { CoursesData } from "../../../context/courses/Courses";

const TestSeriesCategoryCard = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./TestSeriesCategoryCard")), 1000);
  });
});

const TestSeriesCategory = ({ getAllTestSeries, testSeries }) => {
  // const { getAllCategory, category, } = useContext(CoursesData)

  const [category, setCategory] = useState("All Exams");

  const popular_exams = [
    {
      exam_name: "Delhi Police Constable2023 Mock Test",
      tests: "216 Total Tests",
      chapter_test: "107 Chapter Test",
      sectional_test: "40 Sectional Test",
      full_test: "45 Full Test",
      more_test: "+24 more tests",
      img: exams,
      language: "Hindi / English",
    },
  ];

  useEffect(() => {
    getAllTestSeries(category);
  }, [category]);

  // console.log(testSeries)
  return (
    <div className="testseries_category_parent">
      <Stack direction="column" mt={5}>
        <p
          className="testseries_category_title"
          sx={{ fontSize: "30px", fontWeight: "600" }}
        >
          Test Series by{" "}
          <span style={{ color: " rgba(150, 3, 242, 0.75)" }}>Categories</span>
        </p>
        <Stack
          direction="row"
          spacing={5}
          mt={5}
          sx={{ width: "100%", height: "100%" }}
        >
          <div className="sidebar_testseries_category">
            <ul>
              <li
                style={{
                  background:
                    category == "All Exams" ? "rgba(150, 3, 242, 0.75)" : "",
                  boxShadow:
                    category == "All Exams"
                      ? "0px 12px 24px 0px rgba(4, 31, 113, 0.10)"
                      : "",
                  color: category == "All Exams" ? "white" : "",
                }}
                onClick={() => setCategory("All Exams")}
              >
                {" "}
                All Exams{" "}
              </li>
              <li
                style={{
                  background:
                    category == "SSC Exams" ? "rgba(150, 3, 242, 0.75)" : "",
                  boxShadow:
                    category == "SSC Exams"
                      ? "0px 12px 24px 0px rgba(4, 31, 113, 0.10)"
                      : "",
                  color: category == "SSC Exams" ? "white" : "",
                }}
                onClick={() => setCategory("SSC Exams")}
              >
                {" "}
                SSC Exams{" "}
              </li>
              <li
                style={{
                  background:
                    category == "Banking Exams"
                      ? "rgba(150, 3, 242, 0.75)"
                      : "",
                  boxShadow:
                    category == "Banking Exams"
                      ? "0px 12px 24px 0px rgba(4, 31, 113, 0.10)"
                      : "",
                  color: category == "Banking Exams" ? "white" : "",
                }}
                onClick={() => setCategory("Banking Exams")}
              >
                {" "}
                Banking Exams{" "}
              </li>
              <li
                style={{
                  background:
                    category == "Civil Services Exams"
                      ? "rgba(150, 3, 242, 0.75)"
                      : "",
                  boxShadow:
                    category == "Civil Services Exams"
                      ? "0px 12px 24px 0px rgba(4, 31, 113, 0.10)"
                      : "",
                  color: category == "Civil Services Exams" ? "white" : "",
                }}
                onClick={() => setCategory("Civil Services Exams")}
              >
                {" "}
                Civil Services Exams{" "}
              </li>
              <li
                style={{
                  background:
                    category == "Railway Exams"
                      ? "rgba(150, 3, 242, 0.75)"
                      : "",
                  boxShadow:
                    category == "Railway Exams"
                      ? "0px 12px 24px 0px rgba(4, 31, 113, 0.10)"
                      : "",
                  color: category == "Railway Exams" ? "white" : "",
                }}
                onClick={() => setCategory("Railway Exams")}
              >
                {" "}
                Railway Exams{" "}
              </li>
              <li
                style={{
                  background:
                    category == "Defence Exams"
                      ? "rgba(150, 3, 242, 0.75)"
                      : "",
                  boxShadow:
                    category == "Defence Exams"
                      ? "0px 12px 24px 0px rgba(4, 31, 113, 0.10)"
                      : "",
                  color: category == "Defence Exams" ? "white" : "",
                }}
                onClick={() => setCategory("Defence Exams")}
              >
                {" "}
                Defence Exams{" "}
              </li>
              <li
                style={{
                  background:
                    category == "State Govt Exams"
                      ? "rgba(150, 3, 242, 0.75)"
                      : "",
                  boxShadow:
                    category == "State Govt Exams"
                      ? "0px 12px 24px 0px rgba(4, 31, 113, 0.10)"
                      : "",
                  color: category == "State Govt Exams" ? "white" : "",
                }}
                onClick={() => setCategory("State Govt Exams")}
              >
                {" "}
                State Govt Exams{" "}
              </li>
              <li
                style={{
                  background:
                    category == "Police Exams" ? "rgba(150, 3, 242, 0.75)" : "",
                  boxShadow:
                    category == "Police Exams"
                      ? "0px 12px 24px 0px rgba(4, 31, 113, 0.10)"
                      : "",
                  color: category == "Police Exams" ? "white" : "",
                }}
                onClick={() => setCategory("Police Exams")}
              >
                {" "}
                Police Exams{" "}
              </li>
              <li
                style={{
                  background:
                    category == "Insurance Exams"
                      ? "rgba(150, 3, 242, 0.75)"
                      : "",
                  boxShadow:
                    category == "Insurance Exams"
                      ? "0px 12px 24px 0px rgba(4, 31, 113, 0.20)"
                      : "",
                  color: category == "Insurance Exams" ? "white" : "",
                }}
                onClick={() => setCategory("Insurance Exams")}
              >
                {" "}
                Insurance Exams{" "}
              </li>
              <li
                style={{
                  background:
                    category == "Nursing Exams"
                      ? "rgba(150, 3, 242, 0.75)"
                      : "",
                  boxShadow:
                    category == "Nursing Exams"
                      ? "0px 12px 24px 0px rgba(4, 31, 113, 0.20)"
                      : "",
                  color: category == "Nursing Exams" ? "white" : "",
                }}
                onClick={() => setCategory("Nursing Exams")}
              >
                {" "}
                Nursing Exams{" "}
              </li>
              <li
                style={{
                  background:
                    category == "Othe Govt Exams"
                      ? "rgba(150, 3, 242, 0.75)"
                      : "",
                  boxShadow:
                    category == "Othe Govt Exams"
                      ? "0px 12px 24px 0px rgba(4, 31, 113, 0.20)"
                      : "",
                  color: category == "Othe Govt Exams" ? "white" : "",
                }}
                onClick={() => setCategory("Other Govt. Exams")}
              >
                {" "}
                Other Govt. Exams{" "}
              </li>
            </ul>
          </div>
          <div
            className="testseries_category_card_container"
            data-aos="fade-right"
          >
            {testSeries?.data?.length > 0 ? (
              testSeries?.data?.map((item, index) => (
                <Suspense
                  key={index}
                  fallback={
                    <Stack spacing={1}>
                      <Skeleton variant="rounded" width={270} height={170} />
                      <Skeleton
                        variant="text"
                        width={50}
                        sx={{ fontSize: "1rem" }}
                      />
                      <Skeleton
                        variant="text"
                        width={250}
                        sx={{ fontSize: "1rem" }}
                      />
                      <Skeleton
                        variant="text"
                        width={50}
                        sx={{ fontSize: "1rem" }}
                      />
                      <Skeleton
                        variant="text"
                        width={30}
                        sx={{ fontSize: "1rem", marginTop: "20px" }}
                      />
                      <Skeleton variant="rounded" width={270} height={60} />
                    </Stack>
                  }
                >
                  <TestSeriesCategoryCard
                    item={item}
                    testSeries={testSeries}
                    key={index}
                  />
                </Suspense>
              ))
            ) : (
              <NotFound title="Test Series" />
            )}
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default TestSeriesCategory;
