import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Stack, Typography } from "@mui/material";
import progress from "../../assets/progress.gif";

const CurrentAffair = () => {
  return (
    <div>
      <Navbar />

      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: "100vh" }}
      >
        <Typography sx={{ fontSize: "50px", fontWeight: "700" }}>
          In Progress
        </Typography>
        <img src={progress} alt="progress" width={100} loading="lazy" />
      </Stack>

      <Footer />
    </div>
  );
};

export default CurrentAffair;
