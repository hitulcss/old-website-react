import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import cta1Image from "../../../assets/cta/uttam_batch_class_6th.png";
import cta2Image from "../../../assets/cta/ujjwal_batch_class_9th.png";
import { CoursesData } from "../../../context/courses/Courses";
import Counselling from "../../course_details/components/counselling/Counselling";
import "./CTA.css";

const ctaBanner = [
  {
    image: cta1Image,
    url: "https://www.sdcampus.com/jnv-school/jnv-class-6th-one-year-program",
  },
  {
    image: cta2Image,
    url: "https://www.sdcampus.com/jnv-school/jnv-class-9th-one-year-program",
  },
];

const STORAGE_KEY = "modalsShownForCounselling";

export default function CampaignCTA({ from, title }) {
  const [open, setOpen] = useState(false);
  const [currentCtaIndex, setCurrentCtaIndex] = useState(0);
  // const { ctaBanner  } = useContext(CoursesData);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 3000); // Delay of 3 seconds

    return () => {
      clearTimeout(timer);
      // window.removeEventListener('beforeunload', clearLocalStorage);
    };
  }, []);

  const clearLocalStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
                Open modal
            </Button> */}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="soft"
          sx={{
            maxWidth: "100%",
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
            padding: "0px",
            border: "none",
            background: "none",
            outline: "none",
          }}
        >
          <ModalClose
            variant="plain"
            className="counselling-modal-close"
            sx={{
              m: 0,
              top: from == "home-page" || from == "campaign" ? "30px" : "",
            }}
            onClick={() => handleClose()}
          />
          <Counselling from={from} setOpen={setOpen} title={title} />
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
