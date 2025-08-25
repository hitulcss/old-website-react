import React from "react";
import login_bg from "../../../assets/login/login_bg.png";
import referral_img from "../../../assets/login/referral_img.png";
import "./Referral.css";
import { Button, Typography } from "@mui/material";

import OutlinedInput from "@mui/material/OutlinedInput";

const Referral = () => {
  return (
    <div className="referral_container">
      <div className="referral_left">
        <img
          src={login_bg}
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
          loading="lazy"
          alt="refer"
        />
      </div>
      <div className="referral_right">
        <div className="referral_right_img">
          <img
            src={referral_img}
            alt="referral"
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
            loading="lazy"
          />
        </div>
        <Typography
          className="referral_right_title"
          mb={4}
          sx={{ fontWeight: "600", fontSize: "28px" }}
        >
          Enter referral Code
        </Typography>
        <div className="referral_right_input_container">
          <OutlinedInput
            className="referral_input"
            placeholder="Enter Referral Code"
          />
        </div>

        <div className="referral_right_button_cont">
          <Button
            className="referral_right_button"
            sx={{
              bordeRadius: "30px",
              background: "var(--Primary--Color, rgba(150, 3, 242, 0.75))",
            }}
          >
            Verify
          </Button>
        </div>
        <div className="referral_right_register">
          <p>
            {" "}
            <span>Skip</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Referral;
