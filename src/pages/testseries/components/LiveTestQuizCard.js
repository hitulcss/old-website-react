import React from "react";
import "./LiveTestQuizCard.css";
import { Button, Typography } from "@mui/material";

export const LiveTestQuizCard = ({ quiz }) => {
  return (
    <div className="live_test_quiz_card_container">
      <div className="list_test_quiz_wrapper">
        <div className="live_test_quiz_card_top">
          <div className="live_test_quiz_card_left">
            <div
              className="live_test_quiz_card_left_top"
              style={{ marginBottom: "5px" }}
            >
              <span className="live_test_quiz_card_left_top_live">
                LIVE TEST
              </span>
              <span className="live_test_quiz_card_left_top_test">
                UPSC CIVIL
              </span>
              <span className="live_test_quiz_card_left_top_number">
                +16 More
              </span>
            </div>
            <div className="live_test_quiz_card_left_middle">
              <Typography sx={{ fontSize: "14px" }}>{quiz?.name}</Typography>
            </div>
            <div className="live_test_quiz_card_left_bottom">
              <span className="live_test_quiz_card_left_question">
                {quiz?.noOfQuestions} Question
              </span>
              <span className="live_test_quiz_card_left_marks">60 Marks</span>
              <span className="live_test_quiz_card_left_time">
                {quiz?.duration} Mins
              </span>
            </div>
          </div>
          <div className="live_test_quiz_card_right">
            <Button
              className="live_test_quiz_card_right_button"
              sx={{
                bordeRadius: "4px",
                background: "var(--Primary--Color, rgba(150, 3, 242, 0.75))",
                color: "white",
                fontSize: "12px",
                padding: "9px 28px",
              }}
            >
              Start Now
            </Button>
          </div>
        </div>
        <div className="live_test_quiz_card_bottom">
          <span className="live_test_quiz_card_bottom_syllabus">Syllabus</span>
          <span className="live_test_quiz_card_bottom_language">
            English, Hindi + 4 More
          </span>
          <span className="live_test_quiz_card_bottom_datetime">
            24 Oct, 3:30 to 26 Oct, 15:30
          </span>
        </div>
      </div>

      <div className="list_test_quiz_wrapper">
        <div className="live_test_quiz_card_top">
          <div className="live_test_quiz_card_left">
            <div
              className="live_test_quiz_card_left_top"
              style={{ marginBottom: "5px" }}
            >
              <span className="live_test_quiz_card_left_top_live">
                LIVE TEST
              </span>
              <span className="live_test_quiz_card_left_top_test">
                UPSC CIVIL
              </span>
              <span className="live_test_quiz_card_left_top_number">
                +16 More
              </span>
            </div>
            <div className="live_test_quiz_card_left_middle">
              <Typography sx={{ fontSize: "14px" }}>{quiz?.name}</Typography>
            </div>
            <div className="live_test_quiz_card_left_bottom">
              <span className="live_test_quiz_card_left_question">
                {quiz?.noOfQuestions} Question
              </span>
              <span className="live_test_quiz_card_left_marks">60 Marks</span>
              <span className="live_test_quiz_card_left_time">
                {quiz?.duration} Mins
              </span>
            </div>
          </div>
          <div className="live_test_quiz_card_right">
            <Button
              className="live_test_quiz_card_right_button"
              sx={{
                bordeRadius: "4px",
                background: "#ffb800",
                color: "black",

                fontSize: "12px",
                padding: "9px 28px",
              }}
            >
              Register
            </Button>
          </div>
        </div>
        <div className="live_test_quiz_card_bottom">
          <span className="live_test_quiz_card_bottom_syllabus">Syllabus</span>
          <span className="live_test_quiz_card_bottom_language">
            English, Hindi + 4 More
          </span>
          <span className="live_test_quiz_card_bottom_datetime">
            24 Oct, 3:30 to 26 Oct, 15:30
          </span>
        </div>
      </div>
    </div>
  );
};
