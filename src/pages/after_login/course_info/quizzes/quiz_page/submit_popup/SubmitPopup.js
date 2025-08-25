import * as React from "react";
import PropTypes from "prop-types";
import "./SubmitPopup.css";
import Dialog from "@mui/material/Dialog";
import { NavLink, useNavigate } from "react-router-dom";

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const {
    onClose,
    selectedValue,
    open,
    ans_res,
    quizId,
    timeLeft,
    attemptQuiz, batchSlug
  } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  //selected answers
  const [selectedCount, setSelectedCount] = React.useState(0);
  React.useEffect(() => {
    let count = 0
    if (ans_res) {

      for (let j = 0; j < ans_res?.length; j++) {
        for (const [key, val] of Object.entries(ans_res[j])) {
          if (val == "") {
          } else {
            ++count
          }
        }
      }
      setSelectedCount(count);

    }
  }, [ans_res]);


  const navigate = useNavigate();

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="submit_box">
        <h2 className="submit_title">Are you sure to submit the Quiz?</h2>
        <p style={{ border: "1px solid #efefef" }}></p>
        <div className="submit_box_mid">
          <div>
            <p className="number_circle total">{ans_res?.length}</p>
            <p className="total_text">Total</p>
          </div>
          <div>
            {" "}
            <p className="number_circle attempt">{selectedCount}</p>
            <p className="attempt_text">Attempted</p>
          </div>
          <div>
            {" "}
            <p className="number_circle skip">
              {ans_res?.length - selectedCount}
            </p>
            <p className="skip_text">Skipped</p>
          </div>
        </div>

        <p style={{ border: "1px solid #efefef" }}></p>

        <div className="submit_box_lower">
          <p onClick={handleClose}>No</p>
          <div
            // to='/quiz-result'

            //   state={{
            //     attempted: selectedCount,
            //     total: ans_res
            //   }}
            onClick={() => {
              navigate(`/quiz-result/${quizId}/${batchSlug}`, {
                state: {
                  attempted: selectedCount,
                  total: ans_res,
                },
              });
              attemptQuiz({ quizId: quizId, timeLeft: timeLeft, ans_res: ans_res })
            }}
          >
            <p className="yes" style={{ cursor: "pointer" }} id='submit-quiz'>
              Yes
            </p>
          </div>
        </div>
      </div>
    </Dialog >
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SubmitPopup({
  ans_res,
  quizId,
  timeLeft,
  attemptQuiz, batchSlug
}) {


  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <div className="quiz_suibmit_btn" onClick={handleClickOpen}>
        <button>Submit</button>
      </div>
      <SimpleDialog
        batchSlug={batchSlug}
        ans_res={ans_res}
        selectedValue={selectedValue}
        open={open}
        quizId={quizId}
        timeLeft={timeLeft}
        attemptQuiz={attemptQuiz}
        onClose={handleClose}
      />
    </div>
  );
}
