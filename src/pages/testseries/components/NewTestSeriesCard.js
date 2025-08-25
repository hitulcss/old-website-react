import React, { useState } from "react";
import "./NewTestSeriesCard.css";
import language from "../../../assets/testseries/language.png";
import { Typography } from "@mui/material";

const NewTestSeriesCard = ({ key, size, item }) => {
  return (
    <div
      className="new_testseries_card_parent"
      style={{ translate: `${size}px 0px`, transition: "all 1s" }}
      onClick={() => window.open(`${item?.link}`, "_blank")}
    >
      <div className="new_testseries_card_img">
        <img
          src={item?.banner}
          alt="testseries"
          height={100}
          style={{ objectFit: "cover", width: "100%" }}
          loading="lazy"
        />
      </div>
      <div className="new_testseries_card_title">
        <Typography sx={{ fontWeight: "700" }}>{item?.name}</Typography>
      </div>
      <div className="new_testseries_card_tests">
        <Typography>
          {item?.noOfTest} Tests |{" "}
          <span style={{ color: "#25CD71" }}>1 Free Test </span>
        </Typography>
      </div>
      <div className="new_testseries_card_language">
        <p>
          {item.language == "enhi"
            ? "English & Hindi"
            : item?.language == "en"
            ? "English"
            : "Hindi"}
        </p>
        <Typography sx={{ color: "#333" }}>
          {" "}
          <img
            src={language}
            alt="language"
            style={{ marginRight: "20px" }}
            loading="lazy"
          />{" "}
        </Typography>
      </div>
    </div>
  );
};

export default NewTestSeriesCard;
