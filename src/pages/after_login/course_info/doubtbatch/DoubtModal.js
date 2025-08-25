import * as React from "react";
import Modal from "@mui/material/Modal";
import { RiQuestionnaireFill } from "react-icons/ri";
import "./Doubt";
import uploadPic from "../../../../assets/uploadpic.png";
import { IoClose } from "react-icons/io5";
import { CoursesData } from "../../../../context/courses/Courses";
import toast from "react-hot-toast";

export default function DoubtModal({
  batchId,
  batchSlug,
  open,
  setOpen,
  isEdit,
  setIsEdit,
  show
}) {


  //context
  const {
    createDoubtBatch,
    getSubjectOfBatch,
    subjectOfBatch,
    lecturesOfBatch,
    getLecturesOfSubject,
    editBatchDoubt,
  } = React.useContext(CoursesData);

  //form input
  const [details, setDetails] = React.useState({
    // batchId: batchId,
    subjectId: "",
    desc: "",
    lectureId: "",
  });

  //fetching subject
  React.useEffect(() => {
    if (batchSlug) {
      getSubjectOfBatch(batchSlug);
    }
  }, [batchSlug]);

  //fetching subject after subject selection
  React.useEffect(() => {
    if (details?.subjectId !== "") {
      getLecturesOfSubject(batchSlug, details?.subjectId);
    }
  }, [details?.subjectId]);

  React.useEffect(() => {
    if (isEdit?.show) {
      setDetails({ desc: isEdit?.data?.desc });
      // setFile(isEdit?.data?.problemImage ? isEdit?.data?.problemImage : null)
      setImage(isEdit?.data?.problemImage ? isEdit?.data?.problemImage : null)
      setProblemImage(isEdit?.data?.problemImage ? isEdit?.data?.problemImage : -1)

    }
    else {
      setFile(null)
      setImage(null)
    }
    if (lecturesOfBatch) {
      // console.log(lecturesOfBatch);
    }
  }, [lecturesOfBatch, isEdit, open]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setDetails({ desc: "" });
    if (isEdit?.show) {
      setIsEdit({ show: false, data: {} });
    }
    setOpen(false);
  };

  const [image, setImage] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [problemImage, setProblemImage] = React.useState(-1);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFile(file);
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setImage(null);
    setFile(null);
    setProblemImage('')
  };

  //handling inputs
  const onChange = (e) => {
    const { value, name } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };



  const onSubmit = () => {
    if (!isEdit?.show) {
      if (details?.desc !== "" && details?.lectureId !== '' && details?.subjectId !== '') {
        createDoubtBatch({ ...details, batchId }, file);
        // handleClose()
        setTimeout(() => {
          handleClose();
        }, 500);
      } else {
        toast.dismiss();
        toast.error("Fill all details..");
      }
    } else if (isEdit?.show) {
      if (details?.desc !== "") {

        editBatchDoubt(
          { ...details, batchCommunityId: isEdit?.data?.id, batchId },
          file, problemImage
        );
        // handleClose()
        setTimeout(() => {
          handleClose();
        }, 500);
      } else {
        toast.dismiss();
        toast.error("Fill all details...");
      }
    }
    // createDoubt(image, details)
  };

  return (
    <div>
      {show && <button onClick={handleOpen} className="ask-btn">
        <RiQuestionnaireFill className="doubt-icon" />
        Ask a Doubt
      </button>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="ask-doubt-wrapper">
          <div className="upload-wrapper">
            <div className="ask-modal-header">
              <h1>
                {isEdit?.show ? "Update Post details" : " Create a Post"}{" "}
              </h1>
              <IoClose className="doubt-icon" onClick={handleClose} />
            </div>
            <p style={{ border: "1px solid #efefef" }}></p>
            <div className="upload-container">
              {!isEdit?.show && <>  <select name="subjectId" onChange={onChange}>
                <option>Select a Subject</option>
                {subjectOfBatch?.length > 0 ? (
                  subjectOfBatch?.map((item, index) => {
                    return (
                      <option key={index} value={item?.id}>
                        {item?.title}
                      </option>
                    );
                  })
                ) : (
                  <option>No Subjects</option>
                )}
              </select>
                {details?.subjectId !== "" && lecturesOfBatch && (
                  <select name="lectureId" onChange={onChange}>
                    <option>Select a Lecture</option>
                    {lecturesOfBatch?.length > 0 ? (
                      lecturesOfBatch?.map((item, index) => {
                        return (
                          <option key={index} value={item?._id}>
                            {item?.lectureTitle}
                          </option>
                        );
                      })
                    ) : (
                      <option>No Subjects</option>
                    )}
                  </select>
                )}</>}

              <input
                type="text"
                name="desc"
                value={details?.desc}
                onChange={onChange}
                placeholder="Tell us more about the issue."
              />

              <div className="upload-container">


                <label className="upload-label">Attach Photos (Optional)</label>

                <div
                  className="upload-box"
                  onClick={() => document.getElementById("file-input").click()}
                >
                  {image ? (
                    <div className="image-preview-container">
                      <img
                        src={
                          isEdit?.show
                            ? isEdit?.data?.problemImage == ""
                              ? image
                              : image
                            : image
                        }
                        alt="Uploaded"
                        className="uploaded-image"
                      />
                      <button
                        className="remove-btn"
                        onClick={handleRemoveImage}
                      >
                        &times;
                      </button>
                    </div>
                  ) : (
                    <img
                      src={
                        isEdit?.show
                          ? isEdit?.data?.problemImage == ""
                            ? uploadPic
                            : image
                          : uploadPic
                      }
                      alt="uploadpic"
                      className="upload-pic-icon"
                    />
                  )}
                </div>
                <input
                  type="file"
                  id="file-input"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </div>

              <p className="upload-rule">You can upload up to 1MB!</p>

              <p style={{ border: "1px solid #efefef" }}></p>

              <button className="doubt-submit" onClick={onSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
