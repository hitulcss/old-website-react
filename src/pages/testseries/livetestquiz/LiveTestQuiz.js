import React, { useContext, useEffect } from "react";
import "./LiveTestQuiz.css";
import { Stack, Typography } from "@mui/material";
import { LiveTestQuizCard } from "../components/LiveTestQuizCard";
import { CoursesData } from "../../../context/courses/Courses";
import NotFound from "../../../components/NotFound/NotFound";

const LiveTestQuiz = () => {
  const { getAllQuiz, quiz } = useContext(CoursesData);

  useEffect(() => {
    getAllQuiz();
  }, []);
  // console.log(quiz)
  return (
    <div className="live_testseries_parent" data-aos="fade-right">
      <Stack direction="column" mt={5}>
        <div className="chip_title_container">
          <p
            className="live_testseries_title"
            sx={{ fontSize: "30px", fontWeight: "600" }}
          >
            All Live Tests &{" "}
            <span style={{ color: " rgba(150, 3, 242, 0.75)" }}>Free</span>{" "}
            Quizzes
          </p>

          <div className="live_test_chips">
            <span className="live_test_chips_alltest">All Tests</span>
            <span className="live_test_chips_alltest">Live Tests</span>
            <span className="live_test_chips_alltest">Quizzes</span>
          </div>
        </div>
        <div className="live_testseries_card_container">
          {quiz?.data?.length > 0 ? (
            quiz?.data?.map((item, index) => {
              return <LiveTestQuizCard key={index} quiz={item} />;
            })
          ) : (
            <NotFound title="Live Test & Quizzes" />
          )}
        </div>
      </Stack>
    </div>
  );
};

export default LiveTestQuiz;
