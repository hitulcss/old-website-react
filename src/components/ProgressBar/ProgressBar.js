import React from "react";
import "./ProgressBar.css";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const ProgressBar = () => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 5,
    width: "15rem",
    borderRadius: 5,

    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor:
        theme.palette.mode === "light"
          ? "var(--primaryColor)"
          : "var(--primaryColor)",
    },
  }));

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <BorderLinearProgress
          variant="determinate"
          value={60}
          className="progress"
        />
      </Box>
    </>
  );
};

export default ProgressBar;
