import React, { useContext, useEffect, useState } from "react";
import "./Leaderboard.css";
import leaderboardImg from "../../../../../../assets/leaderboard.png";
import { CoursesData } from "../../../../../../context/courses/Courses";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Leaderboard = ({ quizResult }) => {


  //fetching  quizId
  const { quizId } = useParams()

  //api
  const { getleaderBoard, quizLeaderboard } = useContext(CoursesData)


  //api-call
  useEffect(() => {
    if (quizId) {
      getleaderBoard(quizId)
    }
  }, [quizId])




  const result = [
    {
      rank: "1st",
      name: "vishal",
      score: 35,
    },
    {
      rank: "1st",
      name: "vishal",
      score: 35,
    },
    {
      rank: "1st",
      name: "vishal",
      score: 35,
    },
    {
      rank: "1st",
      name: "vishal",
      score: 35,
    },
    {
      rank: "1st",
      name: "vishal",
      score: 35,
    },
    {
      rank: "1st",
      name: "vishal",
      score: 35,
    },
    {
      rank: "1st",
      name: "vishal",
      score: 35,
    },
    {
      rank: "1st",
      name: "vishal",
      score: 35,
    },
    {
      rank: "1st",
      name: "vishal",
      score: 35,
    },
  ];

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (quizLeaderboard) {
      setLoading(false)
    }
  }, [quizLeaderboard])


  return (
    <>
      <div className="leader_board_wrapper">
        <div className="leader_board_container">
          <div className="board_upper">
            <img src={leaderboardImg} alt="" />
            <h1>GS Current Affair Quiz</h1>
          </div>
          <div className="board_lower">
            <div className="board_lower_result">
              {loading ? <div style={{ display: 'flex', width: '100%', height: '70vh', alignItems: 'center', justifyContent: 'center' }}><CircularProgress /></div> : <table>
                <tr className="header-row">
                  {" "}
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
                {quizLeaderboard?.leaderBoard?.map((item, index) => (
                  <tr key={index} className="result_data">
                    <td># {index + 1}</td>
                    <td>{item.studentName}</td>
                    <td>{item.myScore} / {parseInt(item?.totalMarks).toFixed(0)}</td>
                  </tr>
                ))}
                <p style={{ border: "1px solid #efefef" }}></p>
              </table>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
