import React, { useContext, useEffect, useState } from "react";
import "./Doubt.css";
import DoubtModal from "./DoubtModal";
// import CommunityPostModal from "./DoubtPostModal";
import { CoursesData } from "../../../../context/courses/Courses";
import CommunityDetail from "./DoubtDetail";
import doubtImg from "../../../../assets/doubt.png";
import { Toaster } from "react-hot-toast";
import DoubtPrivacyPolicy from "./DoubtPrivacyPolicy";
import Loader from "../../../../components/Loader/Loader";
import ReportBox from "./ReportBox";
import InfiniteScroll from "react-infinite-scroller";
import { Button } from "@mui/material";
import { FaAngleDown } from "react-icons/fa";
import ImgModal from "./ImgModal";
import DoubtDetail from "./DoubtDetail";
// import DoubtModal from "./DoubtModal";
import DoubtPostModal from "./DoubtPostModal";
import Chip from "@mui/material/Chip";

const Doubt = ({
  batchId,
  batchSlug,
  prePurchase,
  batchData,
  setLockModal,
}) => {
  //modal state
  const [open, setOpen] = React.useState(false);

  //type of posts
  const [myDoubts, setMyDoubts] = useState(false);
  const handleClick = (type) => {
    setMyDoubts(type);
  };

  //pagination
  const [page, setPage] = useState(1);

  //Edit
  const [isEdit, setIsEdit] = useState({ show: false, data: {} });

  //call state
  const [helperState, setHelperState] = React.useState(false);

  //doubt modal state

  const [doubtOpen, setDoubtOpen] = React.useState(false);

  //privacyPolicy
  const [doubtPrivacyPolicy, setDoubtPrivacyPolicy] = useState(false);

  //context
  const {
    getDoubtsOfBatch,
    batchDoubtData,
    getMyBatchDoubts,
    myBatchDoubtData,
  } = useContext(CoursesData);

  //report
  const [showReport, setShowReport] = useState({ show: false, type: "" });

  //loading
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (batchDoubtData || myBatchDoubtData) {
      setLoading(false);
    }
  }, [batchDoubtData, myBatchDoubtData]);


  const [doubtData, setDoubtData] = useState()
  const [myDoubtData, setMyDoubtData] = useState()

  useEffect(() => {
    if (batchDoubtData) {
      if (page == 1) {

        setDoubtData((prev) => ([...batchDoubtData?.data?.doubts]));
      } else {
        setDoubtData((prev) => ([...prev, ...batchDoubtData?.data?.doubts]));
      }
    }
  }, [batchDoubtData])
  useEffect(() => {
    if (myBatchDoubtData) {
      if (page == 1) {
        setMyDoubtData((prev) => ([...myBatchDoubtData?.data?.doubts]))
      } else {
        setMyDoubtData((prev) => ([...prev, ...myBatchDoubtData?.data?.doubts]))
      }
    }

  }, [myBatchDoubtData])
  //api call
  useEffect(() => {
    if (batchId) {
      if (myDoubts) {
        getMyBatchDoubts(batchId, page, 6);
      } else {
        getDoubtsOfBatch(batchId, page, 6);
      }
    }
  }, [batchId, helperState, page, myDoubts]);

  const [selectedCommunity, setSelectedCommunity] = React.useState(-1);

  const [deleteHelperState, setDeleteHelperState] = useState({
    type: "",
    data: {},
    show: false,
  });
  const [imgopen, setImgopen] = useState(false);
  const [imgsrc, setImgsrc] = useState(-1);


  console.log(doubtData)
  return (
    <>
      <Toaster />
      <div className="doubt-container">
        <div className="filter-chip">
          {" "}
          {!prePurchase && (
            <>
              <Chip
                label="All Doubts"
                onClick={() => handleClick(false)}
                sx={{
                  background: !myDoubts ? "var(--primaryColor)" : "none",
                  border: myDoubts && "1px solid var(--primaryColor)",

                  color: !myDoubts ? "#fff" : "var(--primaryColor)",
                  mr: 1,
                }}
              />
              <Chip
                label="My Doubts"
                onClick={() => handleClick(true)}
                sx={{
                  background: myDoubts ? "var(--primaryColor)" : "none",
                  border: !myDoubts && "1px solid var(--primaryColor)",

                  color: myDoubts ? "#fff" : "var(--primaryColor)",
                }}
              />
            </>
          )}
        </div>

        {!prePurchase && (
          <DoubtDetail
            batchData={batchData}
            setImgsrc={setImgsrc}
            setImgopen={setImgopen}
            deleteHelperState={deleteHelperState}
            setDeleteHelperState={setDeleteHelperState}
            setShowReport={setShowReport}
            setDoubtPrivacyPolicy={setDoubtPrivacyPolicy}
            doubtPrivacyPolicy={doubtPrivacyPolicy}
            doubtOpen={doubtOpen}
            setDoubtOpen={setDoubtOpen}
            batchId={batchId}
            selectedCommunity={selectedCommunity}
            helperState={helperState}
            setHelperState={setHelperState}
          />
        )}
        {/* {showReport?.show && */}
        {!prePurchase && (
          <ReportBox showReport={showReport} setShowReport={setShowReport} />
        )}

        <div>
          {" "}
          <ImgModal imgopen={imgopen} setImgopen={setImgopen} imgsrc={imgsrc} />
        </div>

        {loading ? (
          <Loader />
        ) : (myDoubts ? myDoubtData : doubtData)
          ?.length > 0 ? (
          (myDoubts ? myDoubtData : doubtData)?.map(
            (item, index) => {
              return (
                <>
                  <DoubtPostModal
                    key={index}
                    setLockModal={setLockModal}
                    batchData={batchData}
                    setImgsrc={setImgsrc}
                    setImgopen={setImgopen}
                    deleteHelperState={deleteHelperState}
                    setDeleteHelperState={setDeleteHelperState}
                    prePurchase={prePurchase}
                    setShowReport={setShowReport}
                    setIsEdit={setIsEdit}
                    setOpen={setOpen}
                    isEdit={isEdit}
                    helperState={helperState}
                    setHelperState={setHelperState}
                    batchId={batchId}
                    data={item}
                    setSelectedCommunity={setSelectedCommunity}
                    setDoubtOpen={setDoubtOpen}
                  />
                </>
              );
            }
          )
        ) : (
          <div className="create-doubt-container">
            <div className="create-doubt">
              <img src={doubtImg} alt="doubt-img" />
              <p>No Any Doubt!</p>
              {!prePurchase && (
                <button onClick={() => setOpen(true)}>Ask a Doubt</button>
              )}
            </div>
          </div>
        )}
        {(myDoubts ? batchDoubtData : myBatchDoubtData)?.length >
          5 && (
            <div className="loader-infinite ">
              <Button onClick={() => setPage(page + 1)}>
                Show More <FaAngleDown />
              </Button>{" "}
            </div>
          )}
        {/* <CommunityPostModal doubtOpen={doubtOpen} setDoubtOpen={setDoubtOpen} batchId={batchId} /> */}

        {/* <h3>No Doubt Found</h3> */}

        <div>
          <DoubtPrivacyPolicy
            setDoubtPrivacyPolicy={setDoubtPrivacyPolicy}
            doubtPrivacyPolicy={doubtPrivacyPolicy}
          />
        </div>

        <div>
          {!prePurchase && (
            <DoubtModal
              show={
                (myDoubts ? myDoubtData : doubtData)
                  ?.length > 0
              }
              batchSlug={batchSlug}
              batchId={batchId}
              open={open}
              setOpen={setOpen}
              setIsEdit={setIsEdit}
              isEdit={isEdit}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Doubt;
