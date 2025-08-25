import React, { useState, useEffect, useContext } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

import { CoursesData } from "../../../context/courses/Courses";

const STORAGE_KEY = "modalsShown";
const STORAGE_KEY_CATEGORY = "modalsShownCategory";

export default function UseModal({ from }) {
  const [open, setOpen] = useState(false);
  const [currentCtaIndex, setCurrentCtaIndex] = useState(0);
  const { ctaBanner } = useContext(CoursesData);

  useEffect(() => {
    const modalsShown = localStorage.getItem(
      from == "home" ? STORAGE_KEY : STORAGE_KEY_CATEGORY
    );
    const timer = setTimeout(() => {
      if (!modalsShown) {
        setOpen(true);
        localStorage.setItem(
          from == "home" ? STORAGE_KEY : STORAGE_KEY_CATEGORY,
          "true"
        );
      }
    }, 5000); // Delay of 3 seconds

    // Clear STORAGE_KEY from localStorage when the component unmounts or the browser is closed
    window.addEventListener("beforeunload", clearLocalStorage);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeunload", clearLocalStorage);
    };
  }, []);

  const clearLocalStorage = () => {
    localStorage.removeItem(
      from == "home" ? STORAGE_KEY : STORAGE_KEY_CATEGORY
    );
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      // if (currentCtaIndex < ctas.length - 1) {
      if (currentCtaIndex < ctaBanner.length - 1) {
        setCurrentCtaIndex(currentCtaIndex + 1);
        setOpen(true);
      }
    }, 5000); // Delay of 5 seconds after closing the modal
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
                Open modal
            </Button> */}
      {ctaBanner?.length > 0 ? (
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          // onClose={() => setOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: "100%",
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
              padding: "0px",
            }}
          >
            <ModalClose
              variant="plain"
              sx={{ m: 0 }}
              onClick={() => handleClose()}
            />
            <Typography id="modal-desc" textColor="text.tertiary">
              <div
                id="transition-modal-description"
                className="modal-description"
              >
                <a
                  href={ctaBanner[currentCtaIndex]?.url}
                  rel="noopener noreferrer"
                >
                  <img
                    src={ctaBanner[currentCtaIndex]?.image}
                    style={{ width: "100%", display: "block" }}
                    alt={`CTA ${currentCtaIndex + 1}`}
                    loading="lazy"
                  />
                </a>
              </div>
            </Typography>
          </Sheet>
        </Modal>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
